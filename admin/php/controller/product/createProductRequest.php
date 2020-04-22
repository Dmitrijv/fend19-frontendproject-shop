<?php

require_once __DIR__ . "/../controller.php";
require_once __DIR__ . "/../../model/utils.php";

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(400);
    die;
}

$productTitle = trimSides($_POST["product_title"]);
$productDescription = trimSides($_POST["product_description"]);
$productCategoryId = intval($_POST["product_category"]);
$productPrice = floatval($_POST["product_price"]);
$productStock = intval($_POST["product_stock"]);

// validate form data
if (
    !isValidProductString($productTitle) ||
    doesProductTitleExist($productTitle) == true ||
    !isValidProductString($productDescription) ||
    doesProductCategoryIdExist($productCategoryId) == false ||
    !isValidNumber($productPrice) ||
    !isValidNumber($productStock)
) {
    http_response_code(400);
    die;
}

$newProduct = [];
$newProduct['title'] = $productTitle;
$newProduct['description'] = $productDescription;
$newProduct['category_id'] = $productCategoryId;
$newProduct['price'] = truncateFloat($productPrice);
$newProduct['number_in_stock'] = $productStock;

createNewProduct($newProduct);
die;
