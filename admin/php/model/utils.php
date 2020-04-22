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

function isValidNumber($value)
{
    // not set
    if (!isset($value)) {return false;}
    // can't beconverted to number
    if (!is_numeric($value)) {return false;}
    // smaller than 1
    if ($value < 0) {return false;}
    return true;
}

function isValidProductString($string)
{
    // not set
    if (!isset($string)) {return false;}
    // string contains html code
    if (strpos($string, '<') !== false) {return false;}
    // string contains nullbyte character(s)
    if (strpos($string, chr(0)) !== false) {return false;}
    // string consists of spaces or nullbyte characters
    if (trim($string) == '') {return false;}
    return true;
}

function trimSides($string)
{
    $string = ltrim($string);
    $string = rtrim($string);
    return $string;
}
