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
    <table role="table" class="db-table product-table">
        <thead role="rowgroup">
            <tr role="row">
                <th role="columnheader">ID</th>
                <th role="columnheader">Title</th>
                <th role="columnheader">Gallery</th>
                <th role="columnheader">Price</th>
                <th role="columnheader">Stock</th>
                <th role="columnheader">Category</th>
                <th role="columnheader">Description</th>
                <th role="columnheader">Action</th>
            </tr>
        </thead>
';

while ($product = $selectProducts->fetch(PDO::FETCH_LAZY)) {

    $productId = $product['id'];

    $selectImg = "
            SELECT file_name
            FROM product, image_of_product
            WHERE product.id = image_of_product.product_id AND product.id = ?
        ";
    $selectProductImages = DB::run($selectImg, [$productId]);

    $imageGallery = [];
    while ($imgRow = $selectProductImages->fetch(PDO::FETCH_LAZY)) {
        array_push($imageGallery, $imgRow['file_name']);
    }

    $coverImage = (isset($imageGallery[0])) ? $imageGallery[0] : "placeholder.png";
    $gallerySize = sizeof($imageGallery);

    $html .= "
        <tbody role='rowgroup'>
            <tr role='row' data-post-id='{$productId}'>
                <td role='cell'>{$productId}</td>
                <td role='cell' class='ie-ellipsis'><span class='ie-ellipsis-text'>{$product['title']}</span></td>
                <td role='cell'>
                    <div class='productCoverDemo'>
                        <img class='cover-demo' src='../img/product/{$coverImage}' alt='Cover Image'>
                        <span class='gallerySize'>{$gallerySize}</span>
                    </div>
                </td>
                <td role='cell'>{$product['price']} {$product['currency']}</td>
                <td role='cell'>{$product['number_in_stock']} st</td>
                <td role='cell'>{$product['category']}</td>
                <td class='ellipsis' role='cell'><span class='show-all-description' title='{$product['description']}'><span class='description-text'>{$product['description']}</span></span></td>
                <td role='cell' class='actionCell'>
                    <form style='display: inline-block;' action='' method='POST' >
                        <input class='btn edit-btn' type='submit' data-productId='{$productId}' name='edit' value='Edit'>
                        <input type='hidden' name='productId' value='{$productId}'>
                    </form>
                    <form style='display: inline-block;' onsubmit=''>
                        <input class='btn del-btn' data-productId='{$productId}' type='submit' name='delete' value='Delete'>
                    </form>
                </td>
            </tr>
        </tbody>
    ";
}

$html .= "
    </table>
";

echo $html;
