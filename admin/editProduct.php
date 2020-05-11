<?php

require_once __DIR__ . "/php/controller/controller.php";

if (!isset($_POST['productId']) || !is_numeric($_POST['productId'])) {die;}
$productId = intval($_POST['productId']);

$p = getProductById($productId);

$gallery = getProductImages($productId);
$currentPicPreview = "<div class='previewPicContainer' >";
foreach ($gallery as &$fileName) {
    $currentPicPreview = $currentPicPreview . '<img  onclick="adminLib.hideSelf(event);" class="small-img-on-edit" data-filename="' . $fileName . '" src="../img/product/' . $fileName . '" alt="post-img">';
}
$currentPicPreview = $currentPicPreview . '</div>';

$allCategories = getProductCategories();
$categoryDropdown = '<option value="' . $p['categoryId'] . '">' . $p['category'] . '</option>';
foreach ($allCategories as &$category) {
    if ($category['id'] !== $p['categoryId']) {
        $categoryDropdown = $categoryDropdown . '<option value="' . $category['id'] . '">' . $category['name'] . '</option>';
    }
}

?>


<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" type="image/png" href="https://i.ibb.co/KFBHvHY/frameme-logo.png" title="favicon">
        <title>Admin Area | Edit Product</title>
        <link rel="stylesheet" href="css/adminpanel.css">
        <!--[if gte IE 8]>
            <link rel="stylesheet" type="text/css" href="css/adminpanel-ie.css" />
        <![endif]-->
    </head>

    <body>

        <header class="admin-header">
            <div class="header-container">
                <img class="header-icon" src="img/svg/gear.svg" alt="Gear Icon">
                <h1>Admin panel - Edit Product</h1>
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

                    <!-- <form action="php/controller/product/test.php" method="POST" enctype="multipart/form-data" data-productid="<?php echo $productId; ?>" > -->
                    <form onsubmit="adminLib.updateProduct(event);" method="POST" enctype="multipart/form-data" data-productid="<?php echo $productId; ?>" >
                        <div class="form-group">
                            <label>Add new pictures</label>
                            <input type="file" name="product_attatched_image[]" id="product_attatched_image" accept=".jpg,.jpeg,.png,.gif" multiple>
                        </div>
                        <div class="form-group">
                            <label>Remove current pictures</label>
                            <?php echo $currentPicPreview; ?>
                        </div>
                        <div class="form-group">
                            <label>Title</label>
                            <input name="product_title" type="text" maxlength="100" class="form-control" value="<?php echo htmlspecialchars($p['title'], ENT_QUOTES, 'UTF-8'); ?>" required>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea name="product_description" class="form-control" maxlength=5000 required><?php echo htmlspecialchars($p['description'], ENT_QUOTES, 'UTF-8'); ?></textarea>
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select name="product_category" class="form-control" required>
                            <?php echo $categoryDropdown; ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Price (SEK)</label>
                            <input name="product_price" type="number" min=0 max=9999999 step='0.01' class="form-control" value='<?php echo htmlspecialchars($p['price'], ENT_QUOTES, 'UTF-8'); ?>' required>
                        </div>
                        <div class="form-group">
                            <label>Stock</label>
                            <input name="product_stock" type="number" min=0 max=999999 step='1' class="form-control" value='<?php echo htmlspecialchars($p['number_in_stock'], ENT_QUOTES, 'UTF-8'); ?>' pattern="\d{1,100}" required>
                        </div>
                        <input type="submit" class="btn btn-round create-btn" value="Submit">
                    </form>

            </section>
            <!-- CONTENT area ends -->

        </main>

        <?php require_once __DIR__ . '/php/view/adminjscore.php';?>

    </body>


</html>
