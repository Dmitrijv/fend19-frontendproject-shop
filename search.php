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

    <?php require_once __DIR__ . '/php/view/sidebar.php'; ?>
    <?php require_once __DIR__ . '/php/view/header.php'; ?>
    <?php require_once __DIR__ . '/php/view/cart.php'; ?>

    <main>
        <div class="content">
            <?php require_once __DIR__ . '/php/view/top-nav.php'; ?>
            <?php require_once __DIR__ . '/php/view/search-result.php'; ?>
         
        </div>
    </main>

    <?php require_once __DIR__ . '/php/view/footer.php'; ?>

    <script src="./js/sidebar-es5.js"></script>
    <script src="./js/sidebar.js"></script>
    <script src="./js/cart.js"></script>
    <script src="./js/search-validation.js"></script>

</body>

</html>