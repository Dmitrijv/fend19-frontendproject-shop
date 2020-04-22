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
    $stmt = DB::run("SELECT * FROM product_category ORDER BY id ASC");
    $response = [];
    while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY)) {
        $category = [
            "id" => $tableRow['id'],
            "name" => $tableRow['name'],
        ];
        array_push($response, $category);
    }
    return $response;
}

function doesProductCategoryNameExist($categoryName)
{
    return DB::run("SELECT EXISTS(SELECT * FROM product_category WHERE name = ?)", [$categoryName])->fetchColumn();
}

function isCategoryNameTaken($categoryName, $categoryId)
{
    return DB::run("SELECT EXISTS(SELECT * FROM product_category WHERE name = ? AND NOT id = ?)", [$categoryName, $categoryId])->fetchColumn();
}

function doesProductCategoryIdExist($categoryId)
{
    return DB::run("SELECT EXISTS(SELECT * FROM product_category WHERE id = ?)", [$categoryId])->fetchColumn();
}

function deleteProductCategory($categoryId)
{
    // update roducts that belong to this category
    DB::run("UPDATE product SET category_id = 1 WHERE category_id = ?", [$categoryId]);

    // delete category
    DB::run("DELETE FROM product_category WHERE id = ?", [$categoryId]);
}

function updateProductCategoryName($newName, $categoryId)
{
    DB::run("UPDATE product_category SET name=? WHERE id=?", [$newName, $categoryId]);
}

function getProducts()
{
    $selectProducts = DB::run("
        SELECT product.id,
        product.title,
        product_category.name as category,
        product_category.id as categoryId,
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

    $response = [];
    while ($tableRow = $selectProducts->fetch(PDO::FETCH_LAZY)) {

        $product = [
            "id" => $tableRow['id'],
            "title" => $tableRow['title'],
            "description" => $tableRow['description'],
            "category" => $tableRow['category'],
            "categoryId" => $tableRow['categoryId'],
            "price" => $tableRow['price'],
            "currency" => $tableRow['currency'],
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

    return $response;
}
