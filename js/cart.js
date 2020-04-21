var cartBtn = document.querySelector(".cart-btn");
var cart = document.querySelector(".cart");
cartBtn.addEventListener("click", function (e) {
  cart.style.display === "flex"
    ? (cart.style.display = "none")
    : (cart.style.display = "flex");
});

function fillCartList(fromClick) {
  var productName, productImg, productPrice, productQty;
  var product;
  var getLs = JSON.parse(localStorage.getItem("products"));
  var cartList = document.querySelector(".cart__product-list");

  for (var i = 0; i < getLs.length; i++) {
    if (fromClick) {
      var lastItem = getLs.length - 1;
      productName = getLs[lastItem].name;
      productImg = getLs[lastItem].img;
      productPrice = getLs[lastItem].price;
      productQty = getLs[lastItem].qty;
    } else {
      productName = getLs[i].name;
      productImg = getLs[i].img;
      productPrice = getLs[i].price;
      productQty = getLs[i].qty;
    }

    product = '<div class="cart__product">\n    <div class="cart__product-img"><img class="cart__product__img-src" src="'
      .concat(
        productImg,
        '" alt="product name"></div>\n    <div class="cart__product-text">'
      )
      .concat(productName, '</div>\n    <div class="cart__product-price">')
      .concat(
        productPrice,
        '</div>\n    <div class="cart__product-pull-right">\n        <div class="cart__product-qty">'
      )
      .concat(
        productQty,
        '</div>\n        <div class="cart__product-delete">X</div>\n    </div>\n    </div>'
      );

    if (fromClick === false) {
      cartList.innerHTML += product;
    }
  }

  if (fromClick) {
    cartList.innerHTML += product;
  }
}

var productInfo = function productInfo(btn) {
  productName = btn.parentElement.firstElementChild.textContent;
  productImg = btn.parentElement.previousElementSibling.firstElementChild.src;
  productPrice = btn.previousElementSibling.textContent;
  productQty =
    btn.previousElementSibling.firstElementChild
      .nextElementSibling.textContent;
  return {
    id: 1,
    name: productName,
    img: productImg,
    price: productPrice,
    qty: productQty,
  };
};

function setLocalStorage(obj, fromClick) {
  var getArray;

  if (localStorage.getItem("products") === null) {
    var prodArray = [];
    prodArray.push(productInfo(obj));
    localStorage.setItem("products", JSON.stringify(prodArray));
  } else {
    getArray = JSON.parse(localStorage.getItem("products"));
    getArray.push(productInfo(obj));
    localStorage.setItem("products", JSON.stringify(getArray));
  }

  fillCartList(fromClick);
}

function refreshCartList() {
  var getLocalStorage = JSON.parse(localStorage.getItem("products"));
  if (getLocalStorage === null) return;
  var fromClick = false;
  fillCartList(fromClick);
}

refreshCartList();

function addProduct(productBtn) {
  for (let index = 0; index < productBtn.length; index++) {
    const addBtn = productBtn[index];

    addBtn.addEventListener("click", function (e) {
      var fromClick = true;
      setLocalStorage(addBtn, fromClick);
    });
  }
}
