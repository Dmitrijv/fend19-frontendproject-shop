var cartBtn = document.querySelector(".open-overlay");
var cart = document.querySelector(".cart");
var cartCloseBtn = document.querySelector(".cart-close-btn");
var clearBtn = document.querySelector(".cart__erase");
var totalSum = document.querySelector(".total-sum");
var overlayClick = document.querySelector(".overlay");
clearBtn.addEventListener("click", clearCart);
cartBtn.addEventListener("click", toggleCart);
cartCloseBtn.addEventListener("click", toggleCart);

function toggleCart() {
  cart.style.display === "flex" ? (cart.style.display = "none") : (cart.style.display = "flex");
}

function clearCart() {
  localStorage.clear();
  clearBtn.nextElementSibling.innerHTML = "";
  totalSum.textContent = "";
}

function fillCartList(fromClick) {
  var productName, productImg, productPrice, productQty;
  var product;
  var getLs = JSON.parse(localStorage.getItem("products"));
  var cartList = document.querySelector(".cart__product-list");

  for (var i = 0; i < getLs.length; i++) {
    if (fromClick) {
      var lastItem = getLs.length - 1;
      productId = getLs[lastItem].id;
      productName = getLs[lastItem].name;
      productImg = getLs[lastItem].img;
      productPrice = getLs[lastItem].price;
      productQty = getLs[lastItem].qty;
    } else {
      productId = getLs[i].id;
      productName = getLs[i].name;
      productImg = getLs[i].img;
      productPrice = getLs[i].price;
      productQty = getLs[i].qty;
    }

    product = '\n      <div id="'
      .concat(
        productId,
        '" class="cart__product">\n        <div class="cart__product-img" style="background-image: url('
      )
      .concat(productImg, '); "></div>\n        <div class="cart__product-text">')
      .concat(productName, '</div>\n        <div class="cart__product-price">')
      .concat(
        productPrice,
        '</div>\n        <div class="cart__product-pull-right">\n          <span><button class="qtyBtn minusQty">-</button></span>\n          <div class="cart__product-qty">'
      )
      .concat(
        productQty,
        '</div>\n          <span><button class="qtyBtn plusQty">+</button></span>\n          <div class="cart__product-delete"><img src="./img/svg/close.svg"></div>\n        </div>\n      </div>'
      );

    if (fromClick === false) {
      cartList.innerHTML += product;
    }
  }

  if (fromClick) {
    cartList.innerHTML += product;
  }

  deleteProduct(getLs);
  updateSum(getLs);
  changeQty(getLs);
}

var productInfo = function productInfo(btn) {
  productName = btn.parentElement.firstElementChild.textContent; //get url from product card

  productImg = btn.parentElement.previousElementSibling.firstElementChild.style.backgroundImage.slice(5, -2);
  productPrice = btn.previousElementSibling.previousElementSibling.textContent;
  productQty = btn.previousElementSibling.firstElementChild.nextElementSibling.textContent;
  productId = btn.parentElement.parentElement.id; //t

  return {
    id: productId,
    name: productName,
    img: productImg,
    price: productPrice,
    qty: productQty
  };
};

function alreadyExist(getArray, productName) {
  var nameInLs;

  for (var i = 0; i < getArray.length; i++) {
    nameInLs = getArray[i].name;
  }

  return nameInLs === productName;
}

function setLocalStorage(obj, fromClick) {
  var productName = obj.parentElement.firstElementChild.textContent;
  var alreadyExst = false;
  var getArray;

  if (localStorage.getItem("products") === null) {
    var prodArray = [];
    prodArray.push(productInfo(obj));
    localStorage.setItem("products", JSON.stringify(prodArray));
  } else {
    getArray = JSON.parse(localStorage.getItem("products"));

    if (alreadyExist(getArray, productName)) {
      alert("Produkten finns redan i varukorgen!");
      alreadyExst = true;
    } else {
      getArray.push(productInfo(obj));
      localStorage.setItem("products", JSON.stringify(getArray));
    }
  }

  if (alreadyExst === false) {
    fillCartList(fromClick);
  }
}

function refreshCartList() {
  var getLocalStorage = JSON.parse(localStorage.getItem("products"));
  if (getLocalStorage === null) return;
  var fromClick = false;
  fillCartList(fromClick);
}

refreshCartList();

function addProduct(productBtn) {
  var _loop = function _loop(i) {
    var addBtn = productBtn[i];
    addBtn.addEventListener("click", function(e) {
      var fromClick = true;
      setLocalStorage(addBtn, fromClick);
    });
  };

  for (var i = 0; i < productBtn.length; ++i) {
    _loop(i);
  }
}

function deleteProduct(getJSON) {
  var deleteBtn = document.querySelectorAll(".cart__product-delete");

  var _loop2 = function _loop2(i) {
    var delBtn = deleteBtn[i];
    delBtn.addEventListener("click", function(e) {
      var index = getJSON.findIndex(function(prod) {
        return prod.id == delBtn.parentElement.parentElement.id;
      });
      getJSON.splice(index, 1);
      delBtn.parentElement.parentElement.remove();
      localStorage.setItem("products", JSON.stringify(getJSON));
      updateSum(getJSON);

      if (totalSum.textContent === "0") {
        clearCart();
      }
    });
  };

  for (var i = 0; i < deleteBtn.length; ++i) {
    _loop2(i);
  }
}

function updateSum(getLs) {
  var sum = 0;

  for (var i = 0; i < getLs.length; i++) {
    var str = getLs[i].price;
    var res = str.replace(/\D/g, "");
    sum += +res * getLs[i].qty;
  }

  totalSum.textContent = sum + " kr";
}

function changeQty(getJSON) {
  var qtyBtns = document.querySelectorAll(".qtyBtn");

  var _loop3 = function _loop3(i) {
    var btn = qtyBtns[i];
    btn.addEventListener("click", function() {
      var index = getJSON.findIndex(function(prod) {
        return prod.id == btn.parentElement.parentElement.parentElement.id;
      });

      if (btn.innerHTML === "+") {
        getJSON[index].qty -= 1; //???

        getJSON[index].qty += 2;
        btn.parentElement.previousElementSibling.textContent = getJSON[index].qty;
      } else {
        if (getJSON[index].qty > 1) getJSON[index].qty -= 1;
        btn.parentElement.nextElementSibling.textContent = getJSON[index].qty;
      }

      localStorage.setItem("products", JSON.stringify(getJSON));
      updateSum(getJSON);
    });
  };

  for (var i = 0; i < qtyBtns.length; ++i) {
    _loop3(i);
  }
}
