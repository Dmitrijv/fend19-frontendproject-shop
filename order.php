<!-- TODO -->
<!-- When mouse over image, show a big image, like some magnifying effect -->
<!-- When it comes to a mobile version, maybe hide column antal, keep image / price / totalsumma -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Order</title>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>

<body id="order-body">

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
                </dl>
            </div>

            <table>
                <thead class="font-bold">
                    <tr>
                        <th>
                            Produkt
                        </th>
                        <th>
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
                    <!--
                    example
                    <tr>
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
            <a href="index.php"><button class="btn btn-info goback-Btn"> &lt; Till Startsidan</button></a>

        </section>
    </main>

    <?php require_once __DIR__ . '/php/view/footer.php'; ?>

    <?php require __DIR__ . '/php/view/jscore.php'; ?>

    <!-- <script type="text/javascript" src="./js/order.js"></script> -->
    <script type="text/javascript" src="./js/ie11/order.js"></script>

</body>

</html>