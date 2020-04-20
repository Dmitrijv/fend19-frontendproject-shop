shopLib = (function() {
  const info = "Helper library for drawing html elements based on db data.";

  const version = "0.1";
  const SHOP_URL = `${location.protocol}//${location.host}/fend19-frontendproject-shop`;
  const CONTROLLER_PATH = `${SHOP_URL}/php/controller`;
  const INTERNAL_API_PATH = `${SHOP_URL}/api`;

  let shopLib = {
    drawHeaderCategoryDropdown() {
      const lib = this;
      const productApiUrl = `${INTERNAL_API_PATH}/categories.php`;

      const virtualDom = new DOMParser().parseFromString(`<form class="top-nav__form"></form>`, "text/html");
      const newDropdown = virtualDom.querySelector("form.top-nav__form");

      // get category json from api
      lib.loadJsonByXhr(productApiUrl, function(categoryJson) {
        // add a default row to the dropdown menu that shows products of all categories
        const defaultRow = new DOMParser().parseFromString(
          `<li class='sidebar__menu__list-item'>
                <input class='sidebar__input__item' type='radio' id='-1' name='categoryid' value='-1'>
                <label class='sidebar__menu__item' for='-1'>Visa Alla</label>
            </li>`,
          "text/html"
        );
        defaultRow.querySelector(`label`).addEventListener("click", lib.drawFilteredProductPanel);

        console.log(defaultRow.querySelector("li.sidebar__menu__list-item"));

        virtualDd.appendChild(defaultRow.querySelector("li.sidebar__menu__list-item"));

        // iterate over all categories
        categoryJson.forEach(category => {
          categoryRow = new DOMParser().parseFromString(
            `<li class='sidebar__menu__list-item'>
                <input class='sidebar__input__item' type='radio' id='${category.id}' name='categoryid' value='${category.id}'>
                <label class='sidebar__menu__item' for='${category.id}'>${category.name}</label>
            </li>`,
            "text/html"
          );
          newDropdown.appendChild(categoryRow.querySelector(".sidebar__menu__list-item"));
        });
        // replace old drop down with the new one
        const formContainer = document.querySelector("div#categoryDropdownFormContainer");
        formContainer.innerHTML = "";
        formContainer.appendChild(newDropdown.querySelector("form.top-nav__form"));
      });
    },

    drawFilteredProductPanel(productId) {
      const lib = this;
      console.log(productId);
      //lib.drawProductPanel();
    },

    drawProductPanel(products) {
      console.log(products);
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
