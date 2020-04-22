<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Single-product - info</title>
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
                <div class="p-grid-1">
                    <div id="slideshow">
                        <!-- If no image, can set slide0 = default image -->
                        <!-- Amount of img-div is decided by img number -->
                        <!-- TODO: 
                        when hover, img should not auto-change -->
                        <div class="slide slide1"></div>
                        <div class="slide slide2"></div>
                        <div class="slide slide3"></div>
                        <div class="slide slide4"></div>
                    </div>
                    <!-- TODO: 
                    Need to add function (when click dot, jump to relevant img) -->
                    <ul class="slick-dots" role="tablist">
                        <li id="slick-slide1" class=""><button>1</button></li>
                        <li id="slick-slide2" class=""><button>2</button></li>
                        <li id="slick-slide3" class="slick-active"><button>3</button></li>
                        <li id="slick-slide4" class=""><button>4</button></li>
                    </ul>
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


    <?php require_once __DIR__ . '/php/view/footer.php'; ?>

    <!-- <script src="./js/ie11/sidebar.js"></script> -->
    <!-- <script src="./js/sidebar.js"></script> -->

    <!-- <script type="text/javascript" src="./js/ie11/shopLib.js"></script> -->
    <!-- <script type="text/javascript" src="./js/shopLib.js"></script> -->
    <!-- <script type="text/javascript"> shopLib.drawCategorySelectors(); </script> -->
    <!-- <script type="text/javascript"> shopLib.drawDefaultProductPanel(); </script> -->

    <!-- <script type="text/javascript" src="./js/ie11/cart.js"></script> -->
    <script type="text/javascript" src="./js/cart.js"></script>

    <!-- TODO: 
    need to be rewritten -->
    <script src="https://code.jquery.com/jquery-3.5.0.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script>
    <script>
        $("#slideshow > div:gt(0)").hide();

        setInterval(function() {
            $('#slideshow > div:first')
                .fadeOut(1000)
                .next()
                .fadeIn(1000)
                .end()
                .appendTo('#slideshow');
        }, 3000);
    </script>
</body>

</html>