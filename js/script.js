$(document).ready(function () {
    // maybe for future?
    // let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

    // Init popups
    function OpenPopup(popupId) {
        $('body').removeClass('no-scrolling');
        $('.popup').removeClass('js-popup-show');
        popupId = '#' + popupId;
        $(popupId).addClass('js-popup-show');
        $('body').addClass('no-scrolling');
    }
    $('.pop-op').click(function (e) {
        e.preventDefault();
        let data = $(this).data('popup');
        OpenPopup(data);
    });
    function closePopup() {
        $('.js-close-popup').on('click', function (e) {
            e.preventDefault();
            $('.popup').removeClass('js-popup-show');
            $('body').removeClass('no-scrolling');
        });
    }
    closePopup();
    function clickClosePopup(popupId) {
        popupId = '#' + popupId;
        $(popupId).removeClass('js-popup-show');
        $('body').removeClass('no-scrolling');
    }

    // example open popup after validation
    // $('.popup button.btn').click(function(e) {
    //     e.preventDefault();
    //     if($('form').valid()){
    //         OpenPopup('popup_id');
    //     }
    // });

    // validate login form
    $('#log button.btn').click(function(e) {
        e.preventDefault();
        if($('#log form').valid()){
            console.log('yeap');
        }
    });

    // validate reg form
    $('#reg button.btn').click(function(e) {
        e.preventDefault();
        if($('#reg form').valid()){
            console.log('yeap');
        }
    });

    // example init scrollbar for tables
    // $('.table-wrapper').scrollbar();
    $('.table-body').scrollbar();

    // init phone inputmask
    function maskInit() {
        $(".phone-mask").inputmask({
            mask:"+7(999)999-99-99",
            "clearIncomplete": true
        });
    }
    maskInit();

    // init validation
    function checkValidate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    email: {
                        required: true,
                        email: true 
                    },
                    phone: {
                        required: true,
                        phone: true 
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                highlight: function (element, errorClass, validClass){
                    var elem = $(element);
                    if (elem.hasClass("select2-hidden-accessible")) {
                        $(elem).parent().find('.select2-selection--single').addClass('select2'+ errorClass); 
                    } else {
                        elem.addClass(errorClass);
                    }
                },    
                unhighlight: function (element, errorClass, validClass){
                    var elem = $(element);
                    if (elem.hasClass("select2-hidden-accessible")) {
                        $(elem).parent().find('.select2-selection--single').removeClass('select2' + errorClass);
                    } else {
                        elem.removeClass(errorClass);
                    }
                },
                messages: {
                    phone: 'Некорректный номер',
                    email: 'Некорректный e-mail',
                    name: 'Поле обязательно для заполнения',
                    lastName: 'Поле обязательно для заполнения',
                    city: 'Поле обязательно для заполнения',
                    checkRules: 'Поле обязательно для заполнения',
                    checkData: 'Поле обязательно для заполнения'
                } 
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });
    }
    checkValidate();

    // init select2
    if($('.select:not(.select-search)').length > 1) {
        var parent = $('select').parents('.select');
        $('select').each(function() {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: parent
            });
        });
    } else {
        $('select:not(.select-search)').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.select')
        });
    }

    // init select2 with search
    $('.select-search').each(function() {
        let $this = $(this);
        let parent = $(this).parents('.select');
        $this.select2({
            minimumResultsForSearch: 4,
            dropdownParent: parent,
            language: {
                noResults: function (params) {
                    return "Неправильное название.";
                }
            }
        });
    });

    // восстановление пароля
    $('#restore-password .btn').click(function(e){
        e.preventDefault();
        if($('#restore-password form').valid()) {
            $('#restore-password .btn').addClass('disabled');
            $('.clock-text, .after-send').show();
            $('.before-send').hide();
            let dt = new Date();
            let time = dt.getFullYear() + '/' + (dt.getMonth()+1) + '/' + dt.getDate() + ' ' + dt.getHours() + ":" + (dt.getMinutes()+1) + ":" + dt.getSeconds();
            $('.clock').parent().show();
            $('.clock').countdown(time)
            .on('update.countdown', function(event) {
                $(this).html(event.strftime('%M:%S'));
            })
            .on('finish.countdown', function(event) {
                $(this).parent().hide();
                $('.after-send').hide();
                $('.before-send').show();
                $('#restore-password .btn').removeClass('disabled');
            });

            // do smth
        }
    });

    // init accordion
    function openAccordion() {
        var wrap = $('.accordion-wrap');
        var accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
          var $this = $(this);
          var $parent = $(this).parent();
          var content = $this.next();

          if (content.is(':visible')) {
            $this.removeClass('active');
            $parent.removeClass('active');
            content.slideUp('fast');
          } else {
            $this.addClass('active');
            $parent.addClass('active');
            content.slideDown('fast');
          }

        });
    }
    openAccordion();

    $('.burger').click(function(e){
        e.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");

        $('.header-container').toggleClass('active');
        $('body').on('click', function (e) {
            var div = $('.header-container, .burger');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass('active');
            }
        });
    });

    /* Init sliders */
    $('.prize-catalogue-slider').slick({
        mobileFirst: true, 
        arrows: false,
        centerMode: true, 
        autoplay: false,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 650,
                settings: "unslick" // because we need this only on mobiles
            }
        ]
    });

    $('.main-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 9000,
        swipeToSlide: true,
        
    });

    $('.prize-slider').slick({
        infinite: true,
        speed: 500,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 7000,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },{            
                breakpoint: 850,
                settings: {
                    arrows: false,
                    slidesToShow: 4
                }
            },{            
                breakpoint: 1260,
                settings: {
                    arrows: false,
                }
            }
        ]
    });
    /* Init sliders end */ 


    /* Init countdown for prize rolls */
    $('#countdown-init-hidden').countdown('2020/10/31')
        .on('update.countdown', function(event){
            $('.countdown-days').text(event.offset.totalDays);
            $('.countdown-hours').text(event.offset.hours);
            $('.countdown-sec').text(event.offset.seconds);
        })
        .on('finish.countdown', function(){
            // what to do?
        });
    /* Init countdown for prize rolls END */

});