<!-- FEATURES ATTENTION! -->
<!-- .ellipsis (kept in ad-table.scss) and now it works only when screen's width < 860px
    structure: wrapped description with span, and put same text in span's title
    effect: description will become ellipsis, and whole text will show up when user hover it -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Area | Products</title>
    <link rel="stylesheet" href="css/adminpanel.css">
</head>

<body>

    <header class="admin-header">
        <div class="header-container">
            <img class="header-icon" src="img/svg/gear.svg" alt="Gear Icon">
            <h1>Admin panel - Products</h1>
        </div>
    </header>

    <main class="admin-main">

        <!-- SIDEBAR begins -->
        <section class="admin-sidebar">
            <nav class="admin-nav">
                <ul>
                    <li><a href="../index.php">Store</a></li>
                    <li><a href="index.php">Categories</a></li>
                    <li><a class="active">Products</a></li>
                    <li><a href="">Orders</a></li>
                </ul>
            </nav>
        </section>
        <!-- SIDEBAR ends -->

        <!-- CONTENT area begins -->
        <section class="admin-content">
            <div class="content-wrapper">
                <!-- <table class="db-table"> -->
                <?php include_once 'php/view/productTable.php'; ?>

        </section>
        <!-- CONTENT area ends -->

        <!-- Return to Top -->
        <button id="back-to-top-btn"><img class="absolute-center-position" src="img/svg/up-arrow1.svg" alt="Up to top arrow"></button>

    </main>
    <script src="js/goToTop.js"></script>
</body>

</html>