(function() {
  var btn = document.querySelector(".hamburger__bar-wrapper");
  var sidebar = document.querySelector(".sidebar");

  btn.onclick = function() {
    sidebar.classList.toggle("active");
    btn.classList.toggle("active");
  };

  var radioBtn = document.querySelectorAll(".sidebar__input__item");
  radioBtn.forEach(function(btn) {
    btn.addEventListener("change", function() {
      btn.parentElement.parentElement.submit();
    });
  });
})();
