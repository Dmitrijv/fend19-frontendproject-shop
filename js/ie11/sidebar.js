(function () {
  const btn = document.querySelector(".hamburger__bar-wrapper");
  const sidebar = document.querySelector(".sidebar");
  btn.onclick = function () {
    sidebar.classList.toggle("active");
    btn.classList.toggle("active");
  };
})();
