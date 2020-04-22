<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./css/style.css" />
        <title>single-product - info</title>
    </head>
    <body class="single-product-pgage__body">

    <span class="hamburger__bar-wrapper">
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
    </span>

    <?php require_once __DIR__ . '/php/view/sidebar.php'; ?>
    <?php require_once __DIR__ . '/php/view/header.php'; ?>
    <?php require_once __DIR__ . '/php/view/cart.php'; ?>

        <div class="wrapper">
            <div class="single-product">
                <p class="single-product__esc">X</p>
                <div class="img-wrapper">
                    <section class="carousel" aria-label="Gallery">
                        <ol class="carousel__viewport">
                            <li id="carousel__slide1" class="carousel__slide">
                                <div
                                    tabindex="0"
                                    class="img-wrapper__img img1"
                                ></div>
                                <div class="carousel__snapper">
                                    <a
                                        href="#carousel__slide4"
                                        class="carousel__prev"
                                        >Go to last slide</a
                                    >
                                    <a
                                        href="#carousel__slide2"
                                        class="carousel__next"
                                        >Go to next slide</a
                                    >
                                </div>
                            </li>
                            <li id="carousel__slide2" class="carousel__slide">
                                <div
                                    tabindex="0"
                                    class="img-wrapper__img img2"
                                ></div>
                                <div class="carousel__snapper"></div>
                                <a
                                    href="#carousel__slide1"
                                    class="carousel__prev"
                                    >Go to previous slide</a
                                >
                                <a
                                    href="#carousel__slide3"
                                    class="carousel__next"
                                    >Go to next slide</a
                                >
                            </li>
                            <li id="carousel__slide3" class="carousel__slide">
                                <div
                                    tabindex="0"
                                    class="img-wrapper__img img3"
                                ></div>
                                <div class="carousel__snapper"></div>
                                <a
                                    href="#carousel__slide2"
                                    class="carousel__prev"
                                    >Go to previous slide</a
                                >
                                <a
                                    href="#carousel__slide4"
                                    class="carousel__next"
                                    >Go to next slide</a
                                >
                            </li>
                            <li id="carousel__slide4" class="carousel__slide">
                                <div
                                    tabindex="0"
                                    class="img-wrapper__img img4"
                                ></div>
                                <div class="carousel__snapper"></div>
                                <a
                                    href="#carousel__slide3"
                                    class="carousel__prev"
                                    >Go to previous slide</a
                                >
                                <a
                                    href="#carousel__slide1"
                                    class="carousel__next"
                                    >Go to first slide</a
                                >
                            </li>
                        </ol>
                        <aside class="carousel__navigation">
                            <ol class="carousel__navigation-list">
                                <li class="carousel__navigation-item">
                                    <a
                                        href="#carousel__slide1"
                                        class="carousel__navigation-button"
                                        >Go to slide 1</a
                                    >
                                </li>
                                <li class="carousel__navigation-item">
                                    <a
                                        href="#carousel__slide2"
                                        class="carousel__navigation-button"
                                        >Go to slide 2</a
                                    >
                                </li>
                                <li class="carousel__navigation-item">
                                    <a
                                        href="#carousel__slide3"
                                        class="carousel__navigation-button"
                                        >Go to slide 3</a
                                    >
                                </li>
                                <li class="carousel__navigation-item">
                                    <a
                                        href="#carousel__slide4"
                                        class="carousel__navigation-button"
                                        >Go to slide 4</a
                                    >
                                </li>
                            </ol>
                        </aside>
                    </section>
                </div>
                <article>
                    <h1 class="single-product__title">Title</h1>
                    <p class="single-product__text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Animi nemo eos odit voluptates veritatis, et voluptatum.
                        Qui culpa excepturi mollitia, ducimus consequatur a
                        animi sunt vitae suscipit? Aut, deserunt tempora.
                    </p>
                </article>
                <p class="single-product__storage-count">Storage-count</p>
            </div>
        </div>

        <?php require_once __DIR__ . '/php/view/footer.php'; ?>
        <!-- JS for imgae carousel -->
        <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
    </body>
</html>
