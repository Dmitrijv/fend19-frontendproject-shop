shopLib = (function() {
  const info = "Helper library for drawing html elements based on db data.";

  const version = "0.1";
  const SHOP_URL = `${location.protocol}//${location.host}/fend19-frontendproject-shop`;
  const CONTROLLER_PATH = `${SHOP_URL}/php/controller`;
  const INTERNAL_API_PATH = `${SHOP_URL}/api`;

  let shopLib = {
    drawCategorySelectors: function() {
      const lib = this;
      const categoryApiUrl = `${INTERNAL_API_PATH}/categories.php`;

      const sidebar = document.querySelector("ul#sidebarCategoryContainer");
      sidebar.innerHTML = "";

      const dropdown = document.querySelector("form.top-nav__form");
      dropdown.innerHTML = "";

      // get category json from api
      lib.loadJsonByXhr(categoryApiUrl, function(categoryJson) {
        // add a default row to the dropdown menu that shows products of all categories
        const defaultRow = `
        <li class='sidebar__menu__list-item'>
            <input type='submit' id='-1' value='Visa Alla' onclick="shopLib.drawFilteredProductPanel(event)" >
        </li>`;

        dropdown.innerHTML += defaultRow;
        sidebar.innerHTML += defaultRow;

        // iterate over all categories
        categoryJson.forEach(category => {
          const categoryRow = `
            <li class='sidebar__menu__list-item'>
                <input type='submit' id='${category.id}' value='${category.name}' onclick="shopLib.drawFilteredProductPanel(event)">
            </li>`;
          dropdown.innerHTML += categoryRow;
          sidebar.innerHTML += categoryRow;
        });
      });
    },

    drawDefaultProductPanel: function(event) {
      const lib = this;
      const productApi = `${INTERNAL_API_PATH}/products.php`;
      lib.loadJsonByXhr(productApi, function(productJson) {
        lib.drawProductPanel(productJson);
      });
    },

    drawFilteredProductPanel: function(event) {
      const lib = this;
      const allowedCategoryId = Number(event.currentTarget.id);

      const productApi = `${INTERNAL_API_PATH}/products.php`;
      lib.loadJsonByXhr(productApi, function(productJson) {
        if (allowedCategoryId === -1) {
          lib.drawProductPanel(productJson);
        } else {
          productJson = productJson.filter(product => product.categoryId === allowedCategoryId);
          lib.drawProductPanel(productJson);
        }
      });
      event.preventDefault();
    },

    drawProductPanel: function(productJson) {
      const productPanel = document.querySelector("div#productPanel");
      let cardHtml = "";
      productJson.forEach(item => {
        const coverImage =
          item.imageGallery.length > 0 ? "./img/product/" + item.imageGallery[0] : "./img/product/placeholder.png";
        cardHtml += `
        <div class='product grid-box'>
            <div class='product__img-wrapper grid-3'>
                <img class='product__img' src='${coverImage}' alt='product name'>
            </div>
            <div class='grid-2'>
                <p class='product__title'>${item.title}</p>
                <div class='product__count-container'>
                    <button class='product__count-btn'>-</button>
                    <p class='product__count'>${item.numberInStock}</p>
                    <button class='product__count-btn'>+</button>
                </div>
                <div class='product__price'>${item.price} ${item.currency}</div>
                <button class='product__add-btn'>Lägg i varukorgen</button>
            </div>
        </div>`;
      });
      productPanel.innerHTML = "";
      productPanel.innerHTML += cardHtml;
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
