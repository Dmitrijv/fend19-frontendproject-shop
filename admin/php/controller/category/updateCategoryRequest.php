<?php

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(400);
    die;
}

$categoryId;
$newCategoryName;

// missing parameter
if (!isset($_POST["categoryId"]) || !isset($_POST["newCategoryName"])) {
    http_response_code(400);
    die;
} else {
    $categoryId = $_POST["categoryId"];
    $newCategoryName = $_POST["categoryId"];
}
