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
                <div id='ordersAlert' class="alert fail hidden">
                    <span class="msg"></span>
                    <form onsubmit='adminLib.hideParentElement(event);'>
                        <button class="close-btn" type="submit">Close</button>
                    </form>
                </div>
                <input name="newCategoryNameField" class="category-input input-mid float-left" type="text" placeholder="Filter by county" onkeydown="adminLib.drawOrdersTable(event)">

                </br>
                <label>Filter by order status:</label>
                <form class="orderCategoryFilter" onsubmit="adminLib.drawOrdersTable();">
                    <div class="form-group">
                        <input type="radio" id="all" name="order_category" value="0" onchange="adminLib.drawOrdersTable(event)" checked>
                        <label for="all">Alla</label>
                    </div>
                    <div class="form-group">
                        <input type="radio" id="new" name="order_category" value="1" onchange="adminLib.drawOrdersTable(event)">
                        <label for="new">Ny</label>
                    </div>
                    <div class="form-group">
                        <input type="radio" id="in_progress" name="order_category" value="2" onchange="adminLib.drawOrdersTable(event)">
                        <label for="in_progress">Behandlas</label>
                    </div>
                    <div class="form-group">
                        <input type="radio" id="completed" name="order_category" value="3" onchange="adminLib.drawOrdersTable(event)">
                        <label for="completed">Slutförd</label>
                    </div>
                </form>
                <table role="table" class="db-table" id="orderAdminTable"></table>
        </section>
        <!-- CONTENT area ends -->
    </main>

    <?php require_once __DIR__ . '/php/view/adminjscore.php';?>
    <script type="text/javascript">adminLib.drawOrdersTable();</script>

</body>

</html>
