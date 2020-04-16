adminLib = (function() {
  var info = "Helper library for making controller calls to php.";
  var version = "0.1";
  var SHOP_URL = "".concat(location.protocol, "//").concat(location.host, "/fend19-frontendproject-shop");
  var CONTROLLER_PATH = "".concat(SHOP_URL, "/admin/php/controller");
  var INTERNAL_API_PATH = "".concat(SHOP_URL, "/admin/internalApi");
  var adminLib = {
    drawCategoryTable: function drawCategoryTable() {
      var lib = this;
      var apiUrl = "".concat(INTERNAL_API_PATH, "/productCategories.php");
      lib.loadJsonByXhr(apiUrl, function(categoryJson) {
        var table = document.querySelector("table#productCategoryAdminTable");
        var tableContent =
          "\n        <tr>\n            <th>ID</th>\n            <th>Name</th>\n            <th>Action</th>\n        </tr>\n        ";
        categoryJson.forEach(function(category) {
          tableContent += "\n            <tr data-post-id='"
            .concat(category.id, "'>\n                <td>")
            .concat(category.id, "</td>\n                <td>")
            .concat(
              category.name,
              "</td>\n                <td>\n                    <form style='display: inline-block;'>\n                        <input class='btn btn-left edit-btn' type='submit' data-categoryId='"
            )
            .concat(
              category.id,
              "' name='edit' value='Edit'>\n                        <input type='hidden' name='categoryId' value='"
            )
            .concat(
              category.id,
              "'>\n                    </form>\n                    <form style='display: inline-block;' onsubmit='adminLib.deleteCategory(event);'>\n                        <input class='btn btn-right del-btn' data-categoryId='"
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
      var input = event.target.elements.newCategoryNameField;
      var categoryName = input.value; // validate input locally before submitting to server

      if (
        !categoryName ||
        categoryName.length < 1 ||
        categoryName.length > 20 ||
        /<\/?[a-z][\s\S]*/i.test(categoryName) == true
      ) {
        console.log("error");
        messageElement.textContent = "Incorrect category name.";
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
          messageElement.textContent = "Caregory created succsessfully.";
          lib.drawCategoryTable(); // server validation failed
        } else if (this.readyState == 4 && this.status == 500) {
          messageElement.textContent = "Incorrect or diplicate category name.";
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
      var button = event.target.elements.delete;
      var categoryId = button.dataset.categoryid;

      if (confirm("Are you sure?")) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var row = document.querySelector('tr[data-post-id="'.concat(categoryId, '"]'));
            row.parentNode.removeChild(row);
            lib.setSuccessStyle(alertElement);
            messageElement.textContent = "Caregory deleted succsessfully.";
            lib.drawCategoryTable();
          } else if (this.readyState == 4 && this.status == 500) {
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
    hideParentElement: function hideParentElement(event) {
      var elementToHide = event.target.parentElement;
      elementToHide.classList.add("hidden");
      event.preventDefault();
    },
    loadJsonByXhr: function loadJsonByXhr(url, callback) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          callback(JSON.parse(this.responseText));
        }
      };

      xhr.open("GET", url, true);
      xhr.send();
    }
  };
  return adminLib;
})();
