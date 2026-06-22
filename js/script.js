$(function () {
    // --- FVスライダー ---
    $(".js-hero-slider").slick({
        autoplay: true,
        autoplaySpeed: 3500,
        speed: 1400,
        fade: true,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        pauseOnFocus: false,
    });

    const $hamburger = $("#js-hamburger");
    const $nav = $("#js-navigation");
    const headerHeight = 68;

    function closeHamburger() {
        $hamburger.removeClass("is-open");
        $nav.removeClass("is-open");
        $hamburger.attr("aria-expanded", "false");
    }

    $hamburger.on("click", function () {
        $hamburger.toggleClass("is-open");
        $nav.toggleClass("is-open");

        const isOpen = $hamburger.hasClass("is-open");
        $hamburger.attr("aria-expanded", isOpen);
    });

    $("#js-navigation a, .pc-nav a, .button[href^='#']").on("click", function (e) {
        const href = $(this).attr("href");

        if (!href || !href.startsWith("#") || href === "#") {
            return;
        }

        const $target = $(href);

        if (!$target.length) {
            return;
        }

        e.preventDefault();

        closeHamburger();

        $("html, body").stop().animate(
            {
                scrollTop: $target.offset().top - headerHeight
            },
            1200,
            "swing"
        );
    });

    $(window).on("resize", function () {
        if (window.innerWidth >= 768) {
            closeHamburger();
        }
    });
});