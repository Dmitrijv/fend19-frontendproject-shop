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

deleteProduct($_POST["productId"]);
die;
