<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" type="image/png" href="https://i.ibb.co/KFBHvHY/frameme-logo.png" title="favicon">
    <title>Frame Me | Search</title>
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
            <div class="product-container" id="productPanel"></div>
        </div>
    </main>

    <?php require_once __DIR__ . '/php/view/footer.php';?>

    <?php require __DIR__ . '/php/view/jscore.php';?>
    <script type="text/javascript">
         if (sessionStorage.getItem("searchKeyword")) {
            shopLib.sessionStorageProductSearch();
        }
    </script>

</body>

</html>