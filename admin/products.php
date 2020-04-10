<!-- FEATURES ATTENTION! -->
<!-- created class:ellipsis (kept in admin-products.scss)
        wrapped description with span, and put same text in span
     effect: description will become ellipsis, 
             and whole text will show up when user hover it -->
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
                <a href="index.php">
                    <li><i class="fas fa-folder-open"></i>Categories</li>
                </a>
                <a href="products.php" class="active">
                    <li class="nav-char-active"><i class="fas fa-images"></i>Products</li>
                </a>
                <a href="orders.php">
                    <li><i class="fas fa-file"></i>Orders</li>
                </a>
            </ul>
        </div>
        <!-- sidebar ends -->

        <!-- content area begins -->
        <div class="admin-main__content">
            <!-- search bar begins -->
            <div class="admin-main__content--search">
                <p class="error-up">error just happens</p>
                <i class="fas fa-search"></i><input class="search-area" type="text">
                <!-- <input type="text" class="errmsg"> -->
            </div>
            <!-- search bar ends -->
            <!-- model sample here -->
            <table class="admin-main__content__products-table">
                <tr>
                    <th>TITLE</th>
                    <th>CATEGORY</th>
                    <th>IMAGE</th>
                    <th>DESCRIPTION</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th><i class="fas fa-ellipsis-h"></i></th>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td>Lorem ipsum</td>
                    <td><img src="" alt="some iamges"></td>
                    <td class="ellipsis"><span title="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum libero unde hic exercitationem tempora nobis debitis?"><span class="description-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum libero unde hic exercitationem tempora nobis debitis?</span></span></td>
                    <td>899 kr</td>
                    <td>25</td>
                    <td>
                        <a href=""><i class="fas fa-pen"></i></a>
                        <a href=""><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
                <tr>
                    <td>Category 1</td>
                    <td>Lorem ipsum</td>
                    <td><img src="" alt="some iamges"></td>
                    <td class="ellipsis"><span title="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum libero unde hic exercitationem tempora nobis debitis?"><span class="description-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum libero unde hic exercitationem tempora nobis debitis?</span></span></td>
                    <td>899 kr</td>
                    <td>25</td>
                    <td>
                        <a href=""><i class="fas fa-pen"></i></a>
                        <a href=""><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
                
            </table>
        </div>
        <!-- content area ends -->

    </main>
    <!-- main area ends -->
</body>

</html>