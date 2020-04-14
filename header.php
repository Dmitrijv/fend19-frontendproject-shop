<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- Custom CSS -->
    <link href="css/style.css" rel="stylesheet">
</head>

<body>
    <span class="hamburger__bar-wrapper">
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
    </span>
    <header class="main__header">
        <div class="main__header__logo"><img class="logo" src="img/svg/Logo.svg" alt="Logo Image"></div>
        <h2 class="shop-title">Frame Me</h2>
        <nav class="nav">
            <div class="nav__item">
                <button class="main__header__btn login-btn"><a href="">Logga in</a></button><button class="main__header__btn cart-btn"><a href="">Varukorg</a></button>
            </div>
            <div class="nav__item main__header__search">
                <input class="main__header__search--input" type="text"><button class="main__header__btn search-btn">Sök</button>
            </div>
        </nav>
    </header>
    <?php
    require_once('sidebar.php');
    ?>