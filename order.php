<?php

// don't allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['shoppingCart'])) {
    die();
}

require_once __DIR__ . "/php/controller/controller.php";
require_once __DIR__ . "/php/model/utils.php";

$shoppingCart = json_decode($_POST['shoppingCart'], true);
$shoppingCart = array_filter($shoppingCart, function ($item) {
    return doesProductIdExist($item['id']);
});

// trying to order an empty cart
if (count($shoppingCart) == 0) {
    header("Location: error.php?errorMessage=Går ej att beställa en tom varukorg.");
    die;
}

$outOfStockProductName = '';
$orderTotalPrice = 0;
// check if ordered products exist and are in stock
foreach ($shoppingCart as &$cartItem) {
    $productId = intval($cartItem['id']);
    $product = getProductById($productId);
    $orderedQuantity = intval($cartItem['qty']);
    if ($product['number_in_stock'] < $orderedQuantity) {
        $product['title'] .= " / ";
        $outOfStockProductName .= $product['title'];
        header("Location: error.php?errorMessage=Lagerstatus är för låg för att genomföra köpet. Ta bort produkt: $outOfStockProductName");
    }
    $orderTotalPrice = $orderTotalPrice + intval($product['price']);
}

$customerData = [
    "email" => trimSides($_POST['email']),
    "first_name" => trimSides($_POST['fname']),
    "last_name" => trimSides($_POST['lname']),
    "phone" => trimSides($_POST['phone']),
    "street" => trimSides($_POST['adress']),
    "postal_number" => trimSides($_POST['pcode']),
    "county" => trimSides($_POST['county']),
];

// doublecheck form input validity
if (
    !isValidFormInputString($customerData['email']) ||
    !isValidFormInputString($customerData['first_name']) ||
    !isValidFormInputString($customerData['last_name']) ||
    !isValidFormInputString($customerData['phone']) ||
    !isValidFormInputString($customerData['street']) ||
    !isValidFormInputString($customerData['postal_number']) ||
    !isValidFormInputString($customerData['county']) ||
    strlen($customerData['email']) > 254 ||
    strlen($customerData['first_name']) > 20 ||
    strlen($customerData['last_name']) > 20 ||
    strlen($customerData['phone']) > 12 ||
    strlen($customerData['street']) > 50 ||
    strlen($customerData['postal_number']) > 7 ||
    strlen($customerData['county']) > 50
) {
    header("Location: error.php?errorMessage=Ogiltigt input i formuläret.");
    die;
}

$customerDataId = md5(
    $customerData['email'] .
        $customerData['first_name'] .
        $customerData['first_name'] .
        $customerData['last_name'] .
        $customerData['phone'] .
        $customerData['street'] .
        $customerData['postal_number'] .
        $customerData['county']
);

// save customer data if it doesn't already exist in db
if (doesCustomerDataIdExist($customerDataId) == false) {
    saveCustomerDataToDb($customerDataId, $customerData);
}

// check if this order qualifies for free shipping
$free_shipping = 0;
if (
    $orderTotalPrice >= 500
    /* valid postal numbers for stockholm area follow 1xx xx format */
    || preg_match('/^1\d{2}\s?\d{2}$/', $customerData['postal_number']) == true
) {
    $free_shipping = 1;
}

// create a new db entry for this order
date_default_timezone_set('Europe/Stockholm');
$date_ordered_at = date('Y-m-d H:i:s', time());
$order = [
    "date_ordered_at" => $date_ordered_at,
    "status" => 1,
    "customer_data_id" => $customerDataId,
    "free_shipping" => $free_shipping,
];
createNewOrder($order);

$orderId = getOrderIdByTimeAndUser($date_ordered_at, $customerDataId);

$productListHtml = '';
$totalAmount = 0;
$finalPriceAmount = 0;
// register products as belonging to this order
foreach ($shoppingCart as &$cartItem) {

    $productId = intval($cartItem['id']);
    $orderedQuantity = intval($cartItem['qty']);
    $totalAmount += $orderedQuantity;

    $product = getProductById($productId);
    createOrderedProduct($orderId, $product, $orderedQuantity);

    $coverImage = "placeholder.png";
    if (count($product["gallery"]) != 0) {
        $coverImage = $product['gallery'][0];
    }

    $itemTotalPrice = intval($product['price']) * $orderedQuantity;
    $finalPriceAmount += $itemTotalPrice;
    $productListHtml = $productListHtml . '
        <tr>
            <td class="item-image">
                <img class="product-cover-small" src="img/product/' . $coverImage . '" alt="' . $product["title"] . '">
            </td>
            <td class="item-name">' . $product['title'] . '</td>
            <td class="item-qty">' . $orderedQuantity . '</td>
            <td class="item-price">' . $product['price'] . '</td>
            <td class="item-total">' . $itemTotalPrice . ' kr</td>
        </tr>';
}

$shipping_message = "Frakt: 0 kr";
if ($free_shipping == 0) {
    $finalPriceAmount = intval($finalPriceAmount) + 50;
    $shipping_message = "Frakt: 50 kr";
}

$productListHtml .= '
    <tr class="font-bold">
        <td>Totalt:</td>
        <td></td>
        <td class="products-amount">' . $totalAmount . '</td>
        <td>' . $shipping_message . '</td>
        <td class="item-total">' . $finalPriceAmount . ' kr</td>
    </tr>';

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" type="image/png" href="https://i.ibb.co/KFBHvHY/frameme-logo.png" title="favicon">
    <title>Frame Me | Order</title>
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

        <section class="order-confirmation white-panel">
            <div class="panel-heading">Order bekräftelse</div>

            <div class="order-error">
                <p class="order-error-message"></p>
            </div>

            <div class="order-description">
                <p>Tack för din beställning!</p>
                <dl>
                    <dt>Kundnamn</dt>
                    <dd id="fullname"><?php echo htmlspecialchars($customerData['first_name'] . " " . $customerData['last_name'], ENT_QUOTES, 'UTF-8'); ?></dd>
                    <dt>Telefon</dt>
                    <dd id="phone"><?php echo htmlspecialchars($customerData['phone'], ENT_QUOTES, 'UTF-8'); ?></dd>
                    <dt>Email</dt>
                    <dd id="email"> <?php echo htmlspecialchars($customerData['email'], ENT_QUOTES, 'UTF-8'); ?> </dd>
                    <dt>Adress</dt>
                    <dd id="address"><?php echo htmlspecialchars($customerData['street'] . ", " . $customerData['postal_number'] . ", " . $customerData['county'], ENT_QUOTES, 'UTF-8'); ?></dd>
                    <dt>Ordernummer:</dt>
                    <dd id="orderNumber"><?php echo $orderId; ?></dd>
                    <dt>Beställningsdatum:</dt>
                    <dd class="dateToday"><?php echo $date_ordered_at; ?></dd>
                </dl>
            </div>

            <table>
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
                    <?php echo $productListHtml; ?>
                </tbody>
            </table>
            <a href="index.php"><button class="btn btn-info goback-Btn"> &lt; Till Startsidan</button></a>

        </section>
    </main>

    <?php require_once __DIR__ . '/php/view/footer.php'; ?>

    <?php require __DIR__ . '/php/view/jscore.php'; ?>

    <script>
        localStorage.removeItem("products");
        document.querySelector(".cart__erase").nextElementSibling.innerHTML = "";
        document.querySelector(".total-sum").textContent = "";
        // shopLib.getCartAmount();
        (function getCartAmount() {
            let amount = 0;
            if (!localStorage.hasOwnProperty('products')) {
                document.querySelector('.item-in-cart-amount').textContent = 0
                return;
            }
            const productsInCart = JSON.parse(localStorage.getItem("products"));
            productsInCart.map(item => {
                amount += item.qty;
            })
            document.querySelector('.item-in-cart-amount').textContent = amount;
            return amount;
        })()
    </script>
</body>

</html>