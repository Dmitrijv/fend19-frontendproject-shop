<?php

require_once __DIR__ . "/../controller.php";

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(400);
    die;
}

// no id was sent
if (!isset($_POST["productId"])) {
    http_response_code(400);
    die;
}

$productId = intval($_POST["productId"]);

// deleting products that have been ordered is not allowed (lolwhat)
if (hasProductBeenOrdered($productId) == true) {
    http_response_code(500);
    die;
}

deleteProduct($productId);
die;
