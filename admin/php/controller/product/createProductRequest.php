<?php

require_once __DIR__ . "/../controller.php";
require_once __DIR__ . "/../../model/utils.php";

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(400);
    die;
}

// var_dump($_FILES);
// var_dump($_POST);
$productTitle = isset($_POST["product_title"]) ? $_POST["product_title"] : "";
$productDescription = isset($_POST["product_description"]) ? $_POST["product_title"] : "";
$productCategoryId = isset($_POST["product_category"]) ? $_POST["product_title"] : 1;
$productPrice = isset($_POST["product_price"]) ? $_POST["product_price"] : 1000;
$productStock = isset($_POST["number_in_stock"]) ? $_POST["number_in_stock"] : "";

if (strlen($productTitle) < 2) {
    http_response_code(400);
    die;
}

die;
