<?php

require_once __DIR__ . "/../model/db.php";

function getProductById($productId)
{

    $newIds = getNewlyInStockProductIds();
    $oldIds = getLastChanceProductIds();

    $tableRow = DB::run("
        SELECT product.id as id,
        product.title,
        product_category.name as category,
        product_category.id as categoryId,
        product.description,
        price_of_product.amount as price,
        product.number_in_stock
        FROM product, product_category, price_of_product
        WHERE product.category_id = product_category.id
        AND product.id = price_of_product.product_id
        AND product.id = ?
    ", [$productId])->fetch(PDO::FETCH_LAZY);

    $product = [
        "id" => $tableRow['id'],
        "title" => $tableRow['title'],
        "description" => $tableRow['description'],
        "category" => $tableRow['category'],
        "categoryId" => $tableRow['categoryId'],
        "price" => $tableRow['price'],
        "currency" => $tableRow['currency'],
        "number_in_stock" => $tableRow['number_in_stock'],
    ];

    // check if it's a newly added product
    if (isset($newIds[$productId])) {
        $product['new'] = true;
        // check if it's a "last chance" product
    } elseif (isset($oldIds[$productId])) {
        $product['old'] = true;
        $product['price'] = round(intval($product['price']) * 0.9, 2);
    }

    // get images for this product from the database
    $product['gallery'] = getProductImages($productId);

    return $product;

}

function getProductImages($productId)
{
    $stmt = DB::run("SELECT DISTINCT file_name FROM image_of_product WHERE product_id = ?", [$productId]);
    $response = [];
    while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY)) {
        array_push($response, $tableRow['file_name']);
    }
    return $response;
}

function getNewlyInStockProductIds()
{
    // get ids of new products
    $newIds = [];
    $newIdsSql = DB::run("
        SELECT id
        FROM product
        ORDER BY id DESC
        LIMIT 2
    ");
    while ($tableRow = $newIdsSql->fetch(PDO::FETCH_LAZY)) {
        $newIds[$tableRow['id']] = true;
    }
    return $newIds;
}

function getLastChanceProductIds()
{

    $oldIds = [];
    $oldIdsSql = DB::run("
        SELECT id
        FROM product
        ORDER BY id ASC
        LIMIT 2
    ");
    while ($tableRow = $oldIdsSql->fetch(PDO::FETCH_LAZY)) {
        $oldIds[$tableRow['id']] = true;
    }
    return $oldIds;
}
