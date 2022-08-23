$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left_m_slide.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right_m_slide.png"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    arrows: false
      }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal Windows

    $('[data-modal=consultation]').on('click', function() {
       $('.overlay, #consultation').fadeIn('slow');
    }); 
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    // $('.button_mini').on('click', function() {
    //     $('.overlay, #order').fadeIn('slow');
    // });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    // $('#consultation-form').validate();
    // $('#consultation form').validate({
    //     rules: {
    //         name: "required",
    //         phone: "required",
    //         email: {
    //             required: true,
    //             email: true
    //         }
    //     },
    //     messages: {
    //         name: "Будь ласка, введіть своє ім'я",
    //         phone: "Будь ласка, введіть свій номер телефону",
    //         email: {
    //           required: "Будь ласка, введіть свою пошту",
    //           email: "Невірно введена адреса пошти"
    //         }
    //       }
    // });
    // $('#order form').validate();

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Будь ласка, введіть своє ім'я",
                phone: "Будь ласка, введіть свій номер телефону",
                email: {
                  required: "Будь ласка, введіть свою пошту",
                  email: "Невірно введена адреса пошти"
                }
            }
        });
    };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+38 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false; 
    });
  });