<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Area | Categories</title>
    <link rel="stylesheet" href="css/adminpanel.css">
</head>

<body>
    <!-- header begins -->
    <header class="admin-header">
        <h1 class="admin-header__title"><img class="admin-header__title--gear-icon" src="img/svg/gear.svg" alt="Gear Icon">Admin panel</h1>
    </header>

    <main class="admin-main">

        <!-- sidebar begins -->
        <div class="admin-main__sidebar">
            <ul class="admin-main__sidebar--ul">
                <a href="../index.php">
                    <li><img class="store-icon icon" src="img/svg/store.svg" alt="Store Icon">Store</li>
                </a>
                <a href="#" class="active">
                    <li class="small-active"><img class="category-icon icon" src="img/svg/category.svg" alt="Category Icon">Categories</li>
                </a>
                <a href="products.php">
                    <li><img class="product-icon icon" src="img/svg/product.svg" alt="Product Icon">Products</li>
                </a>
                <!-- <a href="orders.php">
                    <li><img class="order-icon icon" src="img/svg/order.svg" alt="Order Icon">Orders</li>
                </a> -->
            </ul>
        </div>
        <!-- sidebar ends -->

        <!-- content area begins -->
        <div class="admin-main__content">

            <form class="add-category" onsubmit='adminLib.createNewCategory(event);'>
                <input name="newCategoryNameField" class="category-input input-left" type="text" placeholder="Create a new category">
                <input class="btn btn-right create-btn" type="submit" value="Create">
                <!-- <input type="text" name="" class="errmsg" value="Error Message to be shown"> -->
            </form>

            <!-- <table class="admin-main__content__category-table"> -->
            <?php include_once 'php/view/categoryTable.php';?>

        </div>
        <!-- content area ends -->
    </main>

    <script src="js/adminLib.js"></script>

</body>

</html>