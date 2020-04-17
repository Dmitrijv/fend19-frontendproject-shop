adminLib = (function() {
  var info = "Helper library for making controller calls to php.";
  var version = "0.2";
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
          tableContent += "\n            <tr data-categoryId='"
            .concat(category.id, "'>\n                <td>")
            .concat(category.id, "</td>\n                <td>\n                    <span id='")
            .concat(category.id, "-nameLabel' > ")
            .concat(category.name, " </span>\n                    <form id='")
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
          messageElement.textContent = "Caregory created successfully.";
          lib.drawCategoryTable();
          event.preventDefault(); // server validation failed
        } else if (this.readyState == 4 && this.status == 400) {
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
      var button = event.currentTarget.elements.delete;
      var categoryId = button.dataset.categoryid;

      if (confirm("Are you sure?")) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            lib.setSuccessStyle(alertElement);
            messageElement.textContent = "Caregory deleted succsessfully.";
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
          messageElement.textContent = "Caregory name updated successfully.";
          lib.drawCategoryTable();
          event.preventDefault(); // attempting to update a deleted category
        } else if (this.readyState == 4 && this.status == 500) {
          messageElement.textContent = "Attempting to update a deleted category.";
          lib.setFailStyle(alertElement);
          event.preventDefault(); // server validation failed
        } else if (this.readyState == 4 && this.status == 400) {
          messageElement.textContent = "New name is incorrect or diplicate.";
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
      var categoryId = event.currentTarget.edit.dataset.categoryid;
      var editForm = document.getElementById("".concat(categoryId, "-updateForm"));
      var nameLabel = document.getElementById("".concat(categoryId, "-nameLabel"));
      var formIsVisible = editForm.classList.contains("hidden");

      if (formIsVisible === false) {
        editForm.classList.add("hidden");
        nameLabel.classList.remove("hidden");
      } else {
        editForm.classList.remove("hidden");
        nameLabel.classList.add("hidden");
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
      var elementToHide = event.currentTarget.parentElement;
      elementToHide.classList.add("hidden");
      event.preventDefault();
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
