const btn = document.querySelector(".hamburger__bar-wrapper");
const sidebar = document.querySelector(".sidebar");
btn.onclick = () => {
    sidebar.classList.toggle("active");
};