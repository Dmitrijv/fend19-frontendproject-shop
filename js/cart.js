const cartBtn = document.querySelector(".open-overlay");
const cart = document.querySelector(".cart");
const cartCloseBtn = document.querySelector(".cart-close-btn");
const clearBtn = document.querySelector(".cart__erase");
const totalSum = document.querySelector(".total-sum");
const overlayClick = document.querySelector(".overlay");
const orderListArea = document.querySelector('.checkout-form__cart-section');

clearBtn.addEventListener("click", clearCart);
cartBtn.addEventListener("click", toggleCart);
cartCloseBtn.addEventListener("click", toggleCart);

function toggleCart() {
  cart.style.display === "flex" ? (cart.style.display = "none") : (cart.style.display = "flex");
}

function clearCart() {
  // localStorage.setItem("products", JSON.stringify({}));
  localStorage.removeItem("products");
  removeAllInCartStyle();
  clearBtn.nextElementSibling.innerHTML = "";
  totalSum.textContent = "";
}

function fillCartList(fromClick) {
  let productName, productImg, productPrice, productQty;
  let product;
  const getLs = JSON.parse(localStorage.getItem("products"));
  const cartList = document.querySelector(".cart__product-list");
  for (let i = 0; i < getLs.length; i++) {
    if (fromClick) {
      const lastItem = getLs.length - 1;
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
    product = `
      <div id="${productId}" class="cart__product">
        <div class="cart__product-img" style="background-image: url(${productImg}); "></div>
        <div class="cart__product-text">${productName}</div>
        <div class="cart__product-price">${productPrice}</div>
        <div class="cart__product-pull-right">
          <span><button class="qtyBtn minusQty">-</button></span>
          <div class="cart__product-qty">${productQty}</div>
          <span><button class="qtyBtn plusQty">+</button></span>
          <div class="cart__product-delete" data-productId='${productId}'><img src="./img/svg/close.svg"></div>
        </div>
      </div>`;

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
const productInfo = btn => {
  productId = btn.parentElement.nextElementSibling.firstElementChild.value; //id
  productImg = btn.parentElement.nextElementSibling.firstElementChild.nextElementSibling.value;
  productName = btn.parentElement.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.value;
  //get url from product card
  productPrice = btn.parentElement.nextElementSibling.lastElementChild.previousElementSibling.value;
  productQty = 1;
  productNumberInStock = btn.parentElement.nextElementSibling.lastElementChild.value;

  return {
    id: productId,
    name: productName,
    img: productImg,
    price: productPrice,
    qty: productQty,
    productNumberInStock: productNumberInStock
  };
};

function setLocalStorage(obj, fromClick) {
  const productName =
    obj.parentElement.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.value;
  let alreadyExists = false;
  let getArray;
  if (localStorage.getItem("products") === null) {
    let prodArray = [];
    prodArray.push(productInfo(obj));
    localStorage.setItem("products", JSON.stringify(prodArray));
  } else {
    getArray = JSON.parse(localStorage.getItem("products"));
    for (let i = 0; i < getArray.length; i++) {
      if (getArray[i].name === productName) {
        alreadyExists = true;
      }
    }

    if (alreadyExists) {
      // alert("You already have this item in your cart.");
      displayAlert();
    } else {
      getArray.push(productInfo(obj));
      localStorage.setItem("products", JSON.stringify(getArray));
    }
  }
  if (alreadyExists === false) {
    fillCartList(fromClick);
    inCartAnimation();
  }
}

function refreshCartList() {
  const getLocalStorage = JSON.parse(localStorage.getItem("products"));
  if (getLocalStorage === null) return;
  let fromClick = false;
  fillCartList(fromClick);
}
refreshCartList();

function addProduct(productBtn) {
  for (let i = 0; i < productBtn.length; ++i) {
    const addBtn = productBtn[i];
    addBtn.addEventListener("click", e => {
      let fromClick = true;
      setLocalStorage(addBtn, fromClick);
      const productId = e.currentTarget.dataset.productid;
      addInCartStyle(productId);
    });
  }
}

function deleteProduct(getJSON) {
  const deleteBtn = document.querySelectorAll(".cart__product-delete");
  for (let i = 0; i < deleteBtn.length; ++i) {
    const delBtn = deleteBtn[i];
    delBtn.addEventListener("click", e => {
      var findIndex = -1;
      getJSON.some(function (prod, i) {
        if (prod.id == delBtn.parentElement.parentElement.id) {
          findIndex = i;
          return true;
        }
      });
      getJSON.splice(findIndex, 1);
      delBtn.parentElement.parentElement.outerHTML = "";

      localStorage.setItem("products", JSON.stringify(getJSON));
      updateSum(getJSON);

      if (totalSum.textContent === "0") {
        clearCart();
      }

      const productId = e.currentTarget.dataset.productid;
      removeInCartStyle(productId);
    });
  }
}

function updateSum(getLs) {
  let sum = 0;
  for (let i = 0; i < getLs.length; i++) {
    var str = getLs[i].price;
    var res = str.replace(/.kr/g, "");
    sum += +res * getLs[i].qty;
  }
  totalSum.textContent = sum.toFixed(2) + " kr";
}

function changeQty(getJSON) {
  const qtyBtns = document.querySelectorAll(".qtyBtn");

  for (let i = 0; i < qtyBtns.length; ++i) {
    const qtyBtn = qtyBtns[i];
    qtyBtn.addEventListener("click", function () {
      var findQtyIndex = -1;
      for (var i = 0; i < getJSON.length; ++i) {
        if (getJSON[i].id == qtyBtn.parentElement.parentElement.parentElement.id) {
          findQtyIndex = i;
        }
      }

      if (qtyBtn.innerHTML === "+") {
        if (getJSON[findQtyIndex].qty < getJSON[findQtyIndex].productNumberInStock) {
          getJSON[findQtyIndex].qty -= 1; //???
          getJSON[findQtyIndex].qty += 2;
          qtyBtn.parentElement.previousElementSibling.textContent = getJSON[findQtyIndex].qty;
        }
      } else {
        if (getJSON[findQtyIndex].qty > 1) getJSON[findQtyIndex].qty -= 1;
        qtyBtn.parentElement.nextElementSibling.textContent = getJSON[findQtyIndex].qty;
      }
      localStorage.setItem("products", JSON.stringify(getJSON));
      updateSum(getJSON);
    });
  }
}

function addInCartStyle(productId) {
  const card = document.querySelector("div.product[id='" + productId + "']");
  if (card) card.classList.add("inCart");
}

function removeInCartStyle(productId) {
  const card = document.querySelector("div.product[id='" + productId + "']");
  if (card) card.classList.remove("inCart");
}

function removeAllInCartStyle() {
  const productCards = document.querySelectorAll('.product.inCart');
  for (card of productCards) {
    card.classList.remove('inCart');
  }
}

function inCartAnimation() {
  cartBtn.classList.add('inCartAnimation');
  const amount = getCartAmount();
  document.querySelector('button.open-overlay.inCartAnimation').setAttribute('data-before', amount)
  document.querySelector('.item-in-cart-amount').textContent = amount;
  setTimeout(() => {
    cartBtn.classList.remove('inCartAnimation');
  }, 400);
}

function displayAlert() {
  const mainHeaderArea = document.querySelector('.main__header');
  mainHeaderArea.classList.add('alertInfo');
  setTimeout(() => {
    mainHeaderArea.classList.remove('alertInfo');
  }, 1000);
}

function getCartAmount() {
  let amount = 0;
  if (!localStorage.hasOwnProperty('products')) {
    document.querySelector('.item-in-cart-amount').textContent = 0
    return;
  }
  const productsInCart = JSON.parse(localStorage.getItem("products"));
  productsInCart.map(item => {
    amount += item.qty;
  })
  document.querySelector('.item-in-cart-amount').textContent = amount;
  return amount;
}

//.cart > .cart__erase / button / img addEventlistener
cart.addEventListener('click', (e) => {
  if (e.target.matches('.cart__erase') || e.target.matches('button') || e.target.matches('img')) {
    getCartAmount();
    shopLib.drawOrderList();
  }
})

window.onload = getCartAmount;