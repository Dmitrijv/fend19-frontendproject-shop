<!-- FEATURES ATTENTION! -->
<!-- .ellipsis (kept in ad-table.scss) and now it works only when screen's width < 860px
    structure: wrapped description with span, and put same text in span's title
    effect: description will become ellipsis, and whole text will show up when user hover it -->
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" type="image/png" href="https://i.ibb.co/KFBHvHY/frameme-logo.png" title="favicon">
        <title>Admin Area | Create Product</title>
        <link rel="stylesheet" href="css/adminpanel.css">
        <!--[if gte IE 8]>
            <link rel="stylesheet" type="text/css" href="css/adminpanel-ie.css" />
        <![endif]-->
    </head>

    <body>

        <header class="admin-header">
            <div class="header-container">
                <img class="header-icon" src="img/svg/gear.svg" alt="Gear Icon">
                <h1>Admin panel - Create Product</h1>
            </div>
        </header>

        <main class="admin-main">
            <!-- SIDEBAR begins -->
            <section class="admin-sidebar">
                <nav class="admin-nav">
                    <ul>
                        <li><a href="../index.php">Store</a></li>
                        <li><a href="index.php">Categories</a></li>
                        <li><a href="products.php" class="active">Products</a></li>
                        <li><a href="orders.php">Orders</a></li>
                    </ul>
                </nav>
            </section>
            <!-- SIDEBAR ends -->
            <!-- CONTENT area begins -->
            <section class="admin-content">
                <div class="content-wrapper">

                    <div id='productAlert' class="alert fail hidden">
                        <span class="msg"></span>
                        <form onsubmit='adminLib.hideParentElement(event);'>
                            <button class="close-btn" type="submit">Close</button>
                        </form>
                    </div>

                    <!-- <form action="php/controller/product/test.php" method="POST" enctype="multipart/form-data" > -->
                    <form onsubmit="adminLib.createNewProduct(event);" enctype="multipart/form-data">
                        <div class="form-group">
                            <label>Cover image</label>
                            <input type="file" name="product_attatched_image[]" id="product_attatched_image" accept=".jpg,.jpeg,.png,.gif" multiple>
                        </div>
                        <div class="form-group">
                            <label>Title</label>
                            <input name="product_title" type="text" maxlength="100" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea name="product_description" class="form-control" maxlength=5000 required></textarea>
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select name="product_category" class="form-control" required></select>
                        </div>
                        <div class="form-group">
                            <label>Price (SEK)</label>
                            <input name="product_price" type="number" min=0 max=9999999 step='0.01' class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Stock</label>
                            <input name="product_stock" type="number" min=0 max=999999 step='1' class="form-control"  pattern="\d{1,100}" required>
                        </div>
                        <input type="submit" class="btn btn-round create-btn" value="Submit">
                    </form>

            </section>
            <!-- CONTENT area ends -->

        </main>

        <?php require_once __DIR__ . '/php/view/adminjscore.php';?>
        <script type="text/javascript"> adminLib.fillProductCategoryDropdown(); </script>

    </body>


</html>
