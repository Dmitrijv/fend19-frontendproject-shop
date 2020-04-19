<?php
require_once __DIR__ . "/../model/db.php";

$categoryId = isset($_GET['cat']) ? $_GET['cat'] : 'p.category_id';
// Display all products by default.

$stmt = DB::run("SELECT p.title Title, p.number_in_stock Number, p.category_id, GROUP_CONCAT(ip.file_name ORDER BY ip.file_name) AS images FROM product_category AS pc LEFT JOIN product AS p ON p.category_id = pc.id INNER JOIN image_of_product AS ip ON ip.product_id = p.id WHERE pc.id = {$categoryId} GROUP BY p.id");

$products = "";
while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY)) {
    $images = explode(',', $tableRow['images']);
    $image1 = (count($images) > 0) ? $images[0] : 'placeholder.png';
    $imageDir = './img/product/' . $image1;
    for ($x = 0; $x <= 3; $x++) {
        $products .= "
        <div class='product grid-box'>
            <div class='product__img-wrapper grid-3'>
                <img class='product__img' src='{$imageDir}' alt='product name'>
            </div>
            <div class='grid-2'>
                <p class='product__title'>{$tableRow["Title"]}</p>
                <div class='product__count-container'>
                    <button class='product__count-btn'>-</button>
                    <p class='product__count'>{$tableRow["Number"]}</p>
                    <button class='product__count-btn'>+</button>
                </div>
                <button class='product__add-btn'>Lägg i varukorgen</button>
            </div>
        </div>";
    }
}
?>


<div class="product-container">
    <?php echo $products; ?>
</div>