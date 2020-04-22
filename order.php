<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Produkt</title>
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

    <main id="order-main">
        <div class='emptyOrderMessage hidden'>Du har inte beställt ändå!</div>

        <!-- write your code here -->
        <section class="order-confirmation white-panel">
            <div class="panel-heading">Order bekräftelse</div>

            <div class="order-error">
                <p class="order-error-message"></p>
            </div>

            <div class="order-description">
                <p>Tack för din beställning!</p>
                <dl>
                    <dt>Kundnummer:</dt>
                    <dd>1323823</dd>
                    <dt>Kundnamn</dt>
                    <dd>Jane Doe</dd>
                    <dt>Phone</dt>
                    <dd>123 123 123</dd>
                    <dt>Postal address</dt>
                    <dd>Tomtebodavägen 3A, 171 65 Solna</dd>
                    <dt>Beställningsnummer:</dt>
                    <dd>100713104</dd>
                    <dt>Beställningsdatum:</dt>
                    <dd class="dateToday">2020/4/22 19:57:20</dd>
                    <dt>Totalpris:</dt>
                    <dd class="totalPrice">195.85 kr</dd>
                </dl>
                <p>Kontrollera att dina uppgifter ovan stämmer.</p>
            </div>

            <table>
                <thead class="font-bold">
                    <tr>
                        <th>
                            Image
                        </th>
                        <th>
                            Produkt
                        </th>
                        <th>
                            Antal
                        </th>
                        <th>
                            Pris
                        </th>
                        <th class="item-total">
                            Totalt
                        </th>
                    </tr>
                </thead>
                <tbody class="order-list">
                    <tr>
                        <td class="item-image">
                            <img class="product-cover-small" src="./img/product/4-cover.jpg" alt="Abstrakt Oljemplning - Sailor">
                        </td>
                        <td class="item-name">
                            Abstrakt Oljemplning - Sailor</td>
                        <td class="item-qty">1</td>
                        <td class="item-price">800 kr</td>
                        <td class="item-total">800.00 kr</td>
                    </tr>
                    <tr>
                        <td class="item-image">
                            <img class="product-cover-small" src="./img/product/2-cover.jpg" alt="Tavla - Spike">
                        </td>
                        <td class="item-name">
                            Tavla - Spike</td>
                        <td class="item-qty">1</td>
                        <td class="item-price">700 kr</td>
                        <td class="item-total">700.00 kr</td>
                    </tr>
                    <tr>
                        <td class="item-image">
                            <img class="product-cover-small" src="./img/product/5-cover.jpg" alt="Abstrakt Oljemålning - Dimensional Shift">
                        </td>
                        <td class="item-name">
                            Abstrakt Oljemålning - Dimensional Shift</td>
                        <td class="item-qty">1</td>
                        <td class="item-price">750 kr</td>
                        <td class="item-total">750.00 kr</td>
                    </tr>
                    <tr class="font-bold">
                        <td>Totalt:</td>
                        <td class="products-amount">3</td>
                        <td></td>
                        <td></td>
                        <td class="item-total">195.85 kr</td>
                    </tr>
                </tbody>
            </table>

            <button class="btn btn-info goback-Btn"> &lt; Tillbaka</button>
            <button class="btn btn-success confirm-order-button">Bekräfta order</button>
        </section>
    </main>

    <?php require_once __DIR__ . '/php/view/footer.php'; ?>

    <!-- <script src="./js/ie11/sidebar.js"></script> -->
    <!-- <script src="./js/sidebar.js"></script> -->

    <!-- <script type="text/javascript" src="./js/ie11/shopLib.js"></script> -->
    <script type="text/javascript" src="./js/shopLib.js"></script>
    <!-- <script type="text/javascript"> shopLib.drawCategorySelectors(); </script> -->
    <!-- <script type="text/javascript"> shopLib.drawDefaultProductPanel(); </script> -->

    <!-- <script type="text/javascript" src="./js/ie11/cart.js"></script> -->
    <script src="https://code.jquery.com/jquery-3.5.0.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="./js/cart.js"></script>

</body>

</html>