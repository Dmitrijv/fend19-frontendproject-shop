<?php

require_once __DIR__ . "/../controller.php";

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(500);
    die;
}

$categoryId;
// no category name was sent
if (!isset($_POST["categoryId"])) {
    http_response_code(500);
    die;
} else {
    $categoryId = $_POST["categoryId"];
}

// category doesn't exist
if ((doesProductCategoryIdExist($categoryId) == false)) {
    http_response_code(500);
    die;
}

deleteProductCategory($categoryId);
die;
