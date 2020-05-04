document.querySelector('.open-overlay').removeEventListener('click', openCart);

var shoppingCart = JSON.parse(localStorage.getItem("products"));

const customerInfo = JSON.parse(localStorage.getItem('customer'));
document.querySelector('#fullname').textContent = customerInfo.name;
document.querySelector('#phone').textContent = customerInfo.phone;
document.querySelector('#address').textContent = customerInfo.fullAddress;
const finalPrice = customerInfo.totalPrice;

var subTotal = 0;
var itemsCountTotal = 0;
var orderList = document.querySelector(".order-list");
var dateOfToday = document.querySelector(".dateToday");
var totalPrice = document.querySelector(".totalPrice");
var productsAmount = document.querySelector(".products-amount");
/* object structure
        id
        name
        img
        price
        qty
   */
var length = shoppingCart.length;
for (var a = 0; a < length; a++) {
  var item = shoppingCart[a];
  var itemName = item.name;
  var itemCount = item.qty * 1;
  var itemPrice = item.price.slice(0, -3);
  var itemImage = item.img;
  var itemTotalPrice = Math.ceil((1 * itemCount) * (1 * itemPrice));
  subTotal += itemTotalPrice;
  itemsCountTotal += itemCount;
  orderList.innerHTML += "<tr><td class=\"item-image\"><img class=\"product-cover-small\" src=\"".concat(itemImage, "\" alt=\"").concat(itemName, "\"></td><td class=\"item-name\">  ").concat(itemName, "</td><td class=\"item-qty\">").concat(itemCount, "</td><td class=\"item-price\">").concat(itemPrice, "</td><td class=\"item-total\">").concat(itemTotalPrice, " kr</td></tr>");

}
/* Above works */

if(subTotal !== finalPrice){
  orderList.innerHTML += "<tr class=\"font-bold\"><td>Totalt:</td><td></td><td class=\"products-amount\">".concat(itemsCountTotal, "</td><td>Frakt + 50 kr</td><td class=\"item-total\" >").concat(finalPrice, " kr</td></tr></tbody>");

} else{
  orderList.innerHTML += "<tr class=\"font-bold\"><td>Totalt:</td><td></td><td class=\"products-amount\">".concat(itemsCountTotal, "</td><td></td><td class=\"item-total\" >").concat(finalPrice, " kr</td></tr></tbody>");
}

productsAmount = itemsCountTotal;
totalPrice = subTotal + ' kr';

var year = new Date().getFullYear();
var month = new Date().getMonth() + 1;
var day = new Date().getDate();
var h = new Date().getUTCHours() + 2;
var m = new Date().getMinutes();
m > 9 ? m : (m = "0" + m);
var s = new Date().getUTCSeconds();
s > 9 ? s : (s = "0" + s);
var date = year + '/' + month + '/' + day + '  ' + h + ':' + m + ':' + s;
dateOfToday.textContent = date;

/* button part */
var myBtn2 = document.querySelector(".goback-Btn");
myBtn2.addEventListener("click", function () {
  // localStorage.clear();
  localStorage.removeItem("products");
  localStorage.removeItem("customer");
});