<?php

require_once __DIR__ . "/php/controller/controller.php";

// invalid GET request, user can fuck off
if (
    !isset($_GET['orderId'])
    || !is_numeric($_GET['orderId'])
    || !isset($_GET['orderStatus'])
    || !is_numeric($_GET['orderStatus'])) {
    die;
}

$orderId = intval($_GET['orderId']);
$statusId = intval($_GET['orderStatus']);

$order = getOrderByIdAndStatus($orderId, $statusId);

// invalid order id, user can fuck off
if (!isset($order['id'])) {die;}

$customerId = $order['customer_data_id'];
$customerData = getCustomerDataById($customerId);
$shoppingCart = getProductsByOrderIdAndStatus($orderId, $statusId);

$productListHtml = '';
$totalAmount = 0;
$finalPriceAmount = 0;
foreach ($shoppingCart as &$cartItem) {

    $productId = intval($cartItem['product_id']);
    $orderedQuantity = intval($cartItem['quantity']);
    $totalAmount += $orderedQuantity;
    $itemTotalPrice = intval($cartItem['price']) * $orderedQuantity;

    $product = getProductById($productId);

    $gallery = getProductImages($productId);
    $coverImage = "placeholder.png";
    if (count($gallery) != 0) {
        $coverImage = $gallery[0];
    }

    $finalPriceAmount += $itemTotalPrice;
    $productListHtml = $productListHtml . '
        <tr>
            <td class="item-image">
                <img class="product-cover-small" src="../img/product/' . $coverImage . '" alt="' . $product["title"] . '">
            </td>
            <td class="item-name">' . $product['title'] . '</td>
            <td class="item-qty">' . $orderedQuantity . '</td>
            <td class="item-price">' . $cartItem['price'] . '</td>
            <td class="item-total">' . $itemTotalPrice . ' kr</td>
        </tr>';
}

$shipping_message = "Frakt: 0 kr";
if ($order['free_shipping'] == 0) {
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

$orderActionHtml = '';
if ($statusId == 2) {
    $orderActionHtml = '
    <form data-orderid="' . $orderId . '" onsubmit="adminLib.setOrderCompleted(event);">
        <input class="btn create-btn" type="submit" name="edit" value="Slutför">
    </form>';
} else if ($statusId == 1) {
    $orderActionHtml = '
    <form data-orderid="' . $orderId . '" onsubmit="adminLib.setOrderInProgress(event);">
        <input class="btn edit-btn" type="submit" name="edit" value="Behandla">
    </form>';
}

?>


<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" type="image/png" href="https://i.ibb.co/KFBHvHY/frameme-logo.png" title="favicon">
        <title>Admin Area | Order Information</title>
        <link rel="stylesheet" href="css/adminpanel.css">
    </head>

    <body>

        <header class="admin-header">
            <div class="header-container">
                <img class="header-icon" src="img/svg/gear.svg" alt="Gear Icon">
                <h1>Admin panel - Order Information</h1>
            </div>
        </header>

        <main class="admin-main">
            <!-- SIDEBAR begins -->
            <section class="admin-sidebar">
                <nav class="admin-nav">
                    <ul>
                        <li><a href="../index.php">Store</a></li>
                        <li><a href="index.php">Categories</a></li>
                        <li><a href="products.php">Products</a></li>
                        <li><a href="orders.php" class="active">Orders</a></li>
                    </ul>
                </nav>
            </section>
            <!-- SIDEBAR ends -->
            <!-- CONTENT area begins -->
            <section class="admin-content order-confirmation">
                <div class="content-wrapper">

                <div id='orderAlert' class="alert fail hidden">
                    <span class="msg"></span>
                    <form onsubmit='adminLib.redirectToOrdersPage(event)'>
                        <button class="close-btn" type="submit">To Orders</button>
                    </form>
                </div>

                <div class="order-description">
                    <dl>
                        <dt>Ordernummer:</dt>
                        <dd id="orderNumber"><?php echo $order["id"]; ?></dd>
                        <dt>Order status:</dt>
                        <dd id="orderNumber"><?php echo $order["status_name"]; ?></dd>

                        <dt>Beställningsdatum:</dt>
                        <dd class="dateToday"><?php echo $order['date_ordered_at']; ?></dd>
                        </br>

                        <dt>Kundnamn</dt>
                        <dd id="fullname"><?php echo htmlspecialchars($customerData['first_name'] . " " . $customerData['last_name'], ENT_QUOTES, 'UTF-8'); ?></dd>
                        <dt>Telefon</dt>
                        <dd id="phone"><?php echo htmlspecialchars($customerData['phone'], ENT_QUOTES, 'UTF-8'); ?></dd>
                        <dt>Email</dt>
                        <dd id="email"> <?php echo htmlspecialchars($customerData['email'], ENT_QUOTES, 'UTF-8'); ?> </dd>
                        <dt>Adress</dt>
                        <dd id="address"><?php echo htmlspecialchars($customerData['street'] . ", " . $customerData['postal_number'] . ", " . $customerData['county'], ENT_QUOTES, 'UTF-8'); ?></dd>
                        </br>

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

                <div class="order-description" >
                    <?php echo $orderActionHtml; ?>
                </div>

                </div>
            </section>
            <!-- CONTENT area ends -->

        </main>

        <?php require_once __DIR__ . '/php/view/adminjscore.php';?>

    </body>


</html>
