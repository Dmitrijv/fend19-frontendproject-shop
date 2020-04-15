<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Area | Categories</title>
    <link rel="stylesheet" href="css/adminpanel.css">
</head>

<body>

    <header class="admin-header">
        <div class="header-container" >
            <img class="header-icon" src="img/svg/gear.svg" alt="Gear Icon">
            <h1>Admin panel - Categories</h1>
        </div>
    </header>

    <main class="admin-main">

        <!-- SIDEBAR begins -->
        <section class="admin-sidebar">
            <nav class="admin-nav">
                <ul>
                    <li><a href="../index.php">Store</a></li>
                    <li><a class="active">Categories</a></li>
                    <li><a href="products.php">Products</a></li>
                    <li><a href="">Orders</a></li>
                </ul>
            </nav>
        </section>
        <!-- SIDEBAR ends -->

        <!-- CONTENT area begins -->
        <section class="admin-content">
            <div class="content-wrapper" >
                <form class="add-category" onsubmit='adminLib.createNewCategory(event);'>
                    <input name="newCategoryNameField" class="category-input input-left" type="text" placeholder="Create a new category">
                    <input class="btn btn-right create-btn" type="submit" value="Create">
                </form>
                <div id='categoryAlert' class="alert fail hidden">
                    <span class="msg"></span>
                    <form onsubmit='adminLib.hideParentElement(event);'>
                        <button type="submit">Close</button>
                    </form>
                </div>
                <!-- <table class="db-table"> -->
                <?php include_once 'php/view/categoryTable.php';?>
            </div>
        </section>
        <!-- CONTENT area ends -->

    </main>

    <script src="js/adminLib.js"></script>

</body>

</html>