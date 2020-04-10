<?php

require_once __DIR__ . "/../../../php/model/db.php";

$stmt = DB::run("SELECT * FROM product_category ORDER BY id ASC");

//create table head
$html = '
    <table class="category-table">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Action</th>
    </tr>
';

// append table rows
while ($category = $stmt->fetch(PDO::FETCH_LAZY)) {
    $html .= "
        <tr data-post-id='{$category['id']}'>
            <td>{$category['id']}</td>
            <td>{$category['name']}</td>
            <td>
                <form style='display: inline-block;' action='editCategory.php' method='POST' >
                    <input class='btn btn-left edit-btn' type='submit' data-categoryId='{$category['id']}' name='edit' value='Edit'>
                    <input type='hidden' name='categoryId' value='{$category['id']}'>
                </form>
                <form style='display: inline-block;' onsubmit='cmsLib.deleteCategory(event);'>
                    <input class='btn btn-right del-btn' data-categoryId='{$category['id']}' type='submit' name='delete' value='Delete'>
                </form>
            </td>
        </tr>
    ";
}

// close table tag
$html .= "
    </table>
";

echo $html;
