<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Checkout</title>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <span class="hamburger__bar-wrapper">
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
    </span>

    <?php require_once __DIR__ . '/php/view/sidebar.php';?>
    <?php require_once __DIR__ . '/php/view/header.php';?>
    <?php require_once __DIR__ . '/php/view/cart.php';?>




    <main id="checkout-main">
    <h1 class="checkout-main__h1">Kassa</h1>

        <form action="order.php" class="checkout-form">


<div class="checkout-form__container-1">
    <section class="checkout-form__cart-section">
        <div class="checkout-form__cart-contents">
        <h2 class="checkout-form__cart-contents__h2">Min varukorg</h2>
        <div class="cart__product-list"></div>
        <div class="cart__sum-area">
        <span class="pull-left">2 artiklar</span>
        <span class="pull-right total-sum">500 SEK</span>
        </div>
        </div>
        </section>
        </div>

        <div class="checkout-form__container-2">
        <section class="checkout-form__email-section">
            <h2 class="checkout-form__h2">Emailadress</h2>

            <input class="checkout-form__input--email" id="email" type="text"><br>
            <input id="email-hidden" name="email" type="hidden">
            <button type="button" class="checkout-form__addBtn">Lägg till emailadress</button>
        </section>


        <section class="checkout-form__delivery-section">
            <h2 class="checkout-form__h2">Leveransadress</h2>

            <label class="checkout-form__label" for="">Förnamn</label><br>
            <input class="checkout-form__input" id="fname" type="text"><br>
            <input id="fname-hidden" name="fname" type="hidden">

            <label class="checkout-form__label" for="">Efternamn</label><br>
            <input class="checkout-form__input" id="lname" type="text"><br>
            <input id="lname-hidden" name="lname" type="hidden">

            <label class="checkout-form__label" for="">Telefonnummer</label><br>
            <input class="checkout-form__input" id="tel" type="text"><br>
            <input id="tel-hidden" name="tel" type="hidden">

            <label class="checkout-form__label" for="">Gatuadress</label><br>
            <input class="checkout-form__input" id="adress" type="text"><br>
            <input id="adress-hidden" name="adress" type="hidden">

            <label class="checkout-form__label" for="">Postnummer</label><br>
            <input class="checkout-form__input" id="pcode"type="text"><br>
            <input id="pcode-hidden" name="pcode" type="hidden">

            <label class="checkout-form__label" for="">Ort</label><br>
            <input class="checkout-form__input" id="city" type="text"><br>
            <input id="city-hidden" name="city" type="hidden">


            <button type="button" class="checkout-form__deliveryBtn">Leverera till denna adress</button>




        <div class="checkout-form--hidden__total-price">Totalt att betala: 568 SEK</div>
        <button type="submit" class="checkout-form--hidden__checkoutBtn__dim">Genomför köp</button>
        </section>
        </div>
    </form>

</main>

    <?php require_once __DIR__ . '/php/view/footer.php';?>

    <!-- js scripts go here -->
    <?php require_once __DIR__ . '/php/view/jscore.php';?>
    <script type="text/javascript" src="./js/checkout-form.js"></script>

</body>

</html>