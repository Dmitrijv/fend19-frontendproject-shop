<?php

require_once __DIR__ . "/../controller.php";

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(500);
    die;
}

$categoryName;
// no category name was sent
if (!isset($_POST["categoryName"])) {
    http_response_code(500);
    die;
} else {
    $categoryName = $_POST["categoryName"];
}

// invalid / duplicate category name
$duplicateName = doesProductCategoryNameExist($categoryName);
$containsHtml = strpos($categoryName, '<');
if (strlen($categoryName) < 1 || strlen($categoryName) > 20 || ($duplicateName == true) || ($containsHtml !== false)) {
    http_response_code(500);
    die;
}

createNewCategory($categoryName);
die;
