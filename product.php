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
                        <div class="banner" style="opacity: 1;">
                            <div class="banner-img" style="background-image: url(https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)">
                            </div>
                        </div>

                        <div class="banner" style="opacity: 0;">
                            <div class="banner-img" style="background-image: url(https://images.unsplash.com/photo-1558879787-4c4aea1fbb83?ixlib=rb-1.2.1&auto=format&fit=crop&w=932&q=80)">
                            </div>
                        </div>

                        <div class="banner" style="opacity: 0;">
                            <div class="banner-img" style="background-image: url(https://images.unsplash.com/photo-1521208916306-71fce562015a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)">
                            </div>
                        </div>

                        <div class="banner" style="opacity: 0;">
                            <div class="banner-img" style="background-image: url(https://images.unsplash.com/photo-1587491439780-f5a8885888e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80)">
                            </div>
                        </div>

                        <div class="tab">
                            <span class="on"></span>
                            <span class=""></span>
                            <span class=""></span>
                            <span class=""></span>
                        </div>

                        <div class="prev"></div>
                        <div class="next"></div>
                    </div>
                </div>

                <div class="p-grid-2">
                    <article>
                        <h1 class="single-product__title">Title</h1>
                        <p class="single-product__text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Animi nemo eos odit voluptates veritatis, et voluptatum.
                            Qui culpa excepturi mollitia, ducimus consequatur a
                            animi sunt vitae suscipit? Aut, deserunt tempora.
                        </p>
                    </article>
                    <p class="single-product__storage-count">Storage-count</p>
                </div>
            </div>
        </div>
    </main>


    <?php require_once __DIR__ . '/php/view/footer.php';?>

    <!-- <script src="./js/ie11/sidebar.js"></script> -->
    <!-- <script src="./js/sidebar.js"></script> -->

    <!-- <script type="text/javascript" src="./js/ie11/shopLib.js"></script> -->
    <!-- <script type="text/javascript" src="./js/shopLib.js"></script> -->
    <!-- <script type="text/javascript"> shopLib.drawCategorySelectors(); </script> -->
    <!-- <script type="text/javascript"> shopLib.drawDefaultProductPanel(); </script> -->

    <!-- <script type="text/javascript" src="./js/ie11/cart.js"></script> -->
    <script type="text/javascript" src="./js/cart.js"></script>

    <script type="text/javascript" src="./js/ie11/autoplay.js"></script>
</body>

</html>