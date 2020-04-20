shopLib = (function() {
  const info = "Helper library for drawing html elements based on db data.";

  const version = "0.1";
  const SHOP_URL = `${location.protocol}//${location.host}/fend19-frontendproject-shop`;
  const CONTROLLER_PATH = `${SHOP_URL}/php/controller`;
  const INTERNAL_API_PATH = `${SHOP_URL}/api`;

  let shopLib = {
    drawCategorySelectors: function() {
      const lib = this;
      const productApiUrl = `${INTERNAL_API_PATH}/categories.php`;

      const sidebar = document.querySelector("ul#sidebarCategoryContainer");
      sidebar.innerHTML = "";

      const dropdown = document.querySelector("form.top-nav__form");
      dropdown.innerHTML = "";

      // get category json from api
      lib.loadJsonByXhr(productApiUrl, function(categoryJson) {
        // add a default row to the dropdown menu that shows products of all categories
        const defaultRow = `
        <li class='sidebar__menu__list-item'>
            <input type='submit' id='-1' value='Visa Alla'>
        </li>`;

        dropdown.innerHTML += defaultRow;
        sidebar.innerHTML += defaultRow;

        // iterate over all categories
        categoryJson.forEach(category => {
          const categoryRow = `
            <li class='sidebar__menu__list-item'>
                <input type='submit' id='${category.id}' value='${category.name}'>
            </li>`;
          dropdown.innerHTML += categoryRow;
          sidebar.innerHTML += categoryRow;
        });
      });
    },

    drawFilteredProductPanel: function(event) {
      const categoryId = event.submitter.id;
      console.log(categoryId);
      event.preventDefault();
      const lib = this;
      //lib.drawProductPanel();
    },

    drawProductPanel: function(productJson) {},

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

  return shopLib;
})();
