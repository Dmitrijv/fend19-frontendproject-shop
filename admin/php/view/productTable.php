<?php

require_once __DIR__ . "/../../../php/model/db.php";

$selectProducts = DB::run("
    SELECT product.id,
    product.title,
    product_category.name as category,
    product.description,
    price_of_product.amount as price,
    currency.shorthand as currency,
    product.number_in_stock
    FROM product, product_category, price_of_product, currency
    WHERE product.category_id = product_category.id
    AND product.id = price_of_product.product_id
    AND currency.id = price_of_product.currency_id
    ORDER BY id ASC
");

$html = '
    <table class="db-table product-table">
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Gallery</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Category</th>
        <th>Description</th>
        <th>Action</th>
    </tr>
';

while ($product = $selectProducts->fetch(PDO::FETCH_LAZY)) {

    $productId = $product['id'];

    // trim product description to make table tidy
    $productDescription = $product['description'];
    if (strlen($productDescription) > 50) {
        $productDescription = substr($productDescription, 0, 45) . " ...";
    }

    $selectImg = "
            SELECT file_name
            FROM product, image_of_product
            WHERE product.id = image_of_product.product_id AND product.id = ?
        ";
    $selectProductImages = DB::run($selectImg, [$productId]);

    $imageGallery = [];
    while ($imgRow = $selectProductImages->fetch(PDO::FETCH_LAZY)) {array_push($imageGallery, $imgRow['file_name']);}

    $coverImage = (isset($imageGallery[0])) ? $imageGallery[0] : "placeholder.png";
    $gallerySize = sizeof($imageGallery);

    $html .= "
        <tr data-post-id='{$product['id']}'>
            <td>{$product['id']}</td>
            <td >{$product['title']}</td>
            <td>
                <div class='productCoverDemo'>
                    <img class='cover-demo' src='../img/product/{$coverImage}' alt='Cover Image'>
                    <span class='gallerySize'>{$gallerySize}</span>
                </div>
            </td>
            <td>{$product['price']} {$product['currency']}</td>
            <td>{$product['number_in_stock']} st</td>
            <td>{$product['category']}</td>
            <td title='{$product['description']}' >{$productDescription}</td>
            <td class='actionCell'>
                <form style='display: inline-block;' action='' method='POST' >
                    <input class='btn edit-btn' type='submit' data-productId='{$product['id']}' name='edit' value='Edit'>
                    <input type='hidden' name='productId' value='{$product['id']}'>
                </form>
                <form style='display: inline-block;' onsubmit=''>
                    <input class='btn del-btn' data-productId='{$product['id']}' type='submit' name='delete' value='Delete'>
                </form>
            </td>
        </tr>
    ";
}

$html .= "
    </table>
";

echo $html;
