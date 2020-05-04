<?php

// don't allow get requests
if ($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])) {
    header('HTTP/1.0 403 Forbidden', true, 403);
    die();
}

require_once __DIR__ . "/../model/db.php";
header("Content-Type: application/json; charset=UTF-8");

$stmt = DB::run("
    SELECT
        product_category.id,
        product_category.name,
        Count(product.id) as relatedProducts
    FROM
        product_category
    LEFT JOIN
        product
    ON
        product_category.id=product.category_id
    WHERE
        product.number_in_stock > 0
    GROUP BY
        product_category.id
    ORDER BY
        id ASC
");

$response = [];
while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY)) {
    $category = [
        "id" => $tableRow['id'],
        "name" => $tableRow['name'],
        "relatedProducts" => $tableRow['relatedProducts'],
    ];
    array_push($response, $category);
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
