<?php

include __DIR__ . '/php/view/contactform.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" type="image/png" href="https://i.ibb.co/KFBHvHY/frameme-logo.png" title="favicon">
    <title>Frame Me | Contact</title>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <span class="hamburger__bar-wrapper">
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
    </span>

    <?php require_once __DIR__ . '/php/view/sidebar.php';?>
    <?php require_once __DIR__ . '/php/view/header.php';?>
    <?php require_once __DIR__ . '/php/view/cart.php';?>

    <main>
        <div class="content_contact">
            <form action="contact.php" method="POST" class="contact__form">
                <span class="successMessage"> <?=$messageSuccess;?></span>
                <h1 class="contact__form__heading">Kontakta oss</h1>
                <span class="error"><?php echo $nameError; ?></span>
                <input type="text" class="contact__form__name" name="name" placeholder="Namn" value="<?=$name;?>">
                <span class="error"><?php echo $emailError; ?></span>
                <input type="text" class="contact__form__email" name="email" placeholder="E-post adress" value="<?=$email;?>">
                <span class="error"><?php echo $phoneError; ?></span>
                <input type="text" class="contact__form__phone" name="phone" placeholder="Telefon" value="<?=$phone;?>">
                <span class="error"><?php echo $messageError; ?></span>
                <textarea id="msg" cols="30" rows="15" name="msg" class="contact__form__msg" placeholder="Meddelande"></textarea>
                <input type="submit" class="contact__form__button" name="submit">
            </form>
        </div>
    </main>

    <?php require_once __DIR__ . '/php/view/footer.php';?>

    <!-- js scripts go here -->
    <?php require_once __DIR__ . '/php/view/jscore.php';?>
    <script type="text/javascript"> document.getElementById("msg").value = "<?php echo $message; ?>"; </script>

</body>

</html>