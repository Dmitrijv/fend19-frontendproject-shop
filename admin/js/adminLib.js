adminLib = (function() {
  const info = "Helper library for making controller calls to php.";

  const version = "0.1";
  const CONTROLLER_PATH = `${location.origin}/fend19-frontendproject-shop/admin/php/controller`;

  let adminLib = {
    createNewCategory: function(event) {
      const lib = this;

      const alertElement = document.querySelector("div#categoryAlert");
      const messageElement = document.querySelector("div#categoryAlert span.msg");

      const input = event.target.elements.newCategoryNameField;
      const categoryName = input.value;

      // validate input locally before submitting to server
      if (!categoryName || categoryName.length < 1 || categoryName.length > 20) {
        messageElement.textContent = "Incorrect category name.";
        lib.setFailStyle(alertElement);
        input.focus();
        event.preventDefault();
      }

      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          input.value = ""; // remember to empty input
          lib.setSuccessStyle(alertElement);
          messageElement.textContent = "Caregory created succsessfully.";
          // server validation failed
        } else if (this.readyState == 4 && this.status == 500) {
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
            document.querySelector(`tr[data-post-id="${categoryId}"]`).remove(); // remove deleted row from table
            lib.setSuccessStyle(alertElement);
            messageElement.textContent = "Caregory deleted succsessfully.";
          } else if (this.readyState == 4 && this.status == 500) {
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
      element.classList.remove("fail", "hidden");
    },

    setFailStyle: function(element) {
      element.classList.add("fail");
      element.classList.remove("success", "hidden");
    },

    hideParentElement: function(event) {
      const elementToHide = event.target.parentElement;
      elementToHide.classList.add("hidden");
      event.preventDefault();
    }
  };

  return adminLib;
})();
