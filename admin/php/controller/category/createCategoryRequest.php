<?php

require_once __DIR__ . "/../controller.php";
require_once __DIR__ . "/../../model/utils.php";

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(400);
    die;
}

$categoryName;
// no category name was sent
if (!isset($_POST["categoryName"])) {
    http_response_code(400);
    die;
} else {
    $categoryName = $_POST["categoryName"];
}

// trim whitepsace from the beginning and end of the name
$categoryName = ltrim($categoryName);
$categoryName = rtrim($categoryName);

// invalid / duplicate category name
$duplicateName = doesProductCategoryNameExist($categoryName);
$validFormat = isProductCategoryNameValid($categoryName);
if ($validFormat == false || $duplicateName == true) {
    http_response_code(400);
    die;
}

createNewCategory($categoryName);
die;
