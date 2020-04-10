<?php include_once('../php/model/cms.php'); ?>
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
        <?php CMS::createAdminPanelCategoryPage(); ?>
            <!-- model sample here -->
            <!-- <table class="admin-main__content__category-table">
                <tr>
                    <th>CATEGORY'S NAME</th>
                    <th><i class="fas fa-ellipsis-h"></i></th>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td><a href=""><i class="fas fa-pen"></i></a><a href=""><i class="fas fa-trash"></i></a></td>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td><a href=""><i class="fas fa-pen"></i></a><a href=""><i class="fas fa-trash"></i></a></td>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td><a href=""><i class="fas fa-pen"></i></a><a href=""><i class="fas fa-trash"></i></a></td>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td><a href=""><i class="fas fa-pen"></i></a><a href=""><i class="fas fa-trash"></i></a></td>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td><a href=""><i class="fas fa-pen"></i></a><a href=""><i class="fas fa-trash"></i></a></td>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td><a href=""><i class="fas fa-pen"></i></a><a href=""><i class="fas fa-trash"></i></a></td>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td><a href=""><i class="fas fa-pen"></i></a><a href=""><i class="fas fa-trash"></i></a></td>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td><a href=""><i class="fas fa-pen"></i></a><a href=""><i class="fas fa-trash"></i></a></td>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td><a href=""><i class="fas fa-pen"></i></a><a href=""><i class="fas fa-trash"></i></a></td>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td><a href=""><i class="fas fa-pen"></i></a><a href=""><i class="fas fa-trash"></i></a></td>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td><a href=""><i class="fas fa-pen"></i></a><a href=""><i class="fas fa-trash"></i></a></td>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td><a href=""><i class="fas fa-pen"></i></a><a href=""><i class="fas fa-trash"></i></a></td>
                </tr>
            </table> -->

            <form class="add-category" action="">
                <input class="category-input" type="text" placeholder="Input new category here...">
                <label for="submit">
                    <button name="submit" class="category-submit" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" transform="translate(5 6)">
                        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" /></svg></button>
                </label>
                <input type="text" name="" class="errmsg" value="Error Message to be shown">
            </form>
        </div>
        <!-- content area ends -->
    </main>
    <!-- main area ends -->
</body>

</html>