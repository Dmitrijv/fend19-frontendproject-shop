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
          const categoryName = lib.escapeHtml(category.name);
          tableContent += `
            <tr data-categoryId='${category.id}'>
                <td>${category.id}</td>
                <td>
                    <span id='${category.id}-nameLabel' >${categoryName}</span>
                    <form id='${category.id}-updateForm' class="update-category clearfix hidden" onsubmit='adminLib.updateCategory(event);' data-categoryid='${category.id}'>
                        <input name="updateCategoryNameField" class="category-input input-left float-left" type="text" placeholder="${categoryName}">
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
      let input = event.currentTarget.elements.updateCategoryNameField;

      const alertElement = document.querySelector("div#categoryAlert");
      const messageElement = document.querySelector("div#categoryAlert span.msg");

      const newName = lib.escapeHtml(input.value);
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
          } else if (this.readyState == 4 && this.status == 500) {
            messageElement.textContent = "Deleting a product that has been ordered is not allowed.";
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

    onOrderTheadClick: function(event) {
      const lib = this;
      const clickedCell = event.currentTarget;

      // we clicked on a cell that is not responsibe for current sort
      if (!clickedCell.classList.contains("sorted")) {
        // remove sort class from current sort column
        const prevousSortCell = document.querySelector("th.sorted");
        prevousSortCell.classList.remove("sorted", "sortAsc", "sortDesc");
        // add sort classes to current form
        clickedCell.classList.add("sorted", "sortDesc");
      } else {
        // flip descending to asc and vice versa
        if (clickedCell.classList.contains("sortAsc")) {
          clickedCell.classList.replace("sortAsc", "sortDesc");
        } else {
          clickedCell.classList.replace("sortDesc", "sortAsc");
        }
      }

      lib.drawFilteredOrdersTable();
    },

    drawFilteredOrdersTable: function() {
      const lib = this;
      const statusFilter = Number(document.querySelector('input[type="radio"]:checked').value);
      const countyFilter = document.querySelector('input[name="countyNameFilter"]').value.toLowerCase();

      const activeOrdersInternal = `${INTERNAL_PATH}/activeOrders.php`;
      const completedOrdersInternal = `${INTERNAL_PATH}/completedOrders.php`;
      const targetInternal = Number(statusFilter) == 3 ? completedOrdersInternal : activeOrdersInternal;

      // determine which header is clicked right now and which way sorting should be performed
      const activeHeader = document.querySelector("th.sorted");
      const sortType = activeHeader.dataset.sortby || activeHeader.dataset.sortBy;
      const sortDirection = activeHeader.classList.contains("sortAsc") ? "asc" : "desc";
      const sortFunction = lib.getSortFunction(sortType, sortDirection);

      lib.loadJsonByXhr(targetInternal, function(orderJson) {
        // sort by column
        if (sortFunction) orderJson = orderJson.sort(sortFunction);
        // filter by county string
        orderJson = orderJson.filter(order =>
          !countyFilter || countyFilter.length == 0
            ? true
            : order.county.toLowerCase().includes(countyFilter)
            ? true
            : false
        );
        // filter by selected category
        orderJson = orderJson.filter(order =>
          !statusFilter || statusFilter == 0 ? true : order.status_id == statusFilter ? true : false
        );
        lib.drawOrdersTable(orderJson);
      });
    },

    drawOrdersTable: function(orderJson) {
      const lib = this;
      const table = document.querySelector("table tbody#orderAdminTableBody");
      let tableContent = ``;
      orderJson.forEach(order => {
        const order_total = order.free_shipping == 0 ? Number(order.order_total) + 50 : order.order_total;
        let buttonHtml;
        switch (Number(order.status_id)) {
          case 1:
            buttonHtml = `
                <form data-orderid="${order.id}" onsubmit='adminLib.setOrderInProgress(event);'>
                    <input class="btn edit-btn" type="submit" name="edit" value="Behandla">
                </form>`;
            break;
          case 2:
            buttonHtml = `
                <form data-orderid="${order.id}" onsubmit='adminLib.setOrderCompleted(event);'>
                    <input class="btn create-btn" type="submit" name="edit" value="Slutför">
                </form>`;
            break;
          default:
            buttonHtml = "";
        }

        tableContent += `
            <tr data-orderId='${order.id}'>
                <td class="linkContainer" >
                    <a href="order.php?orderId=${order.id}&orderStatus=${order.status_id}">${order.id}</a>
                </td>
                <td>${order.date_ordered_at}</td>
                <td>${lib.escapeHtml(order.county)}</td>
                <td>${order.item_count}</td>
                <td>${order_total} kr</td>
                <td>${order.status_name}</td>
                <td>${buttonHtml}</td>
            </tr>
        `;
      });

      table.innerHTML = tableContent;
    },

    setOrderInProgress(event) {
      const lib = this;
      const form = event.currentTarget;
      const orderId = form.dataset.orderid || form.dataset.orderId;

      const alertElement = document.querySelector("div#orderAlert");
      const messageElement = document.querySelector("div#orderAlert span.msg");

      if (confirm("Are you sure?")) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            lib.setSuccessStyle(alertElement);
            messageElement.textContent = "Order is now being processed.";
            lib.drawFilteredOrdersTable();
            event.preventDefault();
          } else if (this.readyState == 4 && this.status == 400) {
            messageElement.textContent = "Could not process order.";
            lib.setFailStyle(alertElement);
            event.preventDefault();
          }
        };
        xmlhttp.open("POST", `${CONTROLLER_PATH}/order/processOrderRequest.php`, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(`orderId=${orderId}`);
        event.preventDefault();
      }
    },

    setOrderCompleted(event) {
      const lib = this;
      const form = event.currentTarget;
      const orderId = form.dataset.orderid || form.dataset.orderId;

      const alertElement = document.querySelector("div#orderAlert");
      const messageElement = document.querySelector("div#orderAlert span.msg");

      if (confirm("Are you sure?")) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            lib.setSuccessStyle(alertElement);
            messageElement.textContent = "Order delivery has been registered.";
            lib.drawFilteredOrdersTable();
            event.preventDefault();
          } else if (this.readyState == 4 && this.status == 400) {
            messageElement.textContent = "Could not complete order.";
            lib.setFailStyle(alertElement);
            event.preventDefault();
          }
        };
        xmlhttp.open("POST", `${CONTROLLER_PATH}/order/completeOrderRequest.php`, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(`orderId=${orderId}`);
        event.preventDefault();
      }
    },

    getSortFunction: function(sortType, sortDirection) {
      let sortFunction;

      switch (sortType) {
        case "date":
          sortFunction = sortDirection == "desc" ? sortByDateDesc : sortByDateAsc;
          break;
        case "order_total":
          sortFunction = sortDirection == "desc" ? sortByOrderTotalDesc : sortByOrderTotalAsc;
          break;
        case "status":
          sortFunction = sortDirection == "desc" ? sortByStatusDesc : sortByStatusAsc;
          break;
        default:
          sortFunction = sortByDateAsc;
      }

      return sortFunction;

      function sortByOrderTotalAsc(a, b) {
        const aTotal = a.free_shipping == 1 ? Number(a.order_total) : Number(a.order_total) + 50;
        const bTotal = b.free_shipping == 1 ? Number(b.order_total) : Number(b.order_total) + 50;
        return aTotal > bTotal ? 1 : -1;
      }

      function sortByOrderTotalDesc(a, b) {
        const aTotal = a.free_shipping == 1 ? Number(a.order_total) : Number(a.order_total) + 50;
        const bTotal = b.free_shipping == 1 ? Number(b.order_total) : Number(b.order_total) + 50;
        return aTotal > bTotal ? -1 : 1;
      }

      function sortByStatusAsc(a, b) {
        return a.status_id > b.status_id ? 1 : -1;
      }

      function sortByStatusDesc(a, b) {
        return a.status_id > b.status_id ? -1 : 1;
      }

      function sortByDateAsc(a, b) {
        return a.date_ordered_at > b.date_ordered_at ? 1 : -1;
      }

      function sortByDateDesc(a, b) {
        return a.date_ordered_at > b.date_ordered_at ? -1 : 1;
      }
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

    redirectToOrdersPage(event) {
      window.location.href = `${location.protocol}//${location.host}/fend19-frontendproject-shop/admin/orders.php`;
      event.preventDefault();
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

    escapeHtml: function(string) {
      return string
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
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
