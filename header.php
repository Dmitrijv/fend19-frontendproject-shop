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
<?php 
require_once('sidebar.php');
?>
<span class="hamburger__bar-wrapper">
<span class="hamburger__bar"></span>
<span class="hamburger__bar"></span>
<span class="hamburger__bar"></span>
</span>
<header class="main__header">
<div class="main__header__logo">LOGOTYPE</div>
<nav class="nav">
<button class="main__header__btn login-btn"><a href="">Logga in</a></button>
<button class="main__header__btn cart-btn"><a href="">Varukorg</a></button>
<div class="main__header__search">
    <input type="text"><button class="main__header__btn search-btn">Sök</button>
</div>
</nav>
</header>