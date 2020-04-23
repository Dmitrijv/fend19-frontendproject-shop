<?php

// don't allow direct access through the browser
if ($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])) {
    header('HTTP/1.0 403 Forbidden', true, 403);
    die();
}

require_once __DIR__ . "/../model/db.php";
header("Content-Type: application/json; charset=UTF-8");

$stmt = DB::run("SELECT * FROM product_category ORDER BY id");

$response = [];
while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY)) {
    $category = [
        "id" => $tableRow['id'],
        "name" => $tableRow['name'],
    ];
    array_push($response, $category);
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
