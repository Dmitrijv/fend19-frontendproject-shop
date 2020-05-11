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
        // only display categories that actually have items
        categoryJson = categoryJson.filter(category => Number(category.relatedProducts) !== 0);
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

    drawDefaultProductPanel: function() {
      const lib = this;
      const productInternal = `${INTERNAL_PATH}/products.php`;
      const redirectFilterId = Number(sessionStorage.getItem("categoryFilterId"));
      lib.loadJsonByXhr(productInternal, function(productJson) {
        if (redirectFilterId && redirectFilterId !== -1) {
          let filteredList = productJson.filter(product => Number(product.categoryId) === redirectFilterId);
          lib.drawProductPanel(filteredList);
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
      const lib = this;
      productJson = productJson.filter(product => Number(product.numberInStock) > 0);
      productJson = lib.shuffle(productJson);

      const shoppingCart = lib.getShoppingCart();
      const productPanel = document.querySelector("div#productPanel");

      let cardHtml = "";
      productJson.forEach(item => {
        let classString = item.new == true ? "newProduct" : item.old == true ? "oldProduct" : "";
        if (shoppingCart.find) {
          classString = shoppingCart.find(cartItem => cartItem.id == item.id) ? classString + " inCart" : classString;
        }
        const coverImage =
          item.imageGallery.length > 0 ? "./img/product/" + item.imageGallery[0] : "./img/product/placeholder.png";
        cardHtml += `
            <div id='${item.id}' class='product grid-box ${classString}'>
                <a href='product.php?productId=${item.id}'>
                    <div class='product__img-wrapper grid-3' style="background-image: url(${coverImage})"></div>
                </a>
                <div class='grid-2'>
                    <p class='product__title'>${item.title}</p>
                    <div class='product__price'>${item.price} ${item.currency}</div>
                    <div class='product__count-container'>
                        <button class='hidden product__count-btn'>-</button>
                        <p class='product__count'>${item.numberInStock}</p>
                        <button class='hidden product__count-btn'>+</button>
                    </div>
                    <button class='product__add-btn' data-productId='${item.id}'>Lägg i varukorgen</button>
                </div>
                <div style="display: none;" class='hiddenInputItems'>
                <input type="hidden" name="productId" value="${item.id}">
                <input type="hidden" name="productImage" value="${coverImage}">
                <input type="hidden" name="productTitle" value="${item.title}">
                <input type="hidden" name="productPrice" value="${item.price} ${item.currency}">
                <input type="hidden" name="productNumberInStock" value="${item.numberInStock}">
                </div>
            </div>`;
      });
      productPanel.innerHTML = "";
      productPanel.innerHTML += cardHtml;

      // show error message if this category has no products
      const errorMsg = document.querySelector(".emptyCategoryMessage");
      if (errorMsg) {
        if (cardHtml.length === 0) {
          errorMsg.classList.remove("hidden");
        } else {
          errorMsg.classList.add("hidden");
        }
      }

      // add event listeners to "add to cart" buttons
      var productBtn = document.querySelectorAll(".product__add-btn");
      addProduct(productBtn);
    },

    searchProducts: function(event) {
      const keyword = document.forms["searchform"]["searchinput"].value.toLocaleLowerCase();
      // if we are not on search.php page remember this keyword in session storage and go to search.php
      if (location.pathname !== "/fend19-frontendproject-shop/search.php") {
        sessionStorage.setItem("searchKeyword", keyword);
        location.href = SHOP_URL + "/search.php";
        event.preventDefault();
        return;
      }

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
        const matchingProducts = productJson.filter(
          product => product.title.toLowerCase().indexOf(keyword) !== -1 && Number(product.numberInStock) > 0
        );
        // show error message if this search produced no results
        const errorMsg = document.querySelector(".emptyResultMessage");
        if (matchingProducts.length === 0) {
          errorMsg.classList.remove("hidden");
          document.querySelector("#productPanel").innerHTML = "";
        } else {
          errorMsg.classList.add("hidden");
          lib.drawProductPanel(matchingProducts);
        }
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
        lib.drawProductPanel(matchingProducts);
      });
      sessionStorage.removeItem("searchKeyword");
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

    drawLastChancePanel: function() {
      const lib = this;
      const internal = `${INTERNAL_PATH}/products.php`;
      lib.loadJsonByXhr(internal, function(productJson) {
        productJson = productJson.filter(product => product.old && product.old == true);
        lib.drawProductPanel(productJson);
      });
    },

    drawLatestProductsPanel: function() {
      const lib = this;
      const internal = `${INTERNAL_PATH}/products.php`;
      lib.loadJsonByXhr(internal, function(productJson) {
        productJson = productJson.filter(product => product.new && product.new == true);
        lib.drawProductPanel(productJson);
      });
    },

    shuffle: function(array) {
      return array.sort(() => Math.random() - 0.5);
    }
  };

  return shopLib;
})();
