<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Area | Paintings</title>
    <!-- fontawesome CDN -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" integrity="sha384-v8BU367qNbs/aIZIxuivaU55N5GPF89WBerHoGA4QTcbUjYiLQtKdrfXnqAcXyTv" crossorigin="anonymous">
    <link rel="stylesheet" href="css/adminpanel.css">
</head>

<body>
    <!-- header begins -->
    <header class="admin-header">
        <h1 class="admin-header__title"><i class="fas fa-cogs"></i>Admin panel</h1>
    </header>
    <!-- header ends -->

    <!-- main area begins, including sidebar and content area -->
    <main class="admin-main">
        <!-- sidebar begins -->
        <div class="admin-main__sidebar">
            <ul class="admin-main__sidebar--ul">
                <a href="../index.php">
                    <li><i class="fas fa-home"></i>Store</li>
                </a>
                <a href="#" class="active">
                    <li class="nav-char-active"><i class="fas fa-folder-open"></i>Categories</li>
                </a>
                <a href="products.php">
                    <li><i class="fas fa-images"></i>Products</li>
                </a>
                <a href="orders.php">
                    <li><i class="fas fa-file"></i>Orders</li>
                </a>
            </ul>
        </div>
        <!-- sidebar ends -->

        <!-- content area begins -->
        <div class="admin-main__content">

            <form class="add-category" action="">
                <label for="submit">Create a new category: </label>
                <input class="category-input" type="text" placeholder="Input new category here...">
                <input class="btn create-btn" type="button" value="Create">
                <!-- <input type="text" name="" class="errmsg" value="Error Message to be shown"> -->
            </form>

            <!-- <table class="admin-main__content__category-table"> -->
            <?php include_once 'php/view/categoryTable.php'; ?>

        </div>
        <!-- content area ends -->
    </main>
    <!-- main area ends -->
</body>

</html>