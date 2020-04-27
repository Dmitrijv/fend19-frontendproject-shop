<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Checkout</title>
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




    <main id="checkout-main">
    
    <h1 class="checkout-main__h1">Kunduppgifter</h1>

    <form action="order.php" class="checkout-form">

    

    <section class="checkout-form__cart-section">

        <h2 class="checkout-form__cart-section__h2">Min varukorg</h2>
        <div class="checkout-form__cart-section__product-list"></div>
        <div class="checkout-form__cart-section__sum-area">
        <span class="pull-left">2 artiklar</span>
        <span class="pull-right total-sum">500 SEK</span>
        </section>
        
        

        <section class="checkout-form__delivery-section">
            
        <label class="checkout-form__delivery-section__label" for="">Emailadress</label><br>
            <input class="checkout-form__delivery-section__input" id="email" type="text"><br>
         

            <label class="checkout-form__delivery-section__label" for="">Förnamn</label><br>
            <input class="checkout-form__delivery-section__input" id="fname" type="text"><br>
      

            <label class="checkout-form__delivery-section__label" for="">Efternamn</label><br>
            <input class="checkout-form__delivery-section__input" id="lname" type="text"><br>
          

            <label class="checkout-form__delivery-section__label" for="">Telefonnummer</label><br>
            <input class="checkout-form__delivery-section__input" id="tel" type="text"><br>
         

            <label class="checkout-form__delivery-section__label" for="">Gatuadress</label><br>
            <input class="checkout-form__delivery-section__input" id="adress" type="text"><br>
         

            <label class="checkout-form__delivery-section__label" for="">Postnummer</label><br>
            <input class="checkout-form__delivery-section__input" id="pcode"type="text"><br>
        

            <label class="checkout-form__delivery-section__label" for="">Ort</label><br>
            <input class="checkout-form__delivery-section__input" id="city" type="text"><br>
      

            <button type="button" class="checkout-form__delivery-section__deliveryBtn">Leverera till denna adress</button>

        <div class="checkout-form__price">Totalt att betala: 568 SEK</div>
        <button type="submit" class="checkout-form__delivery-section__checkoutBtn--dim">Genomför köp</button>
        </section>

    </form>

</main>

    <?php require_once __DIR__ . '/php/view/footer.php';?>

    <!-- js scripts go here -->
    <?php require_once __DIR__ . '/php/view/jscore.php';?>
    <script type="text/javascript" src="./js/checkout-form.js"></script>

</body>

</html>
