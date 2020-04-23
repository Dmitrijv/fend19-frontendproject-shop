<?php

require_once "../php/model/db.php";

header("Content-Type: application/json; charset=UTF-8");

// only POST requests are allowed
// if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
//     http_response_code(400);
//     die;
// }

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
