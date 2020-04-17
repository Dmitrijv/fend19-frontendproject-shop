const btn = document.querySelector(".hamburger__bar-wrapper");
const sidebar = document.querySelector(".sidebar");
btn.onclick = () => {
  sidebar.classList.toggle("active");
  btn.classList.toggle("active");
};

const radioBtn = document.querySelectorAll(".sidebar__input__item");
radioBtn.forEach((btn) => {
  btn.addEventListener("change", () => {
    btn.parentElement.parentElement.submit();
  });
});
