const cartBtn = document.querySelector(".cart-btn");
const cart = document.querySelector(".cart");
const cartCloseBtn = document.querySelector(".cart-close-btn");

cartBtn.addEventListener("click", (e) => {
  cart.style.display === "flex"
    ? (cart.style.display = "none")
    : (cart.style.display = "flex");
});

cartCloseBtn.addEventListener("click", (e) => {
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
        <div class="cart__product-img"><img class="cart__product__img-src" src="${productImg}" alt="product name"></div>
        <div class="cart__product-text">${productName}</div>
        <div class="cart__product-price">${productPrice}</div>
        <div class="cart__product-pull-right">
          <span><button class="qtyBtn minusQty">-</button></span>
          <div class="cart__product-qty">${productQty}</div>
          <span><button class="qtyBtn plusQty">+</button></span>
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
  deleteProduct(getLs);
  updateSum(getLs);
  changeQty(getLs);
}

const productInfo = (btn) => {
  productName = btn.parentElement.firstElementChild.textContent;
  //get url from product card
  productImg = btn.parentElement.previousElementSibling.style.backgroundImage.slice(
    5,
    -2
  );
  productPrice = btn.previousElementSibling.previousElementSibling.textContent;
  productQty =
    btn.previousElementSibling.firstElementChild.nextElementSibling.textContent;
  productId = btn.parentElement.parentElement.id;
  return {
    id: productId,
    name: productName,
    img: productImg,
    price: productPrice,
    qty: productQty,
  };
};
function alreadyExist(getArray, productName) {
  let nameInLs;
  for (let i = 0; i < getArray.length; i++) {
    nameInLs = getArray[i].name;
    }
  return nameInLs === productName;
}
function setLocalStorage(obj, fromClick) {
  const productName = obj.parentElement.firstElementChild.textContent;
  let getArray;
  if (localStorage.getItem("products") === null) {
    let prodArray = [];
    prodArray.push(productInfo(obj));
    localStorage.setItem("products", JSON.stringify(prodArray));
  } else {
    getArray = JSON.parse(localStorage.getItem("products"));

    if (alreadyExist(getArray, productName)) {
      alert("Produkten finns redan i varukorgen!");
    } else {
      getArray.push(productInfo(obj));
      localStorage.setItem("products", JSON.stringify(getArray));
      fillCartList(fromClick);
    }
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
  productBtn.forEach((addBtn) => {
    addBtn.addEventListener("click", (e) => {
      let fromClick = true;
      setLocalStorage(addBtn, fromClick);
    });
  });
}

function deleteProduct(getJSON) {
  const deleteBtn = document.querySelectorAll(".cart__product-delete");
  deleteBtn.forEach((delBtn) => {
    delBtn.addEventListener("click", (e) => {
      const index = getJSON.findIndex((prod) => {
        return prod.id == delBtn.parentElement.parentElement.id;
      });
      getJSON.splice(index, 1);
      delBtn.parentElement.parentElement.remove();
      localStorage.setItem("products", JSON.stringify(getJSON));
      updateSum(getJSON);
    });
  });
}

function updateSum(getLs) {
  let sum = 0;

  for (let i = 0; i < getLs.length; i++) {
    var str = getLs[i].price;
    var res = str.replace(/\D/g, "");
    sum += +res * getLs[i].qty;
  }
  const totalSum = document.querySelector(".total-sum");
  totalSum.textContent = sum;
}
function changeQty(getJSON) {
  const qtyBtns = document.querySelectorAll(".qtyBtn");
  qtyBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = getJSON.findIndex((prod) => {
        return prod.id == btn.parentElement.parentElement.parentElement.id;
      });

      if (btn.innerHTML === "+") {
        getJSON[index].qty -= 1; //???
        getJSON[index].qty += 2;
        btn.parentElement.previousElementSibling.textContent =
          getJSON[index].qty;
      } else {
        if (getJSON[index].qty > 1) getJSON[index].qty -= 1;
        btn.parentElement.nextElementSibling.textContent = getJSON[index].qty;
      }
      localStorage.setItem("products", JSON.stringify(getJSON));
      updateSum(getJSON);
    });
  });
}
