const cartBtn = document.querySelector(".cart-btn");
const cart = document.querySelector(".cart");
cartBtn.addEventListener("click", (e) => {
  cart.style.display === "flex"
    ? (cart.style.display = "none")
    : (cart.style.display = "flex");
});

function fillCartList(fromClick) {
  let productName, productImg, productPrice, productQty;
  let product;
  const getLs = JSON.parse(localStorage.getItem("products"));
  const cartList = document.querySelector(".cart__product-list");
  for (let i = 0; i < getLs.length; i++) {
    if (fromClick) {
      const lastItem = getLs.length - 1;
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

    product = `<div class="cart__product">
    <div class="cart__product-img"><img class="cart__product__img-src" src="${productImg}" alt="product name"></div>
    <div class="cart__product-text">${productName}</div>
    <div class="cart__product-price">${productPrice}</div>
    <div class="cart__product-pull-right">
        <div class="cart__product-qty">${productQty}</div>
        <div class="cart__product-delete">X</div>
    </div>
    </div>`;

    if (fromClick === false) {
      cartList.innerHTML += product;
    }
  }
  if (fromClick) {
    cartList.innerHTML += product;
  }
}

const productInfo = (btn) => {
  productName = btn.parentElement.firstElementChild.textContent;
  productImg = btn.parentElement.previousElementSibling.firstElementChild.src;
  productPrice = btn.previousElementSibling.textContent;
  productQty =
  btn.previousElementSibling.previousElementSibling.firstElementChild
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
  let getArray;
  if (localStorage.getItem("products") === null) {
    let prodArray = [];
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
  const getLocalStorage = JSON.parse(localStorage.getItem("products"));
  if (getLocalStorage === null) return;
  let fromClick = false;
  fillCartList(fromClick);
}
refreshCartList();

const addProduct = document.querySelectorAll(".product__add-btn");
addProduct.forEach((addBtn) => {
  addBtn.addEventListener("click", (e) => {
    let fromClick = true;
    setLocalStorage(addBtn, fromClick);
  });
});
