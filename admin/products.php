<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/png" href="https://i.ibb.co/KFBHvHY/frameme-logo.png" title="favicon">
    <title>Admin Area | Products</title>
    <link rel="stylesheet" href="css/adminpanel.css">
    <!--[if gte IE 8]>
        <link rel="stylesheet" type="text/css" href="css/adminpanel-ie.css" />
    <![endif]-->
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
                    <li><a href="orders.php">Orders</a></li>
                </ul>
            </nav>
        </section>
        <!-- SIDEBAR ends -->
        <!-- CONTENT area begins -->
        <section class="admin-content">
            <div class="content-wrapper">
                <form class="add-category clearfix" action="createProduct.php">
                    <input class="btn btn-round create-btn float-right" type="submit" value="Create">
                </form>
                <div id='productAlert' class="alert fail hidden">
                    <span class="msg"></span>
                    <form onsubmit='adminLib.hideParentElement(event);'>
                        <button class="close-btn" type="submit">Close</button>
                    </form>
                </div>
                <table role="table" class="db-table product-table"></table>
        </section>
        <!-- CONTENT area ends -->
    </main>

    <?php require_once __DIR__ . '/php/view/adminjscore.php';?>
    <script type="text/javascript"> adminLib.drawProductTable(); </script>

</body>

</html>
