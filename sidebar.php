<?php

require_once __DIR__ . "/php/model/db.php";

$stmt = DB::run("SELECT name FROM product_category");
$sidebarItems = "";
while ($tableRow = $stmt->fetch(PDO::FETCH_LAZY)) {
    $sidebarItems .= "
        <li class='sidebar__menu__item' data-src='home'>
            <a href='#' class='menu__link'>{$tableRow["name"]}</a>
        </li>
    ";
}

?>

<div class="sidebar">
<input type="radio" id="male" name="gender" value="male">
<label for="male">Male</label><br>
<input type="radio" id="female" name="gender" value="female">
<label for="female">Female</label><br>
<input type="radio" id="other" name="gender" value="other">
<label for="other">Other</label>     
<nav>
        <ul class="sidebar__menu">
        <?php echo $sidebarItems; ?>
        </ul>
    </nav>
</div>

