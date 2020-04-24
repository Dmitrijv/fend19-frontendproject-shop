adminLib = (function() {
  var info = "Helper library for making controller calls to php.";
  var version = "0.2";
  var SHOP_URL = "".concat(location.protocol, "//").concat(location.host, "/fend19-frontendproject-shop");
  var CONTROLLER_PATH = "".concat(SHOP_URL, "/admin/php/controller");
  var INTERNAL_PATH = "".concat(SHOP_URL, "/admin/internal");
  var adminLib = {
    drawCategoryTable: function drawCategoryTable() {
      var lib = this;
      var apiUrl = "".concat(INTERNAL_PATH, "/productCategories.php");
      lib.loadJsonByXhr(apiUrl, function(categoryJson) {
        var table = document.querySelector("table#productCategoryAdminTable");
        var tableContent =
          "\n        <tr>\n            <th>ID</th>\n            <th>Name</th>\n            <th>Action</th>\n        </tr>\n        ";
        categoryJson.forEach(function(category) {
          tableContent += "\n            <tr data-categoryId='"
            .concat(category.id, "'>\n                <td>")
            .concat(category.id, "</td>\n                <td>\n                    <span id='")
            .concat(category.id, "-nameLabel' >")
            .concat(category.name, "</span>\n                    <form id='")
            .concat(
              category.id,
              "-updateForm' class=\"update-category clearfix hidden\" onsubmit='adminLib.updateCategory(event);' data-categoryid='"
            )
            .concat(
              category.id,
              '\'>\n                        <input name="updateCategoryNameField" class="category-input input-left float-left" type="text" placeholder="'
            )
            .concat(
              category.name,
              "\">\n                        <input class=\"btn btn-right create-btn float-right\" type=\"submit\" value=\"Update\">\n                    </form>\n                  </td>\n                <td>\n                    <form style='display: inline-block;' onsubmit='adminLib.toggleCategoryUpdateElements(event);'>\n                        <input class='btn btn-left edit-btn' type='submit' data-categoryId='"
            )
            .concat(
              category.id,
              "' name='edit' value='Edit'>\n                    </form>\n                    <form style='display: inline-block;' onsubmit='adminLib.deleteCategory(event);'>\n                        <input class='btn btn-right del-btn' data-categoryId='"
            )
            .concat(
              category.id,
              "' type='submit' name='delete' value='Delete'>\n                    </form>\n                </td>\n            </tr>\n        "
            );
        });
        table.innerHTML = tableContent;
      });
    },
    createNewCategory: function createNewCategory(event) {
      var lib = this;
      var alertElement = document.querySelector("div#categoryAlert");
      var messageElement = document.querySelector("div#categoryAlert span.msg");
      var input = event.currentTarget.elements.newCategoryNameField;
      var categoryName = input.value; // validate input locally before submitting to server

      if (lib.isProductCategoryNameValid(categoryName) === false) {
        messageElement.textContent = "Invalid category name.";
        lib.setFailStyle(alertElement);
        input.focus();
        event.preventDefault();
        return;
      }

      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          input.value = ""; // remember to empty input

          lib.setSuccessStyle(alertElement);
          messageElement.textContent = "Category created successfully.";
          lib.drawCategoryTable();
          event.preventDefault(); // server validation failed
        } else if (this.readyState == 4 && this.status == 400) {
          messageElement.textContent = "Invalid or duplicate category name.";
          lib.setFailStyle(alertElement);
          event.preventDefault();
        }
      };

      xmlhttp.open("POST", "".concat(CONTROLLER_PATH, "/category/createCategoryRequest.php"), true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send("categoryName=".concat(categoryName));
      event.preventDefault();
    },
    deleteCategory: function deleteCategory(event) {
      var lib = this;
      var alertElement = document.querySelector("div#categoryAlert");
      var messageElement = document.querySelector("div#categoryAlert span.msg");
      var button = event.currentTarget.elements.delete;
      var categoryId = button.dataset.categoryid;

      if (confirm("Are you sure?")) {
        var xmlhttp = new XMLHttpRequest();

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

        xmlhttp.open("POST", "".concat(CONTROLLER_PATH, "/category/deleteCategoryRequest.php"), true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("categoryId=".concat(categoryId));
      }

      event.preventDefault();
    },
    updateCategory: function updateCategory(event) {
      var lib = this;
      var input = event.currentTarget.elements.updateCategoryNameField;
      var alertElement = document.querySelector("div#categoryAlert");
      var messageElement = document.querySelector("div#categoryAlert span.msg");
      var newName = input.value;
      var categoryId = event.currentTarget.dataset.categoryid; // validate input locally before submitting to server

      if (lib.isProductCategoryNameValid(newName) === false) {
        messageElement.textContent = "New name is incorrect or diplicate.";
        lib.setFailStyle(alertElement);
        input.focus();
        event.preventDefault();
        return;
      }

      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          input.value = ""; // remember to empty input

          lib.setSuccessStyle(alertElement);
          messageElement.textContent = "Category name updated successfully.";
          lib.drawCategoryTable();
          event.preventDefault(); // attempting to update a deleted category
        } else if (this.readyState == 4 && this.status == 500) {
          messageElement.textContent = "Attempting to update a deleted category.";
          lib.setFailStyle(alertElement);
          event.preventDefault(); // server validation failed
        } else if (this.readyState == 4 && this.status == 400) {
          messageElement.textContent = "New name is invalid or duplicate.";
          lib.setFailStyle(alertElement);
          event.preventDefault();
        }
      };

      xmlhttp.open("POST", "".concat(CONTROLLER_PATH, "/category/updateCategoryRequest.php"), true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send("newName=".concat(newName, "&categoryId=").concat(categoryId));
      event.preventDefault();
    },
    toggleCategoryUpdateElements: function toggleCategoryUpdateElements(event) {
      var targetCategoryId = event.currentTarget.edit.dataset.categoryid; // loop over all table update rows in the table

      var updateForms = document.querySelectorAll("table.category-table tr form.update-category");

      for (var i = 0; i < updateForms.length; ++i) {
        var editForm = updateForms[i];
        var formIsVisible = editForm.classList.contains("hidden");
        var categoryId = editForm.dataset.categoryid;
        var nameLabel = document.getElementById("".concat(categoryId, "-nameLabel")); // current edit form is not the one we clicked "edit" for but it was left visible

        if (formIsVisible === true && categoryId !== targetCategoryId) {
          editForm.classList.add("hidden");
          nameLabel.classList.remove("hidden"); // current form is the one we want to fill in but it's hidden, so lets show it
        } else if (formIsVisible === false) {
          editForm.classList.add("hidden");
          nameLabel.classList.remove("hidden"); // user clicked "edit" on a row where the form was already visible so lets hide it
        } else {
          editForm.classList.remove("hidden");
          nameLabel.classList.add("hidden");
        }
      }

      event.preventDefault();
    },
    setSuccessStyle: function setSuccessStyle(element) {
      element.classList.add("success");
      element.classList.remove("fail");
      element.classList.remove("hidden");
    },
    setFailStyle: function setFailStyle(element) {
      element.classList.add("fail");
      element.classList.remove("success");
      element.classList.remove("hidden");
    },
    drawProductTable: function drawProductTable() {
      var lib = this;
      var apiUrl = "".concat(INTERNAL_PATH, "/products.php");
      lib.loadJsonByXhr(apiUrl, function(productJson) {
        var table = document.querySelector("table.product-table");
        var tableContent =
          '\n            <thead role="rowgroup">\n                <tr role="row">\n                    <th role="columnheader">ID</th>\n                    <th role="columnheader">Title</th>\n                    <th role="columnheader">Gallery</th>\n                    <th role="columnheader">Price</th>\n                    <th role="columnheader">Stock</th>\n                    <th role="columnheader">Category</th>\n                    <th role="columnheader">Description</th>\n                    <th role="columnheader">Action</th>\n                </tr>\n            </thead>\n        <tbody role=\'rowgroup\'>\n        ';
        productJson.forEach(function(product) {
          var trimmedProductDescription = product.description.substring(0, 45) + "...";
          var coverImage = product.imageGallery[0] || "placeholder.png";
          var gallerySize = product.imageGallery.length;
          tableContent += "\n            <tr role='row' data-post-id='"
            .concat(product.id, "'>\n                <td role='cell'>")
            .concat(
              product.id,
              "</td>\n                <td role='cell' class='ie-ellipsis'><span class='ie-ellipsis-text'>"
            )
            .concat(
              product.title,
              "</span></td>\n                <td role='cell'>\n                    <div class='productCoverDemo'>\n                        <img class='cover-demo' src='../img/product/"
            )
            .concat(coverImage, "' alt='Cover Image'>\n                        <span class='gallerySize'>")
            .concat(
              gallerySize,
              "</span>\n                    </div>\n                </td>\n                <td role='cell'>"
            )
            .concat(product.price, " ")
            .concat(product.currency, "</td>\n                <td role='cell'>")
            .concat(product.numberInStock, " st</td>\n                <td role='cell'>")
            .concat(product.category, "</td>\n                <td role='cell' class='ie-box' title='")
            .concat(product.description, "' >")
            .concat(
              trimmedProductDescription,
              "</td>\n                <td class='ellipsis' role='cell'><span class='show-all-description' title='"
            )
            .concat(product.description, "'><span class='description-text'>")
            .concat(
              product.description,
              "</span></span></td>\n                <td role='cell' class='actionCell'>\n                    <form style='display: inline-block;' action='editProduct.php?productId="
            )
            .concat(
              product.id,
              "' method='POST'>\n                        <input class='btn edit-btn' type='submit' data-productid='"
            )
            .concat(
              product.id,
              "' name='edit' value='Edit'>\n                        <input type='hidden' name='productId' value='"
            )
            .concat(
              product.id,
              "'>\n                    </form>\n                    <form style='display: inline-block;' onsubmit='adminLib.deleteProduct(event);'>\n                        <input class='btn del-btn' data-productid='"
            )
            .concat(
              product.id,
              "' type='submit' name='delete' value='Delete'>\n                    </form>\n                </td>\n            </tr>\n        "
            );
        });
        tableContent += "</tbody>";
        table.innerHTML = tableContent;
      });
    },
    createNewProduct: function createNewProduct(event) {
      var lib = this;
      var form = event.currentTarget;
      var formData = new FormData(form);
      var alertElement = document.querySelector("div#productAlert");
      var messageElement = document.querySelector("div#productAlert span.msg");
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          lib.setSuccessStyle(alertElement);
          messageElement.textContent = "New product created successfully.";
          form.reset();
          event.preventDefault(); // server validation failed
        } else if (this.readyState == 4 && this.status == 400) {
          messageElement.textContent = "Input did not pass validation.";
          lib.setFailStyle(alertElement);
          event.preventDefault();
        }
      };

      xmlhttp.open("POST", "".concat(CONTROLLER_PATH, "/product/createProductRequest.php"));
      xmlhttp.send(formData);
      event.preventDefault();
    },
    updateProduct: function updateProduct(event) {
      var lib = this;
      var form = event.currentTarget;
      var alertElement = document.querySelector("div#productAlert");
      var messageElement = document.querySelector("div#productAlert span.msg");
      var productId = form.dataset.productid || form.dataset.productId;
      var existingImages = document.querySelectorAll("img.small-img-on-edit"); // if user uploaded new files check if they have valid names

      if (form.files) {
        for (var i = 0; i < form.files.length; i++) {
          var fileName = form.files[i].name;

          if (!isFileNameValid(fileName)) {
            messageElement.textContent = "Added image has invalid name.";
            lib.setFailStyle(alertElement);
            event.preventDefault();
            return;
          }
        }
      } // build a list of image files that were removed in this update

      var imagesToDelete = [];
      var deletedImages = document.querySelectorAll("img.small-img-on-edit.hidden");

      for (var imgIndex = 0; imgIndex < deletedImages.length; imgIndex++) {
        var image = deletedImages[imgIndex];
        imagesToDelete.push(image.dataset.filename);
      } // all existing images were deleted and no new images were added

      if (deletedImages.length === existingImages.length && (!form.files || form.files.length === 0)) {
        messageElement.textContent = "Product must have at least one image";
        lib.setFailStyle(alertElement);
        event.preventDefault();
        return;
      }

      var formData = new FormData(form);
      formData.append("product_id", productId);
      formData.append("images_to_delete", JSON.stringify(imagesToDelete));
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          lib.setSuccessStyle(alertElement);
          messageElement.textContent = "Product updated successfully.";
          event.preventDefault(); // server validation failed
        } else if (this.readyState == 4 && this.status == 400) {
          messageElement.textContent = "Input did not pass validation.";
          lib.setFailStyle(alertElement);
          event.preventDefault();
        }
      };

      xmlhttp.open("POST", "".concat(CONTROLLER_PATH, "/product/updateProductRequest.php"));
      xmlhttp.send(formData);
      event.preventDefault();
    },
    fillProductCategoryDropdown: function fillProductCategoryDropdown() {
      var lib = this;
      var select = document.querySelector("select[name='product_category']");
      var apiUrl = "".concat(INTERNAL_PATH, "/productCategories.php");
      lib.loadJsonByXhr(apiUrl, function(categoryJson) {
        categoryJson.forEach(function(category) {
          var option = document.createElement("option");
          option.setAttribute("value", category.id);
          option.textContent = category.name;
          select.appendChild(option);
        });
      });
    },
    deleteProduct: function deleteProduct(event) {
      var lib = this;
      var alertElement = document.querySelector("div#productAlert");
      var messageElement = document.querySelector("div#productAlert span.msg");
      var button = event.currentTarget.elements.delete;
      var productId = button.dataset.productid;

      if (confirm("Are you sure?")) {
        var xmlhttp = new XMLHttpRequest();

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

        xmlhttp.open("POST", "".concat(CONTROLLER_PATH, "/product/deleteProductRequest.php"), true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("productId=".concat(productId));
      }

      event.preventDefault();
    },
    hideParentElement: function hideParentElement(event) {
      var elementToHide = event.currentTarget.parentElement;
      elementToHide.classList.add("hidden");
      event.preventDefault();
    },
    hideSelf: function hideSelf(event) {
      event.currentTarget.classList.add("hidden");
    },
    isProductCategoryNameValid: function isProductCategoryNameValid(categoryName) {
      return (
        (categoryName &&
          categoryName.length >= 1 &&
          categoryName.length <= 20 &&
          /<\/?[a-z][\s\S]*/i.test(categoryName) == false) ||
        false
      );
    },
    isFileNameValid: function isFileNameValid(fileName) {
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
    loadJsonByXhr: function loadJsonByXhr(url, callback) {
      var xhr = new XMLHttpRequest();

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
