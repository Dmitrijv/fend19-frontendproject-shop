adminLib = (function() {
  const info = "Helper library for making controller calls to php.";

  const version = "0.2";
  const SHOP_URL = `${location.protocol}//${location.host}/fend19-frontendproject-shop`;
  const CONTROLLER_PATH = `${SHOP_URL}/admin/php/controller`;
  const INTERNAL_API_PATH = `${SHOP_URL}/admin/internalApi`;

  let adminLib = {
    drawCategoryTable() {
      const lib = this;
      const apiUrl = `${INTERNAL_API_PATH}/productCategories.php`;

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
          messageElement.textContent = "Caregory name updated successfully.";
          lib.drawCategoryTable();
          event.preventDefault();
          // attempting to update a deleted category
        } else if (this.readyState == 4 && this.status == 500) {
          messageElement.textContent = "Attempting to update a deleted category.";
          lib.setFailStyle(alertElement);
          event.preventDefault();
          // server validation failed
        } else if (this.readyState == 4 && this.status == 400) {
          messageElement.textContent = "New name is incorrect or diplicate.";
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

    hideParentElement: function(event) {
      const elementToHide = event.currentTarget.parentElement;
      elementToHide.classList.add("hidden");
      event.preventDefault();
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
