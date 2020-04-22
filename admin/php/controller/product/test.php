<?php

function isAttatchedImageValid($target_file, $i)
{
    // check if format is allowed
    $allowedExtentions = ["gif", "jpeg", "jpg", "png"];
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    if (!in_array($imageFileType, $allowedExtentions)) {return false;}
    // check if image file is a actual image or fake image
    if (getimagesize($_FILES["product_attatched_image"]["tmp_name"][$i]) === false) {return false;}
    // check file size
    if ($_FILES["product_attatched_image"]["size"][$i] > 9500000 || $_FILES["product_attatched_image"]["size"][$i] == 0) {return false;}
    return true;
}

$gallerySize = sizeof($_FILES['product_attatched_image']["name"]);
// no cover image was uploaded
if ($gallerySize === 0) {
    http_response_code(400);
    die;
}

$gallery = [];
for ($i = 0; $i < $gallerySize; $i++) {
    // validate attatched image
    $img_target_dir = __DIR__ . "../../../../../img/product/";
    $target_file = $img_target_dir . basename($_FILES["product_attatched_image"]["name"][$i]);
    if (isAttatchedImageValid($target_file, $i) === true) {
        array_push($gallery, $_FILES["product_attatched_image"]["name"][$i]);
        move_uploaded_file($_FILES["product_attatched_image"]["tmp_name"][$i], $target_file);
    } else {
        http_response_code(400);
        die;
    }
}

print("<pre>" . print_r($gallery, true) . "</pre>");
