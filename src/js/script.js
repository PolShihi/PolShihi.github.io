$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1000,
        prevArrow: '<button type="button" class="carousel__arrow carousel__arrow_left"><img src="icons/left.svg" alt="left arrow"></button>',
        nextArrow: '<button type="button" class="carousel__arrow carousel__arrow_right"><img src="icons/right.svg" alt="left arrow"></button>',
        dotsClass: 'carousel__dots',
        responsive: [
            {
                breakpoint: 765,
                settings: {
                    arrows: false,
                    dots: true,
                }
            },
        ]
    });

    (function ($) {
        $(function () {
            $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
                $(this)
                    .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
                    .closest('section.catalog').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
            });

        });
    })(jQuery);

    function toggleSlide(itemSelector) {
        $(itemSelector).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
            })
        });
    }

    toggleSlide('a.catalog-item__more');
    toggleSlide('a.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #modal_consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, .modal').fadeOut('slow');
    });

    $('.catalog-item__button').each(function (i) {
        $(this).on('click', function () {
            $('#modal_order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #modal_order').fadeIn('slow');
        });
    });

    function validateForms(formSelector) {
        $(formSelector).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой телефон",
                email: {
                    required: "Пожалуйста, введите свою почку",
                    email: "Неправильно введен адрес почты",
                }
            }
        });
    }

    validateForms('.consultation .feed-form');
    validateForms('#modal_consultation .feed-form');
    validateForms('#modal_order .feed-form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize(),
        });

        $(this).find("input").val("");
 
        $('.modal').fadeOut('slow');
        $('.overlay, #modal_thanks').fadeIn('slow');

        $('form').trigger('reset');

        return false;
    });

    //pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        }
        else {
            $('.pageup').fadeOut();
        }
    });

    new WOW().init();
});
