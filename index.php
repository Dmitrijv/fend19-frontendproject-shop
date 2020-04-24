<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Frame Me</title>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <span class="hamburger__bar-wrapper">
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
    </span>

    <?php require_once __DIR__ . '/php/view/sidebar.php';?>
    <?php require_once __DIR__ . '/php/view/header.php';?>
    <?php require_once __DIR__ . '/php/view/cart.php';?>

    <main>
        <div class="content">
            <div class='emptyCategoryMessage hidden'>Det finns inga produkter i den här kategorin!</div>
            <div class="product-container" id="productPanel"> </div>
        </div>
    </main>

    <?php require_once __DIR__ . '/php/view/footer.php';?>

    <script src="./js/ie11/sidebar.js"></script>
    <!-- <script src="./js/sidebar.js"></script> -->

    <!-- <script type="text/javascript" src="./js/ie11/shopLib.js"></script> -->
    <script type="text/javascript" src="./js/shopLib.js"></script>
    <script type="text/javascript">
        shopLib.drawCategorySelectors();
    </script>
    <script type="text/javascript">
        shopLib.drawDefaultProductPanel();
    </script>
    <!-- <script type="text/javascript" src="./js/ie11/cart.js"></script> -->
    <script type="text/javascript" src="./js/cart.js"></script>
    <script type="text/javascript" src="./js/ie11/cartOverlay.js"></script>
</body>

</html>