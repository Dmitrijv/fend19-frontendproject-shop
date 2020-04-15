adminLib = (function() {
  const info = "Helper library for making controller calls to php.";
  const version = "0.1";
  const CONTROLLER_PATH = `${location.origin}/fend19-frontendproject-shop/admin/php/controller`;

  let adminLib = {
    createNewCategory: function(event) {
      const input = event.target.elements.newCategoryNameField;
      const categoryName = escape(input.value);
      const alertElement = document.querySelector("div#categoryAlert");
      const messageElement = document.querySelector("div#categoryAlert span.msg");

      function setSuccessStyle(element) {
        element.classList.add("success");
        element.classList.remove("fail", "hidden");
      }

      function setFailStyle(element) {
        element.classList.add("fail");
        element.classList.remove("success", "hidden");
      }

      // validate input locally before submitting to server
      if (!categoryName || categoryName.length < 3) {
        // console.log("FORM input failed local validation");
        messageElement.textContent = "Incorrect category name.";
        setFailStyle(alertElement);
        input.focus();
        event.preventDefault();
        return;
      }

      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // console.log("JS managed to POST a request to a php file");
          input.value = ""; // remember to empty input
          setSuccessStyle(alertElement);
          messageElement.textContent = "Caregory created succsessfully.";
        } else if (this.readyState == 4 && this.status == 500) {
          messageElement.textContent = "Internal server error.";
          setFailStyle(alertElement);
          event.preventDefault();
        }
      };

      xmlhttp.open("POST", `${CONTROLLER_PATH}/category/createCategoryRequest.php`, true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send(`categoryName=${categoryName}`);

      event.preventDefault();
    },

    hideParentElement: function(event) {
      const elementToHide = event.target.parentElement;
      elementToHide.classList.add("hidden");
      event.preventDefault();
    }
  };

  return adminLib;
})();
