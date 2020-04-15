<?php

require_once __DIR__ . "/php/model/db.php";

$stmt = DB::run("SELECT p.title Title, p.number_in_stock Number, I.file_name Image FROM product AS P JOIN image_of_product AS I WHERE P.id = I.product_id");
$products = "";
while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY)) {
    $imageDir = './img/product/' . $tableRow['Image'];
    $products .= "
        <div class='product'>
            <div class='img-wrapper'>
                <img class='img-wrapper_img' src='{$imageDir}' alt='product name'>
            </div>
            <p class='product__title'>{$tableRow["Title"]}</p>
            <div class='count-container'>
                <button class='count-btn'>-</button>
                <p class='count'>{$tableRow["Number"]}</p>
                <button class='count-btn'>+</button>
            </div>
            <button class='add-to-cart-btn'>Lägg i varukorgen</button>
        </div>";
}

?>

<div class="content">
<div class="filter">
<label for="category">Filtrera:</label>
<select id="category">
  <option value="volvo">Pastell</option>
  <option value="saab">Oljemålning</option>
</select> 
</div>
    <div class="product-container">
        <?php echo $products; ?>
    </div>
</div>