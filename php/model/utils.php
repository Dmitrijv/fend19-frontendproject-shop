<?php

function trimSides($string)
{
    $string = ltrim($string);
    $string = rtrim($string);
    return $string;
}
