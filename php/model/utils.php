<?php

function trimSides($string)
{
    $string = ltrim($string);
    $string = rtrim($string);
    return $string;
}

function isValidFormInputString($string)
{
    // string consists of spaces or nullbyte characters
    if (trim($string) == '') {return false;}
    // string contains special characters
    if (strpos($string, '<') !== false) {return false;}
    if (strpos($string, '>') !== false) {return false;}
    if (strpos($string, '*') !== false) {return false;}
    if (strpos($string, '?') !== false) {return false;}
    if (strpos($string, '|') !== false) {return false;}
    if (strpos($string, ':') !== false) {return false;}
    if (strpos($string, '=') !== false) {return false;}
    if (strpos($string, '/') !== false) {return false;}
    if (strpos($string, '\/') !== false) {return false;}
    return true;
}
