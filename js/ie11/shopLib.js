shopLib = (function() {
  var info = "Helper library for drawing html elements based on db data.";
  var version = "0.2";
  var SHOP_URL = "".concat(location.protocol, "//").concat(location.host, "/fend19-frontendproject-shop");
  var CONTROLLER_PATH = "".concat(SHOP_URL, "/php/controller");
  var INTERNAL_API_PATH = "".concat(SHOP_URL, "/api");
  var shopLib = {
    drawCategorySelectors: function drawCategorySelectors() {
      var lib = this;
      var categoryApiUrl = "".concat(INTERNAL_API_PATH, "/categories.php"); //cache selectors

      var sidebar = document.querySelector("ul#sidebarCategoryContainer");
      var dropdown = document.querySelector("form.top-nav__form");
      sidebar.innerHTML = "";
      dropdown.innerHTML = ""; // get category json from api

      lib.loadJsonByXhr(categoryApiUrl, function(categoryJson) {
        // add a default row to the dropdown menu that shows products of all categories
        var defaultRow =
          "\n        <li class='sidebar__menu__list-item'>\n            <input class=\"categoryFilterButton\" type='button' id='-1' value='Visa Alla' onclick=\"shopLib.drawFilteredProductPanel(event)\" >\n        </li>";
        dropdown.innerHTML += defaultRow;
        sidebar.innerHTML += defaultRow; // iterate over all categories

        categoryJson.forEach(function(category) {
          var categoryRow = "\n            <li class='sidebar__menu__list-item'>\n                <input class=\"categoryFilterButton\" type='button' id='"
            .concat(category.id, "' value='")
            .concat(category.name, '\' onclick="shopLib.drawFilteredProductPanel(event)">\n            </li>');
          dropdown.innerHTML += categoryRow;
          sidebar.innerHTML += categoryRow;
        });
      });
    },
    drawDefaultProductPanel: function drawDefaultProductPanel(event) {
      var lib = this;
      var productApi = "".concat(INTERNAL_API_PATH, "/products.php");
      lib.loadJsonByXhr(productApi, function(productJson) {
        lib.drawProductPanel(productJson);
      });
    },
    drawFilteredProductPanel: function drawFilteredProductPanel(event) {
      var lib = this;
      var allowedCategoryId = Number(event.currentTarget.id);
      var productApi = "".concat(INTERNAL_API_PATH, "/products.php");
      lib.loadJsonByXhr(productApi, function(productJson) {
        if (allowedCategoryId === -1) {
          lib.drawProductPanel(productJson);
        } else {
          productJson = productJson.filter(function(product) {
            return product.categoryId === allowedCategoryId;
          });
          lib.drawProductPanel(productJson);
        }
      });
      lib.hideSidePanel();
      event.preventDefault();
    },
    drawProductPanel: function drawProductPanel(productJson) {
      var productPanel = document.querySelector("div#productPanel");
      var cardHtml = "";
      productJson.forEach(function(item) {
        var coverImage =
          item.imageGallery.length > 0 ? "./img/product/" + item.imageGallery[0] : "./img/product/placeholder.png";
        cardHtml += "\n        <div id='"
          .concat(
            item.id,
            "' class='product grid-box'>\n            <div class='product__img-wrapper grid-3'>\n                <img class='product__img' src='"
          )
          .concat(
            coverImage,
            "' alt='product name'>\n            </div>\n            <div class='grid-2'>\n                <p class='product__title'>"
          )
          .concat(item.title, "</p>\n                <div class='product__price'>")
          .concat(item.price, " ")
          .concat(
            item.currency,
            "</div>\n                <div class='product__count-container'>\n                    <button class='product__count-btn'>-</button>\n                    <p class='product__count'>"
          )
          .concat(
            item.numberInStock,
            "</p>\n                    <button class='product__count-btn'>+</button>\n                </div>\n                <button class='product__add-btn ctrl-standard typ-subhed fx-bubbleUp'>L\xE4gg i varukorgen</button>\n            </div>\n        </div>"
          );
      });
      productPanel.innerHTML = "";
      productPanel.innerHTML += cardHtml; // show error message if this category has no products

      var errorMsg = document.querySelector(".emptyCategoryMessage");

      if (cardHtml.length === 0) {
        errorMsg.classList.remove("hidden");
      } else {
        errorMsg.classList.add("hidden");
      } // add event listeners to "add to cart" buttons

      var productBtn = document.querySelectorAll(".product__add-btn");
      addProduct(productBtn);
    },
    searchProducts: function searchProducts(event) {
      var keyword = document.forms["searchform"]["searchinput"].value.toLocaleLowerCase(); // if we are not on search.php page remember this keyword in session storage and go to search.php

      if (location.pathname !== "/fend19-frontendproject-shop/search.php") {
        sessionStorage.setItem("searchKeyword", keyword);
        location.href = SHOP_URL + "/search.php";
        event.preventDefault();
        return;
      } // validate keyword length again

      if (keyword.length < 2) {
        event.preventDefault();
        return;
      }

      var lib = this;
      var productApi = "".concat(INTERNAL_API_PATH, "/products.php");
      lib.loadJsonByXhr(productApi, function(productJson) {
        var matchingProducts = productJson.filter(function(product) {
          return (
            product.title.toLowerCase().indexOf(keyword) !== -1 &&
            product.description.toLowerCase().indexOf(keyword) !== -1
          );
        }); // console.log(matchingProducts);

        lib.drawSearchResultList(matchingProducts);
      });
      sessionStorage.removeItem("searchKeyword");
      event.preventDefault();
    },
    sessionStorageProductSearch: function sessionStorageProductSearch() {
      var lib = this;
      var keyword = sessionStorage.getItem("searchKeyword").toLocaleLowerCase();
      var productApi = "".concat(INTERNAL_API_PATH, "/products.php");
      lib.loadJsonByXhr(productApi, function(productJson) {
        var matchingProducts = productJson.filter(function(product) {
          return (
            product.title.toLowerCase().indexOf(keyword) !== -1 &&
            product.description.toLowerCase().indexOf(keyword) !== -1
          );
        });
        lib.drawSearchResultList(matchingProducts);
      });
      sessionStorage.removeItem("searchKeyword");
    },
    drawSearchResultList: function drawSearchResultList(productJson) {
      var productPanel = document.querySelector("div.searchResults");
      var cardHtml = "";
      productJson.forEach(function(item) {
        var coverImage =
          item.imageGallery.length > 0 ? "./img/product/" + item.imageGallery[0] : "./img/product/placeholder.png";
        cardHtml += "\n        <div id='"
          .concat(
            item.id,
            "' class='product grid-box'>\n            <div class='product__img-wrapper grid-3'>\n                <img class='product__img' src='"
          )
          .concat(
            coverImage,
            "' alt='product name'>\n            </div>\n            <div class='grid-2'>\n                <p class='product__title'>"
          )
          .concat(item.title, "</p>\n                <div class='product__price'>")
          .concat(item.price, " ")
          .concat(
            item.currency,
            "</div>\n                <div class='product__count-container'>\n                    <p class='product__count'>"
          )
          .concat(item.numberInStock, "</p>\n                </div>\n            </div>\n        </div>");
      });
      productPanel.innerHTML = "";
      productPanel.innerHTML += cardHtml; // show error message if this category has no products

      var errorMsg = document.querySelector(".emptyResultMessage");

      if (cardHtml.length === 0) {
        errorMsg.classList.remove("hidden");
      } else {
        errorMsg.classList.add("hidden");
      }
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
    },
    hideSidePanel: function hideSidePanel() {
      document.querySelector(".hamburger__bar-wrapper").classList.remove("active");
      document.querySelector(".sidebar").classList.remove("active");
    },
    showSidePanel: function showSidePanel() {
      document.querySelector(".hamburger__bar-wrapper").classList.add("active");
      document.querySelector(".sidebar").classList.add("active");
    }
  };
  return shopLib;
})();
