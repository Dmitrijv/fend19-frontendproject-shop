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
    // update products that belong to this category
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

function getProductIdByTitle($title)
{
    return DB::run("SELECT id FROM product WHERE title = ?", [$title])->fetchColumn();
}

function createNewProduct($newProduct)
{
    // register product
    $productSQL = "
        INSERT INTO product (title, description, category_id, number_in_stock)
        VALUES (?, ?, ?, ?)
    ";
    DB::run($productSQL, [$newProduct['title'], $newProduct['description'], $newProduct['category_id'], $newProduct['number_in_stock']]);

    // get the id of the product we've just created
    $newProductId = getProductIdByTitle($newProduct['title']);

    // register price for the new product
    $priceSQL = "
        INSERT INTO price_of_product (product_id, currency_id, amount)
        VALUES (?, ?, ?)
    ";
    DB::run($priceSQL, [$newProductId, 'SEK', $newProduct['price']]);

    // register uploaded images
    foreach ($newProduct['gallery'] as &$fileName) {
        // register image in db
        if (doesImageExist($fileName) === false) {
            createNewImage($fileName);
        }
        // associate image with product
        addImageOfProduct($newProductId, $fileName);
    }

}

function addImageOfProduct($productId, $fileName)
{
    $sql = "
        INSERT INTO image_of_product (product_id, file_name)
        VALUES (?,?)
    ";
    DB::run($sql, [$productId, $fileName]);
}

function createNewImage($fileName)
{
    $sql = "
        INSERT INTO image (file_name)
        VALUES (?)
    ";
    DB::run($sql, [$fileName]);
}

function doesImageExist($fileName)
{
    return DB::run("SELECT EXISTS(SELECT * FROM image WHERE file_name = ?)", [$fileName])->fetchColumn();
}

function deleteProduct($productId)
{
    DB::run("DELETE FROM product WHERE id = ?", [$productId]);
    DB::run("DELETE FROM price_of_product WHERE product_id = ?", [$productId]);
    DB::run("DELETE FROM image_of_product WHERE product_id = ?", [$productId]);
}

function doesProductTitleExist($productTitle)
{
    return DB::run("SELECT EXISTS(SELECT * FROM product WHERE title = ?)", [$productTitle])->fetchColumn();
}
