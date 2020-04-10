<?php

// delete cover image
$coverImage = DB::run("SELECT attatched_image FROM post WHERE id = ?", [$postId])->fetchColumn();
if (isset($coverImage)) { UTILS::deleteFile($coverImage); }

// delete database entry
DB::run("DELETE FROM product_category WHERE id = ?", [$categoryId]);