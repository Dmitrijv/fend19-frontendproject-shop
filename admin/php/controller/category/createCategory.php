<?php

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(500);
    die;
}

// invalid or missing category name
if (!isset($_POST["categoryName"]) || strlen($_POST["categoryName"]) < 3) {
    http_response_code(500);
    die;
}

die;
