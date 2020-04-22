<!-- FEATURES ATTENTION! -->
<!-- .ellipsis (kept in ad-table.scss) and now it works only when screen's width < 860px
    structure: wrapped description with span, and put same text in span's title
    effect: description will become ellipsis, and whole text will show up when user hover it -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                    <li><a href="products.php" class="active">Products</a></li>
                    <li><a href="">Orders</a></li>
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

                <form action="php-routines/createBlogPost.php" method="POST" enctype="multipart/form-data" >
                    <div class="form-group">
                        <label>Cover image</label>
                        <input type="file" name="post-attatched_image" id="post-attatched_image" accept=".jpg,.jpeg,.png,.gif" required>
                    </div>
                    <div class="form-group">
                        <label>Title</label>
                        <input name="post-title" type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea name="post-description" class="form-control" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <input name="post-price" type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Price</label>
                        <input name="post-price" type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Stock</label>
                        <input name="post-price" type="text" class="form-control" required>
                    </div>
                    <input type="submit" class="btn btn-round create-btn float-right" value="Submit">
                </form>

        </section>
        <!-- CONTENT area ends -->
    </main>


</body>

</html>
