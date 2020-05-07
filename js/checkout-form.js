let checkoutCart = JSON.parse(localStorage.getItem("products"))

let subTotal = 0
let itemsCountTotal = 0
let productList = document.querySelector(
  ".checkout-form__cart-section__product-list"
)
let totalSumCart = document.querySelector(
  ".checkout-form__cart-section__totalsum"
)
let totalSumForm = document.querySelector(".checkout-form__price")
for (item of checkoutCart) {
  const itemName = item.name

  const name = itemName.split("-").pop()
  const itemCount = Number(item.qty)
  const itemPrice = item.price.slice(0, -3)
  const itemImage = item.img
  const itemTotalPrice = Math.ceil(Number(itemCount) * Number(itemPrice))
  subTotal += itemTotalPrice
  itemsCountTotal += itemCount

  productList.innerHTML += `
    <div class="checkout-form__cart-section__product-container">
      <div class="checkout-form__cart-section__img-container">
        <img class="checkout-form__cart-section__img-container--img" src="${itemImage}" alt="${itemName}">
      </div>
      <p class="item-name">
        "${name}" </p>
      <p class="checkout-form__cart-section__item-qty"></p>
      <p class="checkout-form__cart-section__item-price">${itemCount} st, ${itemPrice} kr</p>
      </div>`
}
if (checkoutCart.length === 0) {
  productList.innerHTML += `
    <h2 class="checkout-form__cart-section__product-container">Varukorgen är tom</h2>`
} else {
  totalSumCart.innerHTML += `
 
      <p>${itemsCountTotal} st artiklar</p>
      <p class="item-total" >Totalt: ${subTotal} kr</p>
   
    `
}

subTotal = subTotal.toFixed(2)

totalSumForm.innerHTML += `
      <p class="item-total" >Totalt att betala: ${subTotal} SEK</p>
    `

const keepShoppingBtn = document.querySelector(
  ".checkout-form__cart-section__keep-shopping-btn"
)
keepShoppingBtn.addEventListener("click", function () {
  location.href = "/fend19-frontendproject-shop/index.php"
})
