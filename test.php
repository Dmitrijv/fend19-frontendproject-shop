<?php

$postal = "113 45";

$county = "stockholm1";

// error_log(preg_match('/^1\d{2}\s\d{2}$/', $postal) == true);

error_log(strcasecmp($county, "stockholm"));
