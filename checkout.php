<!-- TODO -->
<!-- Separate the function for drawing order table -->
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

        <form action="order.php" method="POST" class="checkout-form">
            <!-- Right side: cart section -->
            <section class="checkout-form__cart-section">
                <h2 class="checkout-form__cart-section__h2">Varukorg</h2>
                <div class="checkout-form__cart-section__product-list">
                    <!-- Use Martin's pattern here -->
                </div>

                <div class="checkout-form__cart-section__sum-area">
                    <p class="small-font-size"><strong>Fri frakt!</strong>&nbsp;&nbsp;När du handlar för över 500 kr eller bor du i Stockholm.</p>
                    <p class="deliveryFeeRow">Frakt: <span class="deliveryFeeText hidden">50 kr</span></p>
                    <span class="pull-left products-amount"></span>
                    <span class="pull-right totalPrice"></span>
                </div>
                <div class="checkout-form__cart-section__totalsum"></div>
                <button action="index.php" type="button" class="checkout-form__cart-section__keep-shopping-btn">Fortsätt handla</button>
            </section>

            <!-- Left side, delivery section -->
            <section class="checkout-form__delivery-section">
                <div class="err-tips"></div>
                <h2 class="checkout-form__delivery-section__h2">Fyll i kunduppgifter</h2>
                <label class="checkout-form__delivery-section__label" for="">Email Adress</label>
                <input class="checkout-form__delivery-section__input" id="email" type="text" name="email" placeholder="name@mail.com">


                <label class="checkout-form__delivery-section__label" for="">Förnamn</label>
                <input class="checkout-form__delivery-section__input" id="fname" type="text" name="fname">

                <label class="checkout-form__delivery-section__label" for="">Efternamn</label>
                <input class="checkout-form__delivery-section__input" id="lname" type="text" name="lname">

                <label class="checkout-form__delivery-section__label" for="">Telefonnummer</label>
                <input class="checkout-form__delivery-section__input" id="tel" type="text" name="phone" placeholder="+46 or 07 pattern">

                <label class="checkout-form__delivery-section__label" for="">Gatuadress</label>
                <input class="checkout-form__delivery-section__input" id="adress" type="text" name="adress" placeholder="Gustafvägen 10D">

                <label class="checkout-form__delivery-section__label" for="">Postnummer</label>
                <input class="checkout-form__delivery-section__input" id="pcode" type="text" name="pcode" placeholder="123 12">

                <label class="checkout-form__delivery-section__label" for="">Ort</label>
                <input class="checkout-form__delivery-section__input" id="city" type="text" name="county">

                <input type="hidden" name="cart" value="<?php echo htmlspecialchars($product['number_in_stock'], ENT_QUOTES, 'UTF-8'); ?>">

                <button type="button" class="checkout-form__delivery-section__deliveryBtn">Leverera till denna adress</button>

                <!-- <div class="checkout-form__price">Totalt att betala: <span class="real-amount"></span></div> -->
                <button type="submit" class="checkout-form__delivery-section__checkoutBtn--dim" onclick="window.location.href='/fend19-frontendproject-shop/order.php'" disabled="disabled">Genomför köp</button>

            </section>
        </form>

    </main>

    <?php require_once __DIR__ . '/php/view/footer.php';?>

    <!-- js scripts go here -->
    <?php require_once __DIR__ . '/php/view/jscore.php';?>
    <!-- <script type="text/javascript" src="./js/checkout-form.js"></script> -->

    <!-- Validation & draw cart-section for Checkout -->
    <!-- checkout-form.js is original version for draw cart-section -->
    <script type="text/javascript" src="./js/checkout.js"></script>

</body>

</html>