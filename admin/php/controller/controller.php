<?php

require_once __DIR__ . "/../../../php/model/db.php";

function createNewCategory($categoryName)
{
    $sql = "
        INSERT INTO product_category (name)
        VALUES (?)
    ";
    DB::run($sql, [$categoryName]);
}

function getProductCategories()
{
    header("Content-Type: application/json; charset=UTF-8");

    $stmt = DB::run("SELECT * FROM product_category ORDER BY id ASC");
    $response = [];
    while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY)) {
        $category = [
            "id" => $tableRow['id'],
            "name" => $tableRow['name'],
        ];
        array_push($response, $category);
    }
    return json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}

function doesProductCategoryNameExist($categoryName)
{
    return DB::run("SELECT EXISTS(SELECT * FROM product_category WHERE name = ?)", [$categoryName])->fetchColumn();
}

function doesProductCategoryIdExist($categoryId)
{
    return DB::run("SELECT EXISTS(SELECT * FROM product_category WHERE id = ?)", [$categoryId])->fetchColumn();
}

function deleteProductCategory($categoryId)
{
    DB::run("DELETE FROM product_category WHERE id = ?", [$categoryId]);
}
