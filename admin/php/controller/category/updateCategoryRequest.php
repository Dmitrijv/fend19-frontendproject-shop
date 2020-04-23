<?php

require_once __DIR__ . "/../controller.php";
require_once __DIR__ . "/../../model/utils.php";

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

// trim whitepsace from the beginning and end of the name
$categoryName = ltrim($categoryName);
$categoryName = rtrim($categoryName);

// attempting to update a deleted category
// $categoryExists = doesProductCategoryIdExist($categoryId);
// if ($categoryExists !== 1) {
//     http_response_code(500);
//     die;
// }

// invalid / duplicate category name
$nameTaken = isCategoryNameTaken($newCategoryName, $categoryId);
$validFormat = isProductCategoryNameValid($newCategoryName);
if ($validFormat == false || $nameTaken == true) {
    http_response_code(400);
    die;
}

updateProductCategoryName($newCategoryName, $categoryId);
die;
