<?php

require_once __DIR__ . "/../controller.php";
require_once __DIR__ . "/../../model/utils.php";

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(400);
    die;
}

// form data is missing some information
if (
    !isset($_FILES["product_attatched_image"]) ||
    sizeof($_FILES["product_attatched_image"]) == 0 ||
    !isset($_POST["product_title"]) ||
    !isset($_POST["product_description"]) ||
    !isset($_POST["product_category"]) ||
    !isset($_POST["product_price"]) ||
    !isset($_POST["number_in_stock"])
) {
    http_response_code(400);
    die;
}

$productTitle = $_POST["product_title"];
$productDescription = $_POST["product_description"];
$productCategoryId = (int) $_POST["product_category"];
$productPrice = (int) $_POST["product_price"];
$productStock = (int) $_POST["number_in_stock"];

if (
    strlen($_POST["product_title"]) == 0 ||
    strlen($_POST["product_description"]) ||
    !isValidNumber($_POST["product_category"]) ||
    !isValidNumber($_POST["product_price"]) ||
    !isValidNumber($_POST["number_in_stock"])
) {
    http_response_code(400);
    die;
}

// check if this category actually exists
if ((doesProductCategoryIdExist($productCategoryId) == false)) {
    http_response_code(400);
    die;
}

createNewProduct($categoryName);
die;
