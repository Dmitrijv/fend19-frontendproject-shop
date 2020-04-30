<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Area | Orders</title>
    <link rel="stylesheet" href="css/adminpanel.css">
    <!--[if gte IE 8]>
        <link rel="stylesheet" type="text/css" href="css/adminpanel-ie.css" />
    <![endif]-->
</head>

<body>

    <header class="admin-header">
        <div class="header-container">
            <img class="header-icon" src="img/svg/gear.svg" alt="Gear Icon">
            <h1>Admin panel - Orders</h1>
        </div>
    </header>

    <main class="admin-main">
        <!-- SIDEBAR begins -->
        <section class="admin-sidebar">
            <nav class="admin-nav">
                <ul>
                    <li><a href="../index.php">Store</a></li>
                    <li><a href="index.php">Categories</a></li>
                    <li><a href="products.php">Products</a></li>
                    <li><a class="active">Orders</a></li>
                </ul>
            </nav>
        </section>
        <!-- SIDEBAR ends -->
        <!-- CONTENT area begins -->
        <section class="admin-content">
            <div class="content-wrapper">

                <form class="orderCategoryFilter" >
                    <input name="countyNameFilter" class="category-input input-mid float-left" type="text" placeholder="Filter by county" onkeyup="adminLib.drawFilteredOrdersTable(event)">
                </form>

                <label class="bold" >Filter by order status:</label>
                <form class="orderCategoryFilter" onsubmit="adminLib.drawFilteredOrdersTable();">
                    <div class="form-group">
                        <label for="all">
                            <input type="radio" id="all" name="order_category" value="0" onchange="adminLib.drawFilteredOrdersTable(event)" checked>
                            Alla
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="new">
                            <input type="radio" id="new" name="order_category" value="1" onchange="adminLib.drawFilteredOrdersTable(event)">
                            Ny
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="in_progress">
                            <input type="radio" id="in_progress" name="order_category" value="2" onchange="adminLib.drawFilteredOrdersTable(event)">
                            Behandlas
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="completed">
                            <input type="radio" id="completed" name="order_category" value="3" onchange="adminLib.drawFilteredOrdersTable(event)">
                            Slutförd
                        </label>
                    </div>
                </form>

                <div id='ordersAlert' class="alert fail hidden">
                    <span class="msg"></span>
                    <form onsubmit='adminLib.hideParentElement(event);'>
                        <button class="close-btn" type="submit">Close</button>
                    </form>
                </div>

                <table role="table" class="db-table" id="orderAdminTable"></table>
        </section>
        <!-- CONTENT area ends -->
    </main>

    <?php require_once __DIR__ . '/php/view/adminjscore.php';?>
    <script type="text/javascript">adminLib.drawFilteredOrdersTable();</script>

</body>

</html>
