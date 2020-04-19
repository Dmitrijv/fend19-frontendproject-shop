<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <span class="hamburger__bar-wrapper">
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
    </span>
    <header class="main__header">
        <div class="logo"><img class="logo" src="img/svg/Logo.svg" alt="Logo Image"></div>
        <nav class="nav">
            <div class="nav__item">
                <button class="main__header__btn login-btn"><a href=""><img class="img-login" src="./img/svg/login-mob.svg" alt=""><p class="desktop-text">Logga in</p></a></button><button class="main__header__btn cart-btn"><img class="img-cart" src="./img/svg/cart-mob.svg" alt=""><p class="desktop-text">Varukorg</p></button>
            </div>
            <div class="nav__item main__header__search">
                <input class="main__header__search--input" type="text"><button class="main__header__btn search-btn"><img class="img-search" src="./img/svg/search-mob.svg" alt=""></button>
            </div>
        </nav>
    </header>
    <?php require_once 'sidebar.php';?>