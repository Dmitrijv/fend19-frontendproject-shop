<?php

function isProductCategoryNameValid($name)
{
    // missing name
    if (!isset($name)) {return false;}
    // name contains html code
    if (strpos($name, '<') !== false) {return false;}
    // name contains nullbyte character(s)
    if (strpos($name, chr(0)) !== false) {return false;}
    // fewer than one characters
    if (strlen($name) < 1) {return false;}
    // more than 20 characters
    if (strlen($name) > 20) {return false;}
    // string consists of spaces or nullbyte characters
    if (trim($name) == '') {return false;}

    return true;
}
