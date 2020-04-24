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

    <?php require_once __DIR__ . '/php/view/sidebar.php'; ?>
    <?php require_once __DIR__ . '/php/view/header.php'; ?>
    <?php require_once __DIR__ . '/php/view/cart.php'; ?>




    <main id="checkout-main">

        <div class="checkout-form">

        <h1 class="checkout-form__h1">Fyll i kunduppgifter</h1>

        <section class="checkout-form__email-section">
            <h2 class="checkout-form__h2">Emailadress</h2>
            <input class="checkout-form__input--email" id="email" type="text"><br>
            <button class="checkout-form__btn">Lägg till emailadress</button>
        </section>


        <section class="checkout-form__delivery-section">
            <h2 class="checkout-form__h2">Leveransadress</h2>

            <label class="checkout-form__label" for="">Förnamn</label><br>
            <input class="checkout-form__input" id="fname" type="text"><br>

            <label class="checkout-form__label" for="">Efternamn</label><br>
            <input class="checkout-form__input" id="lname" type="text"><br>

            <label class="checkout-form__label" for="">Telefonnummer</label><br>
            <input class="checkout-form__input" id="tel" type="text"><br>

            <label class="checkout-form__label" for="">Gatuadress</label><br>
            <input class="checkout-form__input" id="adress" type="text"><br>

            <label class="checkout-form__label" for="">Postnummer</label><br>
            <input class="checkout-form__input" id="pcode"type="text"><br>

            <label class="checkout-form__label" for="">Ort</label><br>
            <input class="checkout-form__input" id="city" type="text"><br>

            <button class="checkout-form__btn2">Leverera till denna adress</button>
        </section>

        </div>

        <form action="order.php" class="checkout-form__hidden">

            <input id="email-hidden" name="email" type="hidden">
            <input id="fname-hidden" name="fname" type="hidden">
            <input id="lname-hidden" name="lname" type="hidden">
            <input id="tel-hidden" name="tel" type="hidden">
            <input id="adress-hidden" name="adress" type="hidden">
            <input id="pcode-hidden" name="pcode" type="hidden">
            <input id="city-hidden" name="city" type="hidden">

            <button style="margin-left: 5.5em" class="btn btn-info goback-Btn"> &lt; Tillbaka</button>
            <button type="submit" class="btn btn-success confirm-order-button">Genomför köp</button>

        </form>

    </main>

    <?php require_once __DIR__ . '/php/view/footer.php'; ?>

    <!-- <script src="./js/ie11/sidebar.js"></script> -->
    <!-- <script src="./js/sidebar.js"></script> -->

    <!-- <script type="text/javascript" src="./js/ie11/shopLib.js"></script> -->
    <!-- <script type="text/javascript" src="./js/shopLib.js"></script> -->
    <!-- <script type="text/javascript"> shopLib.drawCategorySelectors(); </script> -->
    <!-- <script type="text/javascript"> shopLib.drawDefaultProductPanel(); </script> -->

    <!-- <script type="text/javascript" src="./js/ie11/cart.js"></script> -->
    <script type="text/javascript" src="./js/cart.js"></script>
    <script type="text/javascript" src="./js/checkout-form.js"></script>

</body>

</html>