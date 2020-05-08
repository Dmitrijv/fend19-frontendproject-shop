<?php

require_once __DIR__ . "/../../../php/model/db.php";
require_once __DIR__ . "/../model/utils.php";

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

function getProductById($productId)
{
    return DB::run("
        SELECT product.id,
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
}

function doesProductIdExist($productId)
{
    return DB::run("SELECT EXISTS(SELECT * FROM product WHERE id = ?)", [$productId])->fetchColumn();
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
        createNewImage($fileName);
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
        INSERT INTO image (file_name) VALUES (?)
    ";
    DB::run($sql, [$fileName]);
}

function doesImageExist($fileName)
{
    return DB::run("SELECT EXISTS(SELECT * FROM `image` WHERE `file_name` = ?)", [$fileName])->fetchColumn();
}

function updateProduct($updatedProduct)
{

    $productId = $updatedProduct['product_id'];

    // update product table
    $productSQL = "
        UPDATE product SET title=?, description=?, category_id=?, number_in_stock=? WHERE id = ?
    ";
    DB::run($productSQL, [$updatedProduct['title'], $updatedProduct['description'], $updatedProduct['category_id'], $updatedProduct['number_in_stock'], $productId]);

    // update price table
    $priceSQL = "
        UPDATE price_of_product SET amount=? WHERE product_id = ?
    ";
    DB::run($priceSQL, [$updatedProduct['price'], $productId]);

    // register new images
    foreach ($updatedProduct['gallery'] as &$fileName) {
        createNewImage($fileName);
        addImageOfProduct($productId, $fileName);
    }

    // delete removed images
    foreach ($updatedProduct['images_to_delete'] as &$fileName) {
        deleteImageFromDb($fileName);
        deleteProductImageFromDisc($fileName);
    }

}

function deleteProduct($productId)
{
    // delete images of this product
    $gallery = getProductImages($productId);
    foreach ($gallery as &$fileName) {
        deleteImageFromDb($fileName);
        deleteProductImageFromDisc($fileName);
    }

    DB::run("DELETE FROM product WHERE id = ?", [$productId]);
    DB::run("DELETE FROM price_of_product WHERE product_id = ?", [$productId]);

}

function doesProductTitleExist($productTitle)
{
    return DB::run("SELECT EXISTS(SELECT * FROM product WHERE title = ?)", [$productTitle])->fetchColumn();
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

function deleteImageFromDb($fileName)
{
    DB::run("DELETE FROM `image` WHERE `file_name` = ?", [$fileName]);
    DB::run("DELETE FROM image_of_product WHERE `file_name` = ?", [$fileName]);
}

function getActiveOrders()
{
    $stmt = DB::run("
        SELECT
            active_order_of_products.id as id,
            active_order_of_products.date_ordered_at as date_ordered_at,
            customer_data.county as county,
            active_order_of_products.status as status_id,
            SUM(ordered_product.price * ordered_product.quantity) as order_total,
            SUM(ordered_product.quantity) as item_count,
            order_status.name as status_name,
            active_order_of_products.free_shipping as free_shipping
        FROM
            active_order_of_products,
            order_status,
            ordered_product,
            customer_data
        WHERE
            active_order_of_products.status = order_status.id
            AND ordered_product.order_id = active_order_of_products.id
            AND active_order_of_products.customer_data_id = customer_data.id
        GROUP BY
            active_order_of_products.id
        ORDER BY
            date_ordered_at DESC
    ");
    $response = [];
    while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY)) {
        $category = [
            "id" => $tableRow['id'],
            "date_ordered_at" => $tableRow['date_ordered_at'],
            "county" => $tableRow['county'],
            "status_id" => $tableRow['status_id'],
            "status_name" => $tableRow['status_name'],
            "order_total" => $tableRow['order_total'],
            "free_shipping" => $tableRow['free_shipping'],
            "item_count" => $tableRow['item_count'],
        ];
        array_push($response, $category);
    }
    return $response;
}

function getCompletedOrders()
{
    $stmt = DB::run("
        SELECT
            completed_order_of_products.id as id,
            completed_order_of_products.date_ordered_at as date_ordered_at,
            customer_data.county as county,
            completed_order_of_products.status as status_id,
            SUM(delivered_product.price) as order_total,
            COUNT(delivered_product.product_id) as item_count,
            order_status.name as status_name,
            completed_order_of_products.free_shipping as free_shipping
        FROM
            completed_order_of_products,
            order_status,
            delivered_product,
            customer_data
        WHERE
            completed_order_of_products.status = order_status.id
            AND delivered_product.order_id = completed_order_of_products.id
            AND completed_order_of_products.customer_data_id = customer_data.id
        GROUP BY
            completed_order_of_products.id
        ORDER BY
            date_ordered_at DESC
    ");
    $response = [];
    while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY)) {
        $category = [
            "id" => $tableRow['id'],
            "date_ordered_at" => $tableRow['date_ordered_at'],
            "county" => $tableRow['county'],
            "status_id" => $tableRow['status_id'],
            "status_name" => $tableRow['status_name'],
            "order_total" => $tableRow['order_total'],
            "free_shipping" => $tableRow['free_shipping'],
            "item_count" => $tableRow['item_count'],
        ];
        array_push($response, $category);
    }
    return $response;

}

function setOrderInProgress($orderId)
{
    DB::run("UPDATE active_order_of_products SET status=2 WHERE id = ?", [$orderId]);
}

function setOrderCompleted($orderId)
{

    /* update order status to completed */
    DB::run("
        UPDATE active_order_of_products SET status=3 WHERE id = ?;
    ", [$orderId]);

    /* register this order in completed orders table */
    DB::run("
        INSERT INTO completed_order_of_products (id, date_ordered_at, status, customer_data_id, free_shipping)
        SELECT *
        FROM active_order_of_products
        WHERE active_order_of_products.id = ?;
    ", [$orderId]);

    /* register products that were ordered as delivered */
    DB::run("
        INSERT INTO delivered_product (product_id, order_id, price, quantity, currency_id)
        SELECT *
        FROM ordered_product
        WHERE ordered_product.order_id = ?;
    ", [$orderId]);

    /* delete the now completed order from active orders table */
    DB::run("
        DELETE FROM active_order_of_products
        WHERE active_order_of_products.id = ?;
    ", [$orderId]);

}

function doesActiveOrderExist($orderId)
{
    return DB::run("SELECT EXISTS(SELECT * FROM `active_order_of_products` WHERE `id` = ?)", [$orderId])->fetchColumn();
}

function doesCompletedOrderExist($orderId)
{
    return DB::run("SELECT EXISTS(SELECT * FROM `completed_order_of_products` WHERE `id` = ?)", [$orderId])->fetchColumn();
}

function doesOrderStatusExist($statusId)
{

}

function isOrderNew($orderId)
{
    return DB::run("SELECT EXISTS(SELECT * FROM `active_order_of_products` WHERE `id` = ? AND status=1)", [$orderId])->fetchColumn();
}

function isOrderInProgress($orderId)
{
    return DB::run("SELECT EXISTS(SELECT * FROM `active_order_of_products` WHERE `id` = ? AND status=2)", [$orderId])->fetchColumn();
}

function getOrderByIdAndStatus($orderId, $statusId)
{
    $targetTable = ($statusId == 3) ? "completed_order_of_products" : "active_order_of_products";
    return DB::run("
        SELECT " . $targetTable . ".*, order_status.name as status_name
        FROM " . $targetTable . ",
        order_status
        WHERE " . $targetTable . ".id = ?
        AND status = order_status.id
    ", [$orderId])->fetch(PDO::FETCH_LAZY);
}

function getProductsByOrderIdAndStatus($orderId, $statusId)
{
    $targetTable = ($statusId == 3) ? "delivered_product" : "ordered_product";

    $stmt = DB::run("
        SELECT *
        FROM " . $targetTable . "
        WHERE " . $targetTable . ".order_id = ?
    ", [$orderId]);

    $response = [];
    while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY)) {
        $product = [
            "product_id" => $tableRow['product_id'],
            "order_id" => $tableRow['order_id'],
            "price" => $tableRow['price'],
            "quantity" => $tableRow['quantity'],
        ];
        array_push($response, $product);
    }
    return $response;
}

function getCustomerDataById($customerId)
{
    return DB::run("
        SELECT *
        FROM customer_data
        WHERE id = ?
    ", [$customerId])->fetch(PDO::FETCH_LAZY);
}

function hasProductBeenOrdered($productId)
{
    return DB::run("SELECT EXISTS(SELECT * FROM ordered_product, delivered_product WHERE delivered_product.product_id=? OR ordered_product.product_id=?)", [$productId, $productId])->fetchColumn();
}
