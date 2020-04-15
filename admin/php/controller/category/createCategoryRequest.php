<?php

require_once __DIR__ . "/../controller.php";

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(500);
    die;
}

$category;
// no category name was sent
if (!isset($_POST["categoryName"])) {
    http_response_code(500);
    die;
} else {
    $category = $_POST["categoryName"];
}

// invalid / duplicate name string
if (strlen($category) < 1 || strlen($category) > 20 || (doesCategoryExist($category) == true)) {
    http_response_code(500);
    die;
}

createNewCategory($category);
die;
