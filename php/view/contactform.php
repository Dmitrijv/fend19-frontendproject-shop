<?php

$name = ""; //Senders name
$email = ""; //Senders email
$phone = ""; //Senders phone
$message = ""; //Senders message
$nameError = $emailError = $phoneError = $messageError = $messageSuccess = "";

if (isset($_POST['submit'])) {

    if (empty($_POST['name'])) {
        $nameError = "Namn är obligatoriskt";
    } else {
        $name = test_input($_POST["name"]); // check name only contains letters and whitespace

        if (strlen($name) < 2) {
            $nameError = "Namnet är för kort";
        }
        if (strlen($name) > 30) {
            $nameError = "Namnet är för långt";
        }

        if (!preg_match("/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/", $name)) {
            $nameError = "Bara bokstäver och mellanslag är tillåtna";
        }

    }

    if (empty($_POST["email"])) {
        $emailError = "Email är obligatoriskt";
    } else {
        $email = test_input($_POST["email"]);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailError = "Ogiltig e-post adress";
        }
    }

    if (empty($_POST["phone"])) {
        $phoneError = "Telefon är obligatoriskt";
    } else {
        $phone = test_input($_POST["phone"]);

        if (!preg_match('/^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{4}$/i', $phone)) {
            $phoneError = "Ogiltigt telefonnummer";
        }
    }

    if (empty($_POST["msg"])) {
        $messageError = "Meddelande är obligatoriskt";
    } else {
        $message = test_input($_POST["msg"]);

        if (strlen($message) < 12){
            $messageError = "Meddelandet är för kort";
        }

        if (strlen($message) > 800) {
            $messageError = "Meddelandet är för långt";
        }
    }

    if ($nameError == '' && $emailError == '' && $phoneError == '' && $messageError == '') {
        $messageSuccess = "Tack för ditt meddelande, vi svarar på det så fort vi kan!";
        $name = $email = $phone = $message = "";
    }

}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
