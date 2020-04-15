<?php

require_once __DIR__ . "/../controller.php";

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(500);
    die;
}

// invalid or missing category name
if (!isset($_POST["categoryName"]) || strlen($_POST["categoryName"]) < 1 || strlen($_POST["categoryName"]) > 20) {
    http_response_code(500);
    die;
}

createNewCategory($_POST["categoryName"]);
die;
