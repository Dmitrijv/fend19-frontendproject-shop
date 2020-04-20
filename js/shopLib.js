shopLib = (function() {
  const info = "Helper library for drawing html elements based on db data.";

  const version = "0.1";
  const SHOP_URL = `${location.protocol}//${location.host}/fend19-frontendproject-shop`;
  const CONTROLLER_PATH = `${SHOP_URL}/php/controller`;
  const INTERNAL_API_PATH = `${SHOP_URL}/api`;

  let shopLib = {
    drawHeaderCategoryDropdown: function() {
      const lib = this;
      const productApiUrl = `${INTERNAL_API_PATH}/categories.php`;

      const virtualDom = new DOMParser().parseFromString(`<form class="top-nav__form"></form>`, "text/html");
      const newDropdown = virtualDom.querySelector("form.top-nav__form");

      // get category json from api
      lib.loadJsonByXhr(productApiUrl, function(categoryJson) {
        // add a default row to the dropdown menu that shows products of all categories
        const defaultRow = `
        <li class='sidebar__menu__list-item'>
            <input type='submit' id='-1' value='Visa Alla'>
        </li>`;

        newDropdown.innerHTML += defaultRow;

        // iterate over all categories
        categoryJson.forEach(category => {
          const categoryRow = `
            <li class='sidebar__menu__list-item'>
                <input type='submit' id='${category.id}' value='${category.name}'>
            </li>`;
          newDropdown.innerHTML += categoryRow;
        });

        // replace old drop down with the new one
        const sidebar = document.querySelector("div#dropdownCategoryContainer");
        sidebar.innerHTML = "";
        sidebar.appendChild(newDropdown);

        // replace old sidebar with new one
        // const dropdown = document.querySelector("ul#sidebarCategoryContainer");
        // dropdown.innerHTML = "";
        // dropdown.appendChild(newDropdown);
      });
    },

    drawFilteredProductPanel: function(event) {
      const lib = this;
      //   console.log(12313);
      //   console.log(event.currentTarget);
      event.preventDefault();
      //lib.drawProductPanel();
    },

    drawProductPanel: function(event) {
      console.log(products);
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

  return shopLib;
})();
