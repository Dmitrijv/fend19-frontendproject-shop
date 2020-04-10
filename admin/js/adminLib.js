adminLib = (function() {
  const info = "Helper library for making controller calls to php.";
  const version = "0.1";
  const CONTROLLER_PATH = `${location.origin}/fend19-frontendproject-shop/admin/php/controller`;

  let adminLib = {
    createNewCategory: function(event) {
      const input = event.target.elements.newCategoryNameField;
      const categoryName = input.value;

      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log("JS managed to POST a request to a php file");
        } else if (this.readyState == 4 && this.status == 500) {
          console.log("JS should now handle errors");
        }
      };

      // path must be relative to display page
      xmlhttp.open("POST", `${CONTROLLER_PATH}/category/createCategory.php`, true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send(`categoryName=${categoryName}`);

      event.preventDefault();
    }
  };

  return adminLib;
})();
