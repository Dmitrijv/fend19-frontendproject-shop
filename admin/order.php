<?php

require_once __DIR__ . "/php/controller/controller.php";

// if (!is_numeric($_POST['productId'])) {die;}
// $orderId = intval($_POST['productId']);

// $order = getProductById($productId);

?>


<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            <section class="admin-content">
                <div class="content-wrapper">


            </section>
            <!-- CONTENT area ends -->

        </main>

        <?php require_once __DIR__ . '/php/view/adminjscore.php';?>

    </body>


</html>
