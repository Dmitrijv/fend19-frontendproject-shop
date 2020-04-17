<?php

require_once __DIR__ . "/php/model/db.php";
isset($_GET['cat']) ? 
$categoryId = $_GET['cat'] 
: $categoryId = 1;

$stmt = DB::run("SELECT p.title Title, p.number_in_stock Number, I.file_name Image FROM product AS P JOIN image_of_product AS I WHERE P.category_id = {$categoryId}");
$products = "";
while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY)) {
    $imageDir = './img/product/' . $tableRow['Image'];
    $products .= "
        <div class='product'>
            <div class='product__img-wrapper'>
                <img class='product__img' src='{$imageDir}' alt='product name'>
            </div>
            <p class='product__title'>{$tableRow["Title"]}</p>
            <div class='product__count-container'>
                <button class='product__count-btn'>-</button>
                <p class='product__count'>{$tableRow["Number"]}</p>
                <button class='product__count-btn'>+</button>
            </div>
            <button class='product__add-btn'>Lägg i varukorgen</button>
        </div>";
}

?>

<div class="content">
<h2><?php $name?></h2>
    <div class="product-container">
        <?php echo $products;?>
</div>