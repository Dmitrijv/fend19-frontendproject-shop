var body = document.body,
  overlay = document.querySelector('.overlay'),
  overlayBtts = document.querySelectorAll('button[class$="overlay"]');

[].forEach.call(overlayBtts, function (btt) {
  btt.addEventListener('click', openCart, false);
});

//seperate function out
function openCart() {
  /* Detect the button class name */
  var overlayOpen = this.className === 'open-overlay';

  /* Toggle the aria-hidden state on the overlay and the 
     no-scroll class on the body */
  overlay.setAttribute('aria-hidden', !overlayOpen);
  body.classList.toggle('noscroll', overlayOpen);

  /* On some mobile browser when the overlay was previously
     opened and scrolled, if you open it again it doesn't 
     reset its scrollTop property */
  overlay.scrollTop = 0;
}

// var activeOverlay = document.querySelector(['aria-hidden' == 'false']);
// overlay.addEventListener('click', function () {
//   var overlayOpen = this.className === 'open-overlay';
//   var cart = document.querySelector('.cart')
//   overlay.setAttribute('aria-hidden', !overlayOpen);
//   cart.style.display === "flex" ? (cart.style.display = "none") : (cart.style.display = "flex");
// })