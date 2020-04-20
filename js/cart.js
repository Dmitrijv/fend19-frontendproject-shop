const cartBtn = document.querySelector(".cart-btn");
const cart = document.querySelector(".cart");
cartBtn.addEventListener("click", (e) => {
  cart.style.display === "flex"
    ? (cart.style.display = "none")
    : (cart.style.display = "flex");
});

const productInfo = (obj) => {
  productName = obj.parentElement.firstElementChild.textContent;
  productImg = obj.parentElement.previousElementSibling.firstElementChild.src;
  productPrice = obj.previousElementSibling.textContent;
  productQty =
    obj.previousElementSibling.previousElementSibling.firstElementChild
      .nextElementSibling.textContent;

  return {
    id: 1,
    name: productName,
    img: productImg,
    price: productPrice,
    qty: productQty,
  };
};

function setLocalStorage(btn) {
  let getArray;
  if (localStorage.getItem("products") === null) {
    let prodArray = [];
    prodArray.push(productInfo(btn));
    localStorage.setItem("products", JSON.stringify(prodArray));
  } else {
    getArray = JSON.parse(localStorage.getItem("products"));
    getArray.push(productInfo(btn));
    localStorage.setItem("products", JSON.stringify(getArray));
  }
}

function fillCartList() {
    const cartList = document.querySelector(".cart__product-list");
    const product = `<div class="cart__product">
  <div class="cart__product-img"><img class="cart__product__img-src" src="${productImg}" alt="product name"></div>
  <div class="cart__product-text">${productName}</div>
  <div class="cart__product-price">${productPrice}</div>
  <div class="cart__product-pull-right">
      <div class="cart__product-qty">${productQty}</div>
      <div class="cart__product-delete">X</div>
  </div>
  </div>`;
    cartList.innerHTML += product;
}

function renderProduct(btn) {
  setLocalStorage(btn);

  const getArray = JSON.parse(localStorage.getItem("products"));
  console.log(getArray[clickedItem].id);
  
  fillCartList();
}

const addProduct = document.querySelectorAll(".product__add-btn");
addProduct.forEach((addBtn) => {
  addBtn.addEventListener("click", (e) => {
    renderProduct(addBtn);
  });
});
