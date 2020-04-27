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

    <?php require_once __DIR__ . '/php/view/sidebar.php'; ?>
    <?php require_once __DIR__ . '/php/view/header.php'; ?>
    <?php require_once __DIR__ . '/php/view/cart.php'; ?>


    <main id="checkout-main">

        <h1 class="checkout-main__h1">Kunduppgifter</h1>

        <form action="order.php" class="checkout-form">

            <section class="checkout-form__cart-section">

                <h2 class="checkout-form__cart-section__h2">Min varukorg</h2>
                <div class="checkout-form__cart-section__product-list">
                    <table id="checkout-table">
                        <thead class="font-bold">
                            <tr>
                                <th></th>
                                <th>Produkt</th>
                                <th>Antal</th>
                                <th>Pris</th>
                                <th class="item-total">Totalt</th>
                            </tr>
                        </thead>
                        <tbody class="order-list">
                            <!-- example -->
                            <!-- <tr>
                                <td class="item-image">
                                    <img class="product-cover-small" src="./img/product/5-cover.jpg" alt="Abstrakt Oljemålning - Dimensional Shift">
                                </td>
                                <td class="item-name">Dimensional Shift</td>
                                <td class="item-qty">1</td>
                                <td class="item-price">750 kr</td>
                                <td class="item-total">750 kr</td>
                            </tr>
                            <tr class="font-bold">
                                <td>Totalt:</td>
                                <td></td>
                                <td class="products-amount">3</td>
                                <td></td>
                                <td class="item-total">195 kr</td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>

                <div class="checkout-form__cart-section__sum-area">
                    <p class="deliveryFeeRow">Frakt: <span class="deliveryFeeText hidden">50 kr</span></p>
                    <span class="pull-left products-amount"></span>
                    <span class="pull-right totalPrice"></span>
                </div>
                <!-- <button class="btn btn-success confirm-order-button ">Bekräfta order</button> -->
            </section>


            <section class="checkout-form__delivery-section">
                <div class="err-tips"></div>
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

                <button type="button" class="checkout-form__delivery-section__deliveryBtn">Leverera till denna adress</button>

                <div class="checkout-form__price">Totalt att betala: <span class="real-amount"></span></div>
                <button type="submit" class="checkout-form__delivery-section__checkoutBtn--dim" disabled="disabled">Genomför köp</button>

            </section>

        </form>

    </main>

    <?php require_once __DIR__ . '/php/view/footer.php'; ?>

    <!-- js scripts go here -->
    <?php require_once __DIR__ . '/php/view/jscore.php'; ?>
    <!-- <script type="text/javascript" src="./js/checkout-form.js"></script> -->


    <!-- validation js & draw order -->
    <script type="text/javascript" src="./js/ie11/checkout.js"></script>


</body>

</html>