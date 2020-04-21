<header class="main__header">
    <div class="main__header__top">
        <div class="logo"><a href="index.php"><img src="img/svg/Logo_SVG.svg" alt="Logo Image"></a></div>
        <nav class="nav">
            <div class="nav__item">
                <button class="main__header__btn login-btn"><a href=""><img class="img-login" src="./img/svg/login-mob.svg" alt="">
                        <a href="#">
                            <p class="desktop-text">Logga in</p>
                        </a>
                    </a></button><button class="main__header__btn cart-btn"><img class="img-cart" src="./img/svg/cart-mob.svg" alt="">
                    <p class="desktop-text">Varukorg</p>
                </button>
            </div>
            <div class="nav__item main__header__search">
                <form class="nav__item main__header__search" name="searchform" onsubmit="shopLib.searchProducts(event)">
                    <input class="main__header__search--input" type="text" name="searchinput" minlength="2">
                    <button class="main__header__btn search-btn" name="searchbtn" type="submit">Sök</button>
                </form>
            </div>

            <div class="dropdown">
                <button class="dropbtn">Categories</button>
                <div class="dropdown-content" id="dropdownCategoryContainer">
                    <form id="categoryDropdownForm" class="top-nav__form">
                    </form>
                </div>
            </div>

        </nav>
    </div>
</header>
