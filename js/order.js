const shoppingCart = shopLib.getShoppingCart();

let subTotal = 0;
let itemsCountTotal = 0;
let orderList = document.querySelector(".order-list");
/* object structure
        id
        name
        img
        price
        qty
   */
for (item of shoppingCart) {
  const itemName = item.name;
  const itemCount = Number(item.qty);
  const itemPrice = item.price.slice(0, -3);
  const itemImage = item.img;
  const itemTotalPrice = Math.ceil(Number(itemCount) * Number(itemPrice));
  subTotal += itemTotalPrice;
  itemsCountTotal += itemCount;
  orderList.innerHTML += `
    <tr>
      <td class="item-image">
        <img class="product-cover-small" src="${itemImage}" alt="${itemName}">
      </td>
      <td class="item-name">
        ${itemName}</td>
      <td class="item-qty">${itemCount}</td>
      <td class="item-price">${itemPrice}</td>
      <td class="item-total">${itemTotalPrice} kr</td>
    </tr>`;
}

subTotal = subTotal.toFixed(2);

orderList.innerHTML += `
    <tr class="font-bold">
      <td>Totalt:</td>
      <td></td>
      <td class="products-amount">${itemsCountTotal}</td>
      <td></td>
      <td class="item-total" >${subTotal} kr</td>
    </tr>
    </tbody>
    `;

document.querySelector(".totalPrice").textContent = subTotal + " kr";
document.querySelector(".products-amount").innerHTML = itemsCountTotal;
document.querySelector(".dateToday").textContent = new Date().toLocaleString();

const myBtn2 = document.querySelector(".goback-Btn");
myBtn2.addEventListener("click", function() {
  location.href = "/fend19-frontendproject-shop/index.php";
});

const confirmButton = document.querySelector(".confirm-order-button");
if (itemsCountTotal === 0 || itemsCountTotal === null) {
  confirmButton.setAttribute("disabled", "");
} else {
  confirmButton.removeAttribute("disabled");
}

confirmButton.addEventListener("click", onOrderConfirmedClick);

function onOrderConfirmedClick(event) {
  if (confirm("Vill du bekräfta din order?")) {
    shopLib.clearShoppingCart();
    location.href = "/fend19-frontendproject-shop/index.php";
  } else {
    event.preventDefault();
  }
}
