<?php

require_once __DIR__ . "/../controller.php";

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(400);
    die;
}

$categoryId;
$newCategoryName;

// missing parameter
if (!isset($_POST["categoryId"]) || !isset($_POST["newName"])) {
    http_response_code(400);
    die;
} else {
    $categoryId = $_POST["categoryId"];
    $newCategoryName = $_POST["newName"];
}

// invalid / duplicate category name
$duplicateName = doesProductCategoryNameExist($newCategoryName);
$containsHtml = strpos($newCategoryName, '<');
if (strlen($newCategoryName) < 1 || strlen($newCategoryName) > 20 || ($duplicateName == true) || ($containsHtml !== false)) {
    http_response_code(400);
    die;
}

updateProductCategoryName($newCategoryName, $categoryId);
die;
