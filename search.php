<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
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
        <div class="content searchContent">
            <h1>Sök resultat</h1>
            <h2 class="invalidKeywordMessage hidden">Sökordet måste vara minst två tecken lång.</h2>
            <h2 class="emptyResultMessage hidden">Inga produkter hittades.</h2>
            <div class="product-container searchResults"></div>
        </div>
    </main>

    <?php require_once __DIR__ . '/php/view/footer.php';?>

    <script src="./js/ie11/sidebar.js"></script>
    <!-- <script src="./js/sidebar.js"></script> -->

    <script type="text/javascript" src="./js/ie11/shopLib.js"></script>
    <!-- <script type="text/javascript" src="./js/shopLib.js"></script> -->
    <script type="text/javascript"> shopLib.drawCategorySelectors(); </script>

    <script type="text/javascript" src="./js/cart.js"></script>

    <script type="text/javascript">
        if (sessionStorage.getItem("searchKeyword")) {
            shopLib.sessionStorageProductSearch();
        }
    </script>

</body>

</html>