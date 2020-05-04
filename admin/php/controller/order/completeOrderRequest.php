<?php

require_once __DIR__ . "/../controller.php";

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(400);
    die;
}

// missing parameter
if (!isset($_POST["orderId"])) {
    http_response_code(400);
    die;
}

$orderId = intval($_POST['orderId']);

// order doesn't exist or is not suitable for this operation
if (doesActiveOrderExist($orderId) == false || isOrderInProgress($orderId) == false) {
    http_response_code(400);
    die;
}

setOrderCompleted($orderId);
die;
