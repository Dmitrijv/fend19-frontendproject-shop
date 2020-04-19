<header class="main__header">
<div class="main__header__top">
    <div class="logo"><img class="logo" src="img/svg/Logo.svg" alt="Logo Image"></div>
    <nav class="nav">
        <div class="nav__item">
            <button class="main__header__btn login-btn"><a href=""><img class="img-login" src="./img/svg/login-mob.svg" alt=""><p class="desktop-text">Logga in</p></a></button><button class="main__header__btn cart-btn"><img class="img-cart" src="./img/svg/cart-mob.svg" alt=""><p class="desktop-text">Varukorg</p></button>
        </div>
      

        <div class="nav__item main__header__search">
            <form class="nav__item main__header__search" action="search.php" method="post" name="searchform" onsubmit="return validateSearchForm()">
            <input class="main__header__search--input" type="text" name="searchinput">
            <button class="main__header__btn search-btn" name="searchbtn"  type="submit"><img class="img-search" src="./img/svg/search-mob.svg" alt=""></button>
            </form>
        </div>
    </nav>
    </div>
</header>
