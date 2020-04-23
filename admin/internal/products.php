<?php

require_once __DIR__ . "/../php/controller/controller.php";

echo json_encode(getProducts(), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
