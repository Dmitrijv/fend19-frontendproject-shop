const cartBtn = document.querySelector(".cart-btn");
const cart = document.querySelector(".cart");
cartBtn.addEventListener("click", (e) => {
  cart.style.display === 'flex' ? cart.style.display = 'none' : cart.style.display = 'flex';
});
