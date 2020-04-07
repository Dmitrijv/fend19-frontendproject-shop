<?php

require_once "../php/model/db.php";

header("Content-Type: application/json; charset=UTF-8");

// TODO
// only allow POST, potentially add a response size limit

$stmt = DB::run("SELECT product.id, product.title, product.description, product_category.name as category, product.number_in_stock
                FROM product, product_category
                WHERE product.id = product_category.id");

$response = [];
while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY))
{
    $category = array(
                "id" => $tableRow['id'],
                "title" => $tableRow['title'],
                "description" => $tableRow['description'],
                "category" => $tableRow['category'],
                "numberInStock" => $tableRow['number_in_stock'],
                );
    array_push($response, $category);
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);