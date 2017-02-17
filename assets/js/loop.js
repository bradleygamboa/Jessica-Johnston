jQuery(function($) {

    /*----------------------/
    /* PAGE LOADER
    /*---------------------*/

    if ($('body.no-preloader').length <= 0) {
        $('body').jpreLoader({
            showSplash: false,
            loaderVPos: "50%"
        });
    }


    /*----------------------/
    /* MAIN NAVIGATION
    /*---------------------*/

    // navbar and logo switch related with scroll position
    $(window).on('scroll', function() {
        if ($(window).width() > 1024) {
            if ($(document).scrollTop() > 150) {
                setNavbarLight();
            } else {
                setNavbarTransparent();
            }
        }
    });

    // navbar and logo switch related with screen width
    function toggleNavbar() {
        if (($(window).width() > 1024) && ($(document).scrollTop() <= 150)) {
            setNavbarTransparent();
        } else {
            setNavbarLight();
        }
    }

    toggleNavbar();

    $(window).resize(function() {
        toggleNavbar();
    });

    /* navbar setting functions */
    function setNavbarLight() {
        $('.navbar').addClass('navbar-light');
        $('.navbar-brand img').attr('src', 'assets/img/jj-logo-black.png');
    }

    function setNavbarTransparent() {
        $('.navbar').removeClass('navbar-light');
        $('.navbar-brand img').attr('src', 'assets/img/jj-logo-white.png');
    }

    // hide collapsible menu
    $('.navbar-nav li a').click(function() {
        if ($(this).parents('.navbar-collapse.collapse').hasClass('in')) {
            $('#main-nav').collapse('hide');
        }
    });

    $('#main-nav').localScroll({
        duration: 1000,
        easing: 'easeInOutExpo'
    });

    $('.hero-buttons').localScroll({
        duration: 1000,
        easing: 'easeInOutExpo'
    });


    /*----------------------/
    /* HERO UNIT SUPERSIZED
    /*---------------------*/

    if ($('.slideshow').length > 0) {
        $.supersized({

            // Functionality		
            autoplay: 1, // Slideshow starts playing automatically
            slide_interval: 3000, // Length between transitions
            transition: 1, // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
            transition_speed: 1000, // Speed of transition

            // Components
            slide_links: 'blank', // Individual links for each slide (Options: false, 'num', 'name', 'blank')
            thumb_links: 0, // Individual thumb links for each slide
            slides: [ // Slideshow Images
                { image: 'assets/img/sliders/jenn1.jpg', title: '<div class="hero-text"><h2 class="hero-heading">Jennifer Johnston</h2><p>Makeup Editorial</p></div>', thumb: '', url: '' },
                { image: 'assets/img/sliders/jenn2.jpg', title: '<div class="hero-text"><h2 class="hero-heading">&nbsp;</h2><p>Bridal Editorial</p></div>', thumb: '', url: '' },
                { image: 'assets/img/sliders/jenn3.jpg', title: '<div class="hero-text"><h2 class="hero-heading">&nbsp;</h2><p>Hair Editorial</p></div>', thumb: '', url: '' },
                { image: 'assets/img/sliders/jenn6.jpg', title: '<div class="hero-text"><h2 class="hero-heading">&nbsp;</h2><p>Commercial Editorial</p></div>', thumb: '', url: '' }
            ],
        });

        $(".fa-pause, .fa-play").click(function() {
            $(this).toggleClass("fa-pause fa-play");
        });
    }


    /*----------------------/
    /* PARALLAX
    /*---------------------*/

    $('.full-width-parallax').parallax(0, 0.1);

    function setParallax() {
        if ($(window).width() > 1024) {
            $('.full-width-parallax').parallax(0, 0.1);
        }
    }

    setParallax();

    $(window).resize(function() {
        setParallax();
    });


    /*----------------------/
    /* SKILLS
    /*---------------------*/

    $('#skills').waypoint(function() {
        $('.chart').each(function() {
            $(this).easyPieChart({
                size: 150,
                barColor: '#ffae3f',
                trackColor: '#eee',
                scaleColor: false,
                lineWidth: 2,
                easing: 'easeOutExpo',
                animate: 2000
            });
        });
    }, {
        offset: '70%'
    });


    /*----------------------/
    /* TWITTER STREAM
    /*---------------------*/

    /*
     * ### HOW TO CREATE A VALID ID TO USE: ###
     * Go to www.twitter.com and sign in as normal, go to your settings page.
     * Go to "Widgets" on the left hand side.
     * Create a new widget for what you need eg "user timeline" or "search" etc.
     * Feel free to check "exclude replies" if you dont want replies in results.
     * Now go back to settings page, and then go back to widgets page, you should
     * see the widget you just created. Click edit.
     * Now look at the URL in your web browser, you will see a long number like this:
     * 345735908357048478
     * Use this as your ID below instead!
     */
    /**
     * How to use fetch function:
     * @param {string} Your Twitter widget ID.
     * @param {string} The ID of the DOM element you want to write results to. 
     * @param {int} Optional - the maximum number of tweets you want returned. Must
     *     be a number between 1 and 20.
     * @param {boolean} Optional - set true if you want urls and hashtags to be hyperlinked!
     * @param {boolean} Optional - Set false if you dont want user photo /
     *     name for tweet to show.
     * @param {boolean} Optional - Set false if you dont want time of tweet
     *     to show.
     * @param {function/string} Optional - A function you can specify to format
     *     tweet date/time however you like. This function takes a JavaScript date
     *     as a parameter and returns a String representation of that date.
     *     Alternatively you may specify the string 'default' to leave it with
     *     Twitter's default renderings.
     */

    twitterFetcher.fetch('441767385733668865', 'tweet', 1, true, false, true, 'default');


    /*----------------------/
    /* SCROLL TO TOP
    /*---------------------*/

    if ($(window).width() > 992) {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        });

        $('.back-to-top').click(function(e) {
            e.preventDefault();

            $('body, html').animate({
                scrollTop: 0
            }, 800, 'easeInOutExpo');
        });
    }


    /*----------------------/
    /* WORKS
    /*---------------------*/

    var $container = $('.work-item-list');

    new imagesLoaded($container, function() {
        $container.isotope({
            itemSelector: '.work-item'
        });
    });


    $('.work-item-filters a').click(function(e) {

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector
        });

        $('.work-item-filters a').removeClass('active');
        $(this).addClass('active');

        return false;
    });

    var originalTitle, currentItem;

    $('.media-popup').magnificPopup({
        type: 'image',
        callbacks: {
            beforeOpen: function() {

                // modify item title to include description
                currentItem = $(this.items)[this.index];
                originalTitle = currentItem.title;

                // adding animation
                this.st.mainClass = 'mfp-fade';
            },
            close: function() {
                currentItem.title = originalTitle;
            }
        }

    });


    /*----------------------/
    /* SOCIAL NETWORK
    /*---------------------*/

    if ($(window).width() > 1024) {
        wow = new WOW({
            animateClass: 'animated'
        });

        wow.init();
    } else {
        $('.wow').attr('class', '');
    }


    /*----------------------/
    /* TOOLTIP
    /*---------------------*/

    if ($(window).width() > 1024) {
        $('body').tooltip({
            selector: "[data-toggle=tooltip]",
            container: "body"
        });
    }

});
