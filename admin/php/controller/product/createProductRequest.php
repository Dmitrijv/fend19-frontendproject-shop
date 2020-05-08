<?php

require_once __DIR__ . "/../controller.php";
require_once __DIR__ . "/../../model/utils.php";

// only POST requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    http_response_code(400);
    die;
}

function isAttatchedImageValid($target_file, $i)
{
    $allowedExtentions = ["gif", "jpeg", "jpg", "png"];
    // check if format is allowed
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    if (!in_array($imageFileType, $allowedExtentions)) {return false;}
    // check if image file is a actual image or fake image
    if (getimagesize($_FILES["product_attatched_image"]["tmp_name"][$i]) === false) {return false;}
    // check file size
    if ($_FILES["product_attatched_image"]["size"][$i] > 9500000 || $_FILES["product_attatched_image"]["size"][$i] == 0) {return false;}
    return true;
}

$numberOfFiles = sizeof($_FILES['product_attatched_image']["name"]);
// too many images were uploaded
if ($numberOfFiles > 5) {
    http_response_code(400);
    die;
}

$gallery = [];
// validate uploaded files
for ($i = 0; $i < $numberOfFiles; $i++) {
    $img_target_dir = __DIR__ . "../../../../../img/product/";
    $target_file = $img_target_dir . basename($_FILES["product_attatched_image"]["name"][$i]);
    // if it's a valid file save it to disk
    if (isAttatchedImageValid($target_file, $i) === true && !doesImageExist($_FILES["product_attatched_image"]["name"][$i])) {
        array_push($gallery, $_FILES["product_attatched_image"]["name"][$i]);
        move_uploaded_file($_FILES["product_attatched_image"]["tmp_name"][$i], $target_file);
    }
}

$productTitle = trimSides($_POST["product_title"]);
$productDescription = trimSides($_POST["product_description"]);
$productCategoryId = intval($_POST["product_category"]);
$productPrice = floatval($_POST["product_price"]);
$productStock = intval($_POST["product_stock"]);

// validate form data
if (
    !isValidProductString($productTitle) ||
    doesProductTitleExist($productTitle) == true ||
    !isValidProductString($productDescription) ||
    doesProductCategoryIdExist($productCategoryId) == false ||
    !isValidNumber($productPrice) ||
    !isValidNumber($productStock) ||
    strlen($productDescription) > 5000 ||
    strlen($productTitle) > 100 ||
    $productStock > 999999 ||
    $productPrice > 9999999
) {
    http_response_code(400);
    die;
}

$newProduct = [];
$newProduct['title'] = $productTitle;
$newProduct['description'] = $productDescription;
$newProduct['category_id'] = $productCategoryId;
$newProduct['price'] = truncateFloat($productPrice);
$newProduct['number_in_stock'] = $productStock;
$newProduct['gallery'] = $gallery;

createNewProduct($newProduct);
die;
