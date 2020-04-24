shopLib = (function() {
  const info = "Helper library for drawing html elements based on db data.";

  const version = "0.2";
  const SHOP_URL = `${location.protocol}//${location.host}/fend19-frontendproject-shop`;
  const CONTROLLER_PATH = `${SHOP_URL}/php/controller`;
  const INTERNAL_PATH = `${SHOP_URL}/php/internal`;

  let shopLib = {
    drawCategorySelectors: function() {
      const lib = this;
      const categoryInternalUrl = `${INTERNAL_PATH}/categories.php`;
      //cache selectors
      const sidebar = document.querySelector("ul#sidebarCategoryContainer");
      const dropdown = document.querySelector("form.top-nav__form");
      sidebar.innerHTML = "";
      dropdown.innerHTML = "";
      // get category json from Internal
      lib.loadJsonByXhr(categoryInternalUrl, function(categoryJson) {
        // add a default row to the dropdown menu that shows products of all categories
        const defaultRow = `
        <li class='sidebar__menu__list-item'>
            <input class="categoryFilterButton" type='button' id='-1' value='Visa Alla' onclick="shopLib.drawFilteredProductPanel(event)" >
        </li>`;
        dropdown.innerHTML += defaultRow;
        sidebar.innerHTML += defaultRow;
        // iterate over all categories
        categoryJson.forEach(category => {
          const categoryRow = `
            <li class='sidebar__menu__list-item'>
                <input class="categoryFilterButton" type='button' id='${category.id}' value='${category.name}' onclick="shopLib.drawFilteredProductPanel(event)">
            </li>`;
          dropdown.innerHTML += categoryRow;
          sidebar.innerHTML += categoryRow;
        });
      });
    },

    drawDefaultProductPanel: function(event) {
      const lib = this;
      const productInternal = `${INTERNAL_PATH}/products.php`;
      const redirectFilterId = Number(sessionStorage.getItem("categoryFilterId"));

      lib.loadJsonByXhr(productInternal, function(productJson) {
        if (redirectFilterId && redirectFilterId !== -1) {
          productJson = productJson.filter(product => product.categoryId === redirectFilterId);
          lib.drawProductPanel(productJson);
          sessionStorage.setItem("categoryFilterId", -1);
        } else {
          lib.drawProductPanel(productJson);
        }
      });
    },

    drawFilteredProductPanel: function(event) {
      const lib = this;
      const allowedCategoryId = Number(event.currentTarget.id);

      // if we are clicking category from some page other than start page go back there
      if (location.pathname !== "/fend19-frontendproject-shop/index.php") {
        sessionStorage.setItem("categoryFilterId", allowedCategoryId);
        location.href = SHOP_URL + "/index.php";
        event.preventDefault();
        return;
      }

      const productInternal = `${INTERNAL_PATH}/products.php`;
      lib.loadJsonByXhr(productInternal, function(productJson) {
        if (allowedCategoryId === -1) {
          lib.drawProductPanel(productJson);
        } else {
          const newList = productJson.filter(product => product.categoryId == allowedCategoryId);
          lib.drawProductPanel(newList);
        }
      });
      lib.hideSidePanel();
      event.preventDefault();
    },

    drawProductPanel: function(productJson) {
      const productPanel = document.querySelector("div#productPanel");
      let cardHtml = "";
      productJson.forEach(item => {
        const coverImage =
          item.imageGallery.length > 0 ? "./img/product/" + item.imageGallery[0] : "./img/product/placeholder.png";
        cardHtml += `
        <div id='${item.id}' class='product grid-box'>
            <a href='product.php?productId=${item.id}'>
                <div class='product__img-wrapper grid-3' style="background-image: url(${coverImage})"></div>
            </a>
            <div class='grid-2'>
                <p class='product__title'>${item.title}</p>
                <div class='product__price'>${item.price} ${item.currency}</div>
                <div class='product__count-container'>
                    <button class='product__count-btn'>-</button>
                    <p class='product__count'>${item.numberInStock}</p>
                    <button class='product__count-btn'>+</button>
                </div>
                <button class='product__add-btn'>Lägg i varukorgen</button>
            </div>
        </div>`;
      });
      productPanel.innerHTML = "";
      productPanel.innerHTML += cardHtml;

      // show error message if this category has no products
      const errorMsg = document.querySelector(".emptyCategoryMessage");
      if (cardHtml.length === 0) {
        errorMsg.classList.remove("hidden");
      } else {
        errorMsg.classList.add("hidden");
      }

      // add event listeners to "add to cart" buttons
      var productBtn = document.querySelectorAll(".product__add-btn");
      addProduct(productBtn);
    },

    searchProducts: function(event) {
      //console.log("searchProducts");
      const keyword = document.forms["searchform"]["searchinput"].value.toLocaleLowerCase();
      //console.log(keyword);
      // if we are not on search.php page remember this keyword in session storage and go to search.php
      if (location.pathname !== "/fend19-frontendproject-shop/search.php") {
        sessionStorage.setItem("searchKeyword", keyword);
        location.href = SHOP_URL + "/search.php";
        event.preventDefault();
        return;
      }
      // validate keyword length again

      // show error message if this keyword is invalid
      const keywordErrMsg = document.querySelector(".invalidKeywordMessage");
      if (!keyword || keyword.length < 2) {
        keywordErrMsg.classList.remove("hidden");
        event.preventDefault();
        return;
      } else {
        keywordErrMsg.classList.add("hidden");
      }

      const lib = this;
      const productInternal = `${INTERNAL_PATH}/products.php`;
      lib.loadJsonByXhr(productInternal, function(productJson) {
        const matchingProducts = productJson.filter(product => product.title.toLowerCase().indexOf(keyword) !== -1);
        lib.drawSearchResultList(matchingProducts);
      });
      sessionStorage.removeItem("searchKeyword");
      event.preventDefault();
    },

    sessionStorageProductSearch() {
      const lib = this;
      const keyword = sessionStorage.getItem("searchKeyword").toLocaleLowerCase();
      // show error message if this keyword is invalid
      const keywordErrMsg = document.querySelector(".invalidKeywordMessage");
      if (!keyword || keyword.length < 2) {
        keywordErrMsg.classList.remove("hidden");
        event.preventDefault();
        return;
      } else {
        keywordErrMsg.classList.add("hidden");
      }

      const productInternal = `${INTERNAL_PATH}/products.php`;
      lib.loadJsonByXhr(productInternal, function(productJson) {
        const matchingProducts = productJson.filter(product => product.title.toLowerCase().indexOf(keyword) !== -1);
        // console.log(matchingProducts);
        lib.drawSearchResultList(matchingProducts);
      });
      sessionStorage.removeItem("searchKeyword");
    },

    drawSearchResultList(productJson) {
      const productPanel = document.querySelector("div.searchResults");
      let cardHtml = "";
      productJson.forEach(item => {
        const coverImage =
          item.imageGallery.length > 0 ? "./img/product/" + item.imageGallery[0] : "./img/product/placeholder.png";
        cardHtml += `
        <div id='${item.id}' class='product grid-box'>
            <a href='product.php?productId=${item.id}'>
                <div class='product__img-wrapper grid-3' style="background-image: url(${coverImage})"></div>
            </a>
            <div class='grid-2'>
                <p class='product__title'>${item.title}</p>
                <div class='product__price'>${item.price} ${item.currency}</div>
            </div>
        </div>`;
      });
      productPanel.innerHTML = "";
      productPanel.innerHTML += cardHtml;

      // show error message if this category has no products
      const errorMsg = document.querySelector(".emptyResultMessage");
      if (cardHtml.length === 0) {
        errorMsg.classList.remove("hidden");
      } else {
        errorMsg.classList.add("hidden");
      }
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
    },

    hideSidePanel: function() {
      document.querySelector(".hamburger__bar-wrapper").classList.remove("active");
      document.querySelector(".sidebar").classList.remove("active");
    },

    showSidePanel: function() {
      document.querySelector(".hamburger__bar-wrapper").classList.add("active");
      document.querySelector(".sidebar").classList.add("active");
    },
    getShoppingCart: function() {
      const shoppingCart = JSON.parse(localStorage.getItem("products"));
      return !shoppingCart || Object.keys(shoppingCart).length === 0 ? {} : shoppingCart;
    },

    clearShoppingCart: function() {
      localStorage.setItem("products", JSON.stringify({}));
    }
  };

  return shopLib;
})();
