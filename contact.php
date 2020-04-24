<?php include __DIR__ . '/php/view/contactform.php';?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Contact</title>
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
        <form action="phpmailer.php" method="POST" class="contact__form">
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

    <script src="./js/ie11/sidebar.js"></script>
    <!-- <script src="./js/sidebar.js"></script> -->

    <script type="text/javascript" src="./js/ie11/shopLib.js"></script>
    <!-- <script type="text/javascript" src="./js/shopLib.js"></script> -->
    <script type="text/javascript"> shopLib.drawCategorySelectors(); </script>

    <script type="text/javascript" src="./js/cart.js"></script>

    <script type="text/javascript">
    document.getElementById("msg").value = "<?php echo $message; ?>";
    </script>

</body>

</html>