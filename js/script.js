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

    function closeHamburger(immediate) {
        $hamburger.removeClass("is-open");
        $nav.removeClass("is-open");
        $hamburger.attr("aria-expanded", "false");
        if (immediate === true) {
            $nav.css("display", "none");
        } else {
            setTimeout(function () {
                if (!$nav.hasClass("is-open")) {
                    $nav.css("display", "none");
                }
            }, 400);
        }
    }

    $hamburger.on("click", function () {
        const isOpen = !$hamburger.hasClass("is-open");
        $hamburger.toggleClass("is-open", isOpen);
        $hamburger.attr("aria-expanded", isOpen);

        if (isOpen) {
            $nav.css("display", "flex");
            $nav[0].offsetHeight; // Force reflow
            $nav.addClass("is-open");
        } else {
            $nav.removeClass("is-open");
            setTimeout(function () {
                if (!$nav.hasClass("is-open")) {
                    $nav.css("display", "none");
                }
            }, 400);
        }
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
            closeHamburger(true);
        }
    });

    // --- スクロール幅デバッグ ---
    function checkScrollWidth() {
        console.log("【デバッグ】scrollWidth:", document.documentElement.scrollWidth, "clientWidth:", document.documentElement.clientWidth);
    }
    checkScrollWidth();
    $(window).on("resize", checkScrollWidth);
});