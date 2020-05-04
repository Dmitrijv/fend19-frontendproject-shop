<?php

require_once __DIR__ . "/../model/db.php";

function doesProductIdExist($productId)
{
    return DB::run("SELECT EXISTS(SELECT * FROM product WHERE id = ?)", [$productId])->fetchColumn();
}

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
        WHERE number_in_stock > 0
        ORDER BY id DESC
        LIMIT 4
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
        WHERE number_in_stock > 0
        ORDER BY id ASC
        LIMIT 4
    ");
    while ($tableRow = $oldIdsSql->fetch(PDO::FETCH_LAZY)) {
        $oldIds[$tableRow['id']] = true;
    }
    return $oldIds;
}

function createNewOrder($order)
{
    $sql = "
        INSERT INTO active_order_of_products (date_ordered_at, status, customer_data_id, free_shipping)
        VALUES (?, 1, ?, ?)
    ";
    DB::run($sql, [$order['date_ordered_at'], $order['customer_data_id'], $order['free_shipping']]);
}

function getOrderIdByTimeAndUser($date_ordered_at, $customer_data_id)
{
    return DB::run("
        SELECT id
        FROM active_order_of_products
        WHERE date_ordered_at = ?
        AND customer_data_id = ?
    ", [$date_ordered_at, $customer_data_id])->fetchColumn();
}

function saveCustomerDataToDb($id, $data)
{
    $sql = "
        INSERT INTO customer_data (id, email, phone, first_name, last_name, street, postal_number, county)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ";
    DB::run($sql, [$id, $data['email'], $data['phone'], $data['first_name'], $data['last_name'], $data['street'], $data['postal_number'], $data['county']]);
}

function doesCustomerDataIdExist($id)
{
    return DB::run("SELECT EXISTS(SELECT * FROM customer_data WHERE id = ?)", [$id])->fetchColumn();

}

function createOrderedProduct($orderId, $product, $quantity)
{

    $productId = intval($product['id']);

    $sql = "
        INSERT INTO ordered_product (product_id, order_id, price, quantity, currency_id)
        VALUES (?, ?, ?, ?, ?)
    ";
    DB::run($sql, [$productId, $orderId, $product['price'], $quantity, "SEK"]);

    $newNumberInStock = intval($product['number_in_stock']) - $quantity;
    // this should never happen in theory because order process doesn't let you order more than there is in stock
    if ($newNumberInStock < 0) {
        $newNumberInStock = 0;
    }

    // remove ordered items from stoc
    DB::run("UPDATE product SET number_in_stock = ? WHERE id = ?", [$newNumberInStock, $productId]);

}
