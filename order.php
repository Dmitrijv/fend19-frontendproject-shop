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

    <main>
        <div class='emptyOrderMessage hidden'>Du har inte beställt ändå!</div>

        <!-- write your code here -->
        <section class="order-confirmation white-panel">
            <div class="panel-heading">Order bekräftelse</div>

            <div class="order-error hidden">
                <p class="order-error-message"></p>
            </div>

            <div class="order-description">
                <p>Tack för din beställning!</p>
                <dl>
                    <dt>Kundnummer:</dt>
                    <dd class="userId">1323823</dd>
                    <dt>Beställningsnummer:</dt>
                    <dd>100713104</dd>
                    <dt>Beställningsdatum:</dt>
                    <dd class="dateToday"></dd>
                    <dt>Totalpris:</dt>
                    <dd class="totalPrice"></dd>
                </dl>
                <p>Kontrollera att dina uppgifter ovan stämmer.</p>
            </div>

            <table>
                <thead class="font-bold">
                    <tr>
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
                <tbody class="order-list"></tbody>
            </table>

            <button style="margin-left: 5.5em" class="btn btn-info goback-Btn"> &lt; Tillbaka</button>
            <button class="btn btn-success confirm-order-button">Bekräfta order</button>
        </section>
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

</body>

</html>