<?php

require_once __DIR__ . "/../php/controller/controller.php";

echo json_encode(getActiveOrders(), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
