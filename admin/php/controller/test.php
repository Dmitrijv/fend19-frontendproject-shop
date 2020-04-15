<?php

require_once __DIR__ . "/../../../php/model/db.php";

$categoryName = "dadadaada";

$sql = "
        INSERT INTO product_category (name)
        VALUES (?)
";

DB::run($sql, [$categoryName]);
