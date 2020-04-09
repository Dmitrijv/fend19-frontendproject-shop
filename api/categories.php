<?php

require_once "../php/model/db.php";

header("Content-Type: application/json; charset=UTF-8");

// TODO
// only allow POST, potentially add a response size limit

$stmt = DB::run("SELECT * FROM product_category");

$response = [];
while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY))
{
    $category = [
        "id" => $tableRow['id'],
        "name" => $tableRow['name'],
    ];
    array_push($response, $category);
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);