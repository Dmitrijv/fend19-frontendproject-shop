<?php

if (!isset($_GET['productId']) || !is_numeric($_GET['productId'])) {
    header("Location: error.php");
    die;
}

require_once __DIR__ . "/php/controller/controller.php";

$productId = intval($_GET['productId']);
$product = getProductById($productId);

if (!isset($product['title'])) {
    header("Location: error.php");
    die;
}

// build gallery html
$gallery = getProductImages($productId);
$galleryHtml = '';

foreach ($gallery as &$fileName) {
    $galleryHtml = $galleryHtml . '
        <div class="banner" style="opacity: 1;">
            <div class="banner-img" style="background-image: url(img/product/' . $fileName . ')"></div>
        </div>
    ';
}

$gallerySelectors = '<span class="on"></span>';
for ($i = 0; $i < count($gallery) - 1; $i++) {
    $gallerySelectors = $gallerySelectors . '<span class=""></span>';
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Frame Me - Produkt</title>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>

<body class="single-product-page__body">

    <span class="hamburger__bar-wrapper">
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
    </span>

    <?php require_once __DIR__ . '/php/view/sidebar.php';?>
    <?php require_once __DIR__ . '/php/view/header.php';?>
    <?php require_once __DIR__ . '/php/view/cart.php';?>

    <main id="p-main">

        <div class="wrapper">

            <div class="single-product">
                <div class="p-grid-1">
                    <!-- Here comes structure instruction -->
                    <!-- Images should be put inside .p-grid-1 -->
                    <!-- div.banner for all images, use background-image: url(...) -->
                    <!-- div.tab>span should have equivalent  amount elements as images amount. -->
                    <!-- Now autoplay.js should be able to control auto-play according to how many pictures there are in this div. -->
                    <div id="wrap">

                        <?php echo $galleryHtml; ?>

                        <div class="tab">
                            <?php echo $gallerySelectors; ?>
                        </div>

                        <div class="prev"></div>
                        <div class="next"></div>
                    </div>
                </div>
                <div class="p-grid-2">
                    <article>
                        <h1 class="single-product__title">
                            <?php echo htmlspecialchars($product['title'], ENT_QUOTES, 'UTF-8'); ?>
                        </h1>
                        <p class="single-product__text">
                            <?php echo htmlspecialchars($product['description'], ENT_QUOTES, 'UTF-8'); ?>
                        </p>
                    </article>
                    <p class="single-product__price">
                        <?php echo htmlspecialchars($product['price'], ENT_QUOTES, 'UTF-8'); ?> kr
                    </p>
                    <p class="single-product__storage-count">
                        <?php echo htmlspecialchars($product['number_in_stock'], ENT_QUOTES, 'UTF-8'); ?> st i lager
                    </p>
                </div>
            </div>
        </div>
    </main>

    <?php require_once __DIR__ . '/php/view/footer.php';?>

    <script src="./js/ie11/sidebar.js"></script>
    <!-- <script src="./js/sidebar.js"></script> -->

    <script type="text/javascript" src="./js/ie11/shopLib.js"></script>
    <!-- <script type="text/javascript" src="./js/shopLib.js"></script> -->
    <script type="text/javascript">
        shopLib.drawCategorySelectors();
    </script>

    <!-- <script type="text/javascript" src="./js/ie11/cart.js"></script> -->
    <script type="text/javascript" src="./js/cart.js"></script>
    <script type="text/javascript" src="./js/ie11/autoplay.js"></script>
    <script type="text/javascript" src="./js/ie11/cartOverlay.js"></script>
</body>

</html>