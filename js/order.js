const shoppingCart = shopLib.getShoppingCart();
const customerInfo = JSON.parse(localStorage.getItem("customer"));
document.querySelector("#fullname").textContent = customerInfo.name;
document.querySelector("#phone").textContent = customerInfo.phone;
document.querySelector("#address").textContent = customerInfo.fullAddress;

let subTotal = 0;
let itemsCountTotal = 0;
let orderList = document.querySelector(".order-list");

/* object structure: id | name | img | price | qty */
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
  localStorage.removeItem("products");
  location.href = "/fend19-frontendproject-shop/index.php";
});
