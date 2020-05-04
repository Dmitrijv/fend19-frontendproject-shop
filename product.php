<?php

if (!isset($_GET['productId']) || !is_numeric($_GET['productId'])) {
    header("Location: error.php");
    die;
}

require_once __DIR__ . "/php/controller/controller.php";

$productId = intval($_GET['productId']);
$product = getProductById($productId);

$classList;
if (isset($product['old']) && $product['old'] == true) {
    $classList = 'oldProduct';
} else if (isset($product['new']) && $product['new'] == true) {
    $classList = 'newProduct';
}

if (!isset($product['title'])) {
    header("Location: error.php");
    die;
}

// build gallery html
$gallery = $product['gallery'];
$imgForCart = (!$gallery) ? 'placeholder.png' : $gallery[0];
$galleryHtml = '';
if (!$gallery) {
    $galleryHtml = '
    <div class="banner" style="opacity: 1;">
        <div class="banner-img" style="background-image: url(img/product/placeholder.png)"></div>
    </div>';
}
if (count($gallery) === 1) {
    $galleryHtml = '
    <div class="banner" style="opacity: 1;">
        <div class="banner-img" style="background-image: url(img/product/' . $gallery[0] . ')"></div>
    </div>';
} else {
    foreach ($gallery as &$fileName) {
        $galleryHtml = $galleryHtml . '
        <div class="banner" style="opacity: 0;">
            <div class="banner-img" style="background-image: url(img/product/' . $fileName . ')"></div>
        </div>
    ';
    }
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
    <link rel="shortcut icon" type="image/png" href="https://i.ibb.co/KFBHvHY/frameme-logo.png" title="favicon">
    <title>Frame Me | Produkt</title>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>

<body class="single-product-page__body">

    <span class="hamburger__bar-wrapper">
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
    </span>

    <?php require_once __DIR__ . '/php/view/sidebar.php'; ?>
    <?php require_once __DIR__ . '/php/view/header.php'; ?>
    <?php require_once __DIR__ . '/php/view/cart.php'; ?>

    <main id="p-main">

        <div class="wrapper">

            <div class="single-product">
                <div class="p-grid-1 <?php echo $classList; ?>">
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
                    <button class='product__add-btn'>Lägg i varukorgen</button>
                </div>
                <div style="display: none;" class='hiddenInputItems'>
                    <input type="hidden" name="productId" value="<?php echo htmlspecialchars($product['id'], ENT_QUOTES, 'UTF-8'); ?>">
                    <input type="hidden" name="productImage" value="./img/product/<?php echo htmlspecialchars(($imgForCart)); ?>">
                    <input type="hidden" name="productTitle" value="<?php echo htmlspecialchars($product['title'], ENT_QUOTES, 'UTF-8'); ?>">
                    <input type="hidden" name="productPrice" value="<?php echo htmlspecialchars($product['price'], ENT_QUOTES, 'UTF-8'); ?> kr">
                    <input type="hidden" name="productNumberInStock" value="<?php echo htmlspecialchars($product['number_in_stock'], ENT_QUOTES, 'UTF-8'); ?>">
                </div>
            </div>
        </div>
    </main>

    <?php require_once __DIR__ . '/php/view/footer.php'; ?>

    <!-- js scripts go here -->
    <script type="text/javascript" src="./js/ie11/autoplay.js"></script>
    <?php require_once __DIR__ . '/php/view/jscore.php'; ?>
    <script>
        var productBtn = document.querySelectorAll(".product__add-btn");
        addProduct(productBtn);
    </script>

    <script>
        (function() {
            let inCartItemIds = [];
            const inCartItems = shopLib.getShoppingCart();
            const addBtn = document.querySelector('.product__add-btn');
            const secondGridArea = document.querySelector('.p-grid-2');
            const emptyBtn = document.querySelector('.cart__erase');

            bindAddBtnWithAnimation();
            emptyBtn.addEventListener('click', removeInCartStyle2);

            //delegation
            const cartArea = document.querySelector('.cart');
            cartArea.addEventListener('click', e => {
                const delId = e.target.parentNode.dataset.productid;
                if (e.target.matches('img')) {
                    if (delId == <?php echo $productId; ?>) {
                        removeInCartStyle2();
                    }
                }
            })

            function addInCartAnimation() {
                secondGridArea.classList.add('inCart');
            }

            function removeInCartStyle2() {
                if (document.querySelector('.p-grid-2.inCart')) {
                    document.querySelector('.p-grid-2.inCart').classList.remove('inCart');
                }
            }

            function bindAddBtnWithAnimation() {
                if (!localStorage.hasOwnProperty('products')) {
                    addBtn.addEventListener('click', addInCartAnimation);
                    return;
                }
                if (localStorage.getItem('products') != '[]') {
                    inCartItems.forEach(item => inCartItemIds.push(Number(item.id)));
                    if (inCartItemIds.includes(<?php echo $productId; ?>)) {
                        document.querySelector('.p-grid-2').classList.add('inCart')
                    }
                    addBtn.addEventListener('click', addInCartAnimation);
                    return;
                }
                addBtn.addEventListener('click', addInCartAnimation);
            }
        })()
    </script>
</body>

</html>