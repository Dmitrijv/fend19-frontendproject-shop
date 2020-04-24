adminLib = (function() {
  const info = "Helper library for making controller calls to php.";

  const version = "0.2";
  const SHOP_URL = `${location.protocol}//${location.host}/fend19-frontendproject-shop`;
  const CONTROLLER_PATH = `${SHOP_URL}/admin/php/controller`;
  const INTERNAL_PATH = `${SHOP_URL}/admin/internal`;

  let adminLib = {
    drawCategoryTable() {
      const lib = this;
      const apiUrl = `${INTERNAL_PATH}/productCategories.php`;

      lib.loadJsonByXhr(apiUrl, function(categoryJson) {
        const table = document.querySelector("table#productCategoryAdminTable");
        let tableContent = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
        </tr>
        `;
        categoryJson.forEach(category => {
          tableContent += `
            <tr data-categoryId='${category.id}'>
                <td>${category.id}</td>
                <td>
                    <span id='${category.id}-nameLabel' >${category.name}</span>
                    <form id='${category.id}-updateForm' class="update-category clearfix hidden" onsubmit='adminLib.updateCategory(event);' data-categoryid='${category.id}'>
                        <input name="updateCategoryNameField" class="category-input input-left float-left" type="text" placeholder="${category.name}">
                        <input class="btn btn-right create-btn float-right" type="submit" value="Update">
                    </form>
                  </td>
                <td>
                    <form style='display: inline-block;' onsubmit='adminLib.toggleCategoryUpdateElements(event);'>
                        <input class='btn btn-left edit-btn' type='submit' data-categoryId='${category.id}' name='edit' value='Edit'>
                    </form>
                    <form style='display: inline-block;' onsubmit='adminLib.deleteCategory(event);'>
                        <input class='btn btn-right del-btn' data-categoryId='${category.id}' type='submit' name='delete' value='Delete'>
                    </form>
                </td>
            </tr>
        `;
        });
        table.innerHTML = tableContent;
      });
    },

    createNewCategory: function(event) {
      const lib = this;

      const alertElement = document.querySelector("div#categoryAlert");
      const messageElement = document.querySelector("div#categoryAlert span.msg");

      const input = event.currentTarget.elements.newCategoryNameField;
      const categoryName = input.value;

      // validate input locally before submitting to server
      if (lib.isProductCategoryNameValid(categoryName) === false) {
        messageElement.textContent = "Invalid category name.";
        lib.setFailStyle(alertElement);
        input.focus();
        event.preventDefault();
        return;
      }

      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          input.value = ""; // remember to empty input
          lib.setSuccessStyle(alertElement);
          messageElement.textContent = "Category created successfully.";
          lib.drawCategoryTable();
          event.preventDefault();
          // server validation failed
        } else if (this.readyState == 4 && this.status == 400) {
          messageElement.textContent = "Invalid or duplicate category name.";
          lib.setFailStyle(alertElement);
          event.preventDefault();
        }
      };

      xmlhttp.open("POST", `${CONTROLLER_PATH}/category/createCategoryRequest.php`, true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send(`categoryName=${categoryName}`);

      event.preventDefault();
    },

    deleteCategory: function(event) {
      const lib = this;
      const alertElement = document.querySelector("div#categoryAlert");
      const messageElement = document.querySelector("div#categoryAlert span.msg");

      const button = event.currentTarget.elements.delete;
      const categoryId = button.dataset.categoryid;

      if (confirm("Are you sure?")) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            lib.setSuccessStyle(alertElement);
            messageElement.textContent = "Category deleted successfully.";
            lib.drawCategoryTable();
            event.preventDefault();
          } else if (this.readyState == 4 && this.status == 500) {
            messageElement.textContent = "Deleting the default category is not allowed.";
            lib.setFailStyle(alertElement);
            event.preventDefault();
          } else if (this.readyState == 4 && this.status == 400) {
            messageElement.textContent = "Failed to delete category.";
            lib.setFailStyle(alertElement);
            event.preventDefault();
          }
        };

        xmlhttp.open("POST", `${CONTROLLER_PATH}/category/deleteCategoryRequest.php`, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(`categoryId=${categoryId}`);
      }

      event.preventDefault();
    },

    updateCategory: function(event) {
      const lib = this;
      const input = event.currentTarget.elements.updateCategoryNameField;

      const alertElement = document.querySelector("div#categoryAlert");
      const messageElement = document.querySelector("div#categoryAlert span.msg");

      const newName = input.value;
      const categoryId = event.currentTarget.dataset.categoryid;

      // validate input locally before submitting to server
      if (lib.isProductCategoryNameValid(newName) === false) {
        messageElement.textContent = "New name is incorrect or diplicate.";
        lib.setFailStyle(alertElement);
        input.focus();
        event.preventDefault();
        return;
      }

      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          input.value = ""; // remember to empty input
          lib.setSuccessStyle(alertElement);
          messageElement.textContent = "Category name updated successfully.";
          lib.drawCategoryTable();
          event.preventDefault();
          // attempting to update a deleted category
        } else if (this.readyState == 4 && this.status == 500) {
          messageElement.textContent = "Attempting to update a deleted category.";
          lib.setFailStyle(alertElement);
          event.preventDefault();
          // server validation failed
        } else if (this.readyState == 4 && this.status == 400) {
          messageElement.textContent = "New name is invalid or duplicate.";
          lib.setFailStyle(alertElement);
          event.preventDefault();
        }
      };

      xmlhttp.open("POST", `${CONTROLLER_PATH}/category/updateCategoryRequest.php`, true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send(`newName=${newName}&categoryId=${categoryId}`);

      event.preventDefault();
    },

    toggleCategoryUpdateElements: function(event) {
      const targetCategoryId = event.currentTarget.edit.dataset.categoryid;

      // loop over all table update rows in the table
      const updateForms = document.querySelectorAll("table.category-table tr form.update-category");
      for (let i = 0; i < updateForms.length; ++i) {
        const editForm = updateForms[i];
        const formIsVisible = editForm.classList.contains("hidden");

        const categoryId = editForm.dataset.categoryid;
        const nameLabel = document.getElementById(`${categoryId}-nameLabel`);

        // current edit form is not the one we clicked "edit" for but it was left visible
        if (formIsVisible === true && categoryId !== targetCategoryId) {
          editForm.classList.add("hidden");
          nameLabel.classList.remove("hidden");
          // current form is the one we want to fill in but it's hidden, so lets show it
        } else if (formIsVisible === false) {
          editForm.classList.add("hidden");
          nameLabel.classList.remove("hidden");
          // user clicked "edit" on a row where the form was already visible so lets hide it
        } else {
          editForm.classList.remove("hidden");
          nameLabel.classList.add("hidden");
        }
      }

      event.preventDefault();
    },

    setSuccessStyle: function(element) {
      element.classList.add("success");
      element.classList.remove("fail");
      element.classList.remove("hidden");
    },

    setFailStyle: function(element) {
      element.classList.add("fail");
      element.classList.remove("success");
      element.classList.remove("hidden");
    },

    drawProductTable: function() {
      const lib = this;
      const apiUrl = `${INTERNAL_PATH}/products.php`;

      lib.loadJsonByXhr(apiUrl, function(productJson) {
        const table = document.querySelector("table.product-table");
        let tableContent = `
            <thead role="rowgroup">
                <tr role="row">
                    <th role="columnheader">ID</th>
                    <th role="columnheader">Title</th>
                    <th role="columnheader">Gallery</th>
                    <th role="columnheader">Price</th>
                    <th role="columnheader">Stock</th>
                    <th role="columnheader">Category</th>
                    <th role="columnheader">Description</th>
                    <th role="columnheader">Action</th>
                </tr>
            </thead>
        <tbody role='rowgroup'>
        `;
        productJson.forEach(product => {
          const trimmedProductDescription = product.description.substring(0, 45) + "...";
          const coverImage = product.imageGallery[0] || "placeholder.png";
          const gallerySize = product.imageGallery.length;
          tableContent += `
            <tr role='row' data-post-id='${product.id}'>
                <td role='cell'>${product.id}</td>
                <td role='cell' class='ie-ellipsis'><span class='ie-ellipsis-text'>${product.title}</span></td>
                <td role='cell'>
                    <div class='productCoverDemo'>
                        <img class='cover-demo' src='../img/product/${coverImage}' alt='Cover Image'>
                        <span class='gallerySize'>${gallerySize}</span>
                    </div>
                </td>
                <td role='cell'>${product.price} ${product.currency}</td>
                <td role='cell'>${product.numberInStock} st</td>
                <td role='cell'>${product.category}</td>
                <td role='cell' class='ie-box' title='${product.description}' >${trimmedProductDescription}</td>
                <td class='ellipsis' role='cell'><span class='show-all-description' title='${product.description}'><span class='description-text'>${product.description}</span></span></td>
                <td role='cell' class='actionCell'>
                    <form style='display: inline-block;' action='editProduct.php?productId=${product.id}' method='POST'>
                        <input class='btn edit-btn' type='submit' data-productid='${product.id}' name='edit' value='Edit'>
                        <input type='hidden' name='productId' value='${product.id}'>
                    </form>
                    <form style='display: inline-block;' onsubmit='adminLib.deleteProduct(event);'>
                        <input class='btn del-btn' data-productid='${product.id}' type='submit' name='delete' value='Delete'>
                    </form>
                </td>
            </tr>
        `;
        });
        tableContent += `</tbody>`;
        table.innerHTML = tableContent;
      });
    },

    createNewProduct: function(event) {
      const lib = this;
      const form = event.currentTarget;
      const formData = new FormData(form);
      const alertElement = document.querySelector("div#productAlert");
      const messageElement = document.querySelector("div#productAlert span.msg");
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          lib.setSuccessStyle(alertElement);
          messageElement.textContent = "New product created successfully.";
          form.reset();
          event.preventDefault();
          // server validation failed
        } else if (this.readyState == 4 && this.status == 400) {
          messageElement.textContent = "Input did not pass validation.";
          lib.setFailStyle(alertElement);
          event.preventDefault();
        }
      };
      xmlhttp.open("POST", `${CONTROLLER_PATH}/product/createProductRequest.php`);
      xmlhttp.send(formData);
      event.preventDefault();
    },

    updateProduct: function(event) {
      const lib = this;
      const form = event.currentTarget;
      const files = form.product_attatched_image.files;
      const alertElement = document.querySelector("div#productAlert");
      const messageElement = document.querySelector("div#productAlert span.msg");

      const productId = form.dataset.productid || form.dataset.productId;
      const existingImages = document.querySelectorAll("img.small-img-on-edit");

      // if user uploaded new files check if they have valid names
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const fileName = files[i].name;
          if (!lib.isFileNameValid(fileName)) {
            messageElement.textContent = "Added image has invalid name.";
            lib.setFailStyle(alertElement);
            event.preventDefault();
            return;
          }
        }
      }

      // build a list of image files that were removed in this update
      const imagesToDelete = [];
      const deletedImages = document.querySelectorAll("img.small-img-on-edit.hidden");
      for (let imgIndex = 0; imgIndex < deletedImages.length; imgIndex++) {
        const image = deletedImages[imgIndex];
        imagesToDelete.push(image.dataset.filename);
      }

      // all existing images were deleted and no new images were added
      if (deletedImages.length === existingImages.length && (!files || files.length === 0)) {
        messageElement.textContent = "Product must have at least one image";
        lib.setFailStyle(alertElement);
        event.preventDefault();
        return;
      }

      let formData = new FormData(form);
      formData.append("product_id", productId);
      formData.append("images_to_delete", JSON.stringify(imagesToDelete));

      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          lib.setSuccessStyle(alertElement);
          messageElement.textContent = "Product updated successfully.";
          event.preventDefault();
          // server validation failed
        } else if (this.readyState == 4 && this.status == 400) {
          messageElement.textContent = "Input did not pass validation.";
          lib.setFailStyle(alertElement);
          event.preventDefault();
        }
      };
      xmlhttp.open("POST", `${CONTROLLER_PATH}/product/updateProductRequest.php`);
      xmlhttp.send(formData);
      event.preventDefault();
    },

    fillProductCategoryDropdown: function() {
      const lib = this;
      const select = document.querySelector("select[name='product_category']");
      const apiUrl = `${INTERNAL_PATH}/productCategories.php`;
      lib.loadJsonByXhr(apiUrl, function(categoryJson) {
        categoryJson.forEach(category => {
          const option = document.createElement("option");
          option.setAttribute("value", category.id);
          option.textContent = category.name;
          select.appendChild(option);
        });
      });
    },

    deleteProduct: function(event) {
      const lib = this;
      const alertElement = document.querySelector("div#productAlert");
      const messageElement = document.querySelector("div#productAlert span.msg");

      const button = event.currentTarget.elements.delete;
      const productId = button.dataset.productid;

      if (confirm("Are you sure?")) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            lib.setSuccessStyle(alertElement);
            messageElement.textContent = "Product deleted successfully.";
            lib.drawProductTable();
            event.preventDefault();
          } else if (this.readyState == 4 && this.status == 400) {
            messageElement.textContent = "Failed to delete product.";
            lib.setFailStyle(alertElement);
            event.preventDefault();
          }
        };

        xmlhttp.open("POST", `${CONTROLLER_PATH}/product/deleteProductRequest.php`, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(`productId=${productId}`);
      }

      event.preventDefault();
    },

    hideParentElement: function(event) {
      const elementToHide = event.currentTarget.parentElement;
      elementToHide.classList.add("hidden");
      event.preventDefault();
    },

    hideSelf: function(event) {
      event.currentTarget.classList.add("hidden");
    },

    isProductCategoryNameValid: function(categoryName) {
      return (
        (categoryName &&
          categoryName.length >= 1 &&
          categoryName.length <= 20 &&
          /<\/?[a-z][\s\S]*/i.test(categoryName) == false) ||
        false
      );
    },

    isFileNameValid: function(fileName) {
      return (
        fileName &&
        fileName.indexOf("/") === -1 &&
        fileName.indexOf(":") === -1 &&
        fileName.indexOf("|") === -1 &&
        fileName.indexOf("?") === -1 &&
        fileName.indexOf("*") === -1 &&
        fileName.indexOf("<") === -1 &&
        fileName.indexOf(">") === -1
      );
    },

    loadJsonByXhr: function(url, callback) {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          callback(JSON.parse(this.responseText));
        }
      };
      xhr.open("POST", url, true);
      xhr.send();
    }
  };

  return adminLib;
})();
