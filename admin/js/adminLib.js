adminLib = (function() {
  const info = "Helper library for making controller calls to php.";

  const version = "0.1";
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
            <tr data-post-id='${category.id}'>
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>
                    <form style='display: inline-block;'>
                        <input class='btn btn-left edit-btn' type='submit' data-categoryId='${category.id}' name='edit' value='Edit'>
                        <input type='hidden' name='categoryId' value='${category.id}'>
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

      const input = event.target.elements.newCategoryNameField;
      const categoryName = input.value;

      // validate input locally before submitting to server
      if (
        !categoryName ||
        categoryName.length < 1 ||
        categoryName.length > 20 ||
        /<\/?[a-z][\s\S]*/i.test(categoryName) == true
      ) {
        messageElement.textContent = "Incorrect category name.";
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
          messageElement.textContent = "Caregory created succsessfully.";
          lib.drawCategoryTable();
          event.preventDefault();
          // server validation failed
        } else if (this.readyState == 4 && this.status == 400) {
          messageElement.textContent = "Incorrect or diplicate category name.";
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

      const button = event.target.elements.delete;
      const categoryId = button.dataset.categoryid;

      if (confirm("Are you sure?")) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            lib.setSuccessStyle(alertElement);
            messageElement.textContent = "Caregory deleted succsessfully.";
            lib.drawCategoryTable();
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
      const elementToHide = event.target.parentElement;
      elementToHide.classList.add("hidden");
      event.preventDefault();
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
