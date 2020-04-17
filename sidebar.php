<?php

require_once __DIR__ . "/php/model/db.php";

$stmt = DB::run("SELECT name, id FROM product_category");
$sidebarItems = "";
while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY)) {
    $sidebarItems .= "
    <br>
    <li class='sidebar__menu__list-item'>
    <input class='sidebar__input__item' type='radio' id='{$tableRow["id"]}' name='cat' value='{$tableRow["id"]}'>
    <label class='sidebar__menu__item' for='{$tableRow["id"]}'>{$tableRow["name"]}</label>
    </li>
    ";
}

?>

<div class="sidebar">
<nav>
        <ul class="sidebar__menu">
        <form class="form" id="myForm" method="GET">
        <?php echo $sidebarItems; ?>
        </form>
        </ul>
    </nav>
</div>

