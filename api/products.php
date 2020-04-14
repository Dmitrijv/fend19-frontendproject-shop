<?php

require_once "../php/model/db.php";

header("Content-Type: application/json; charset=UTF-8");

// TODO
// only allow POST, potentially add a response size limit

$selectProducts = DB::run("
    SELECT product.id, product.title, product.description, product_category.name as category, product.number_in_stock
    FROM product, product_category
    WHERE product.category_id = product_category.id
");

$response = [];
while ($tableRow = $selectProducts->fetch(PDO::FETCH_LAZY)) {

    $product = [
        "id" => $tableRow['id'],
        "title" => $tableRow['title'],
        "description" => $tableRow['description'],
        "category" => $tableRow['category'],
        "numberInStock" => $tableRow['number_in_stock'],
    ];

    $imgSql = "
        SELECT file_name
        FROM product, image_of_product
        WHERE product.id = image_of_product.product_id AND product.id = ?
    ";
    $selectProductImages = DB::run($imgSql, [$tableRow['id']]);

    $imageGallery = [];
    while ($imgRow = $selectProductImages->fetch(PDO::FETCH_LAZY)) {array_push($imageGallery, $imgRow['file_name']);}
    $product["imageGallery"] = $imageGallery;

    array_push($response, $product);
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
