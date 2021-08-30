'use strict'

import $ from 'jquery';

//BS5 components
import Collapse from 'bootstrap/js/dist/collapse';
import Modal from 'bootstrap/js/dist/modal';
import Dropdown from 'bootstrap/js/dist/dropdown';
import Tab from 'bootstrap/js/dist/tab';

//other plugins
import Dropzone from "dropzone";
import Inputmask from "inputmask";
// import daterangepicker from 'daterangepicker';
import daterangepicker from 'jquery-date-range-picker'
import moment from 'moment';
import select2 from 'select2';

//styles
import '../scss/style.scss';
import 'slick-carousel';
import "dropzone/dist/dropzone.css";
import "jquery-date-range-picker/dist/daterangepicker.min.css"


Dropzone.autoDiscover = false;
$(document).ready(function() {
    setTimeout(function() {
        $('body').removeClass('transition-off')
    }, 100);

    $('.materil-group__input').on('focus', function() {
        $(this).closest('.materil-group').addClass('active');
    })

    $('.materil-group__input').on('blur', function(e) {
        if (e.target.value == '') {
            $(this).closest('.materil-group').removeClass('active');
        }
    })

    $('.materil-group__input').each((index, item ) => {
        if($(item).val()) {
            $(item).closest('.materil-group').addClass('active');
        }
    })

    $('.select').select2({
        width: '100%',
        selectionCssClass: 'base-select',
        dropdownCssClass: 'base-select-dropdown'
    });

    $('.select-header').select2({
        width: '100%',
        selectionCssClass: 'select-header',
        dropdownCssClass: 'select-header-dropdown',
    });

    $('.select.select--sm').select2({
        width: '100%',
        selectionCssClass: 'base-select select--sm',
        dropdownCssClass: 'select-header-dropdown',

    }).on('select2:open', function() {
        setTimeout(function() {
            $('.header__search').addClass('header__search--infocus')
        }, 0)
    }).on('select2:close', function() {
        $('.header__search').removeClass('header__search--infocus')
    });

    $('.header__search-input').on('focus', function(e) {
        $('.header__search').addClass('header__search--infocus')
    });

    $('.header__search-input').on('blur', function(e) {
        $('.header__search').removeClass('header__search--infocus')
    });

    $('#header-search-input').on('input', function(e) {
        if (e.target.value.length > 0) {
            $('.header__search').addClass('header__search--searching')
        } else {
            $('.header__search').removeClass('header__search--searching')
        }
    })

    $(document).on('click', '.sidebar__show-more', function() {
        var links = $(this).siblings('.sidebar__links').find('.sidebar__links__item');
        var linkHeight = links.outerHeight();
        var maxHeight = (linkHeight + 12) * links.length;
        console.log(links.length)
        if ($(this).hasClass('active')) {
            $(this).siblings('.sidebar__links').removeAttr('style')
            $(this).removeClass('active');
            console.log('if')
        } else {
            $(this).siblings('.sidebar__links').css('max-height', maxHeight + 'px');
            $(this).addClass('active');
            console.log('else')
        }
    })

    $('.sidebar__item__search-field').on('input', function(e) {
        var searchtList = $(this).closest('.collapse').find('.sidebar__links');
        var links = searchtList.find('.sidebar__links__item');
        links.each(function() {
            if ($(this).attr('data-value').toLowerCase().indexOf(e.target.value.toLowerCase()) == -1) {
                $(this).addClass('hidden');
            } else {
                $(this).removeClass('hidden');
            }
        })
        var visibleLink = searchtList.find('.sidebar__links__item:not(.hidden)');
        if (visibleLink.length < 9) {
            $(this).closest('.collapse').find('.sidebar__show-more').addClass('hidden')
        } else {
            $(this).closest('.collapse').find('.sidebar__show-more').removeClass('hidden')
        }

    })

    $('.catalog-item__phone__label').on('click', function() {
        $(this).css('display', 'none')
    })

    // var regIndividual = document.querySelector('#register-individual')
    // var regEntity = document.querySelector('#register-entity');
    // console.log(regIndividual)
    // console.log(regEntity)
    // var tabIndividual = new bootstrap.Tab(regIndividual)
    // var tabEntity = new bootstrap.Tab(regEntity)

    // console.log(tabIndividual)
    // console.log(tabEntity)

    var phones = document.querySelectorAll('.phone-input')
    if (phones) {
        Inputmask({ "mask": "+7(999) 999-99-99" }).mask(phones);
    }

    $('.register-type').on('change', function(e) {
        if (e.target.id == 'register-individual') {
            $('.refister__form').removeClass('active');
            $('#form-individual').addClass('active');
            console.log('fiz');
        }
        if (e.target.id == 'register-entity') {
            $('.refister__form').removeClass('active');
            $('#form-entity').addClass('active');
            console.log('entity');

        }
    })

    // $('.catalog-direction__btn').on('click', function(){
    //     $('.catalog-direction__btn').removeClass('active')
    //     $(this).addClass('active');

    //     if($(this).hasClass('horizontal-on')) {
    //         $('.catalog-list').addClass('horizontal')
    //     }
    //     else {
    //         $('.catalog-list').removeClass('horizontal')
    //     }

    // })




    toggleFaq();
    fileReader();
    takePartInTender();
    initSlider();
    sendBasket();
    showApplicationDeletingModal();
    showAdsDeletingModal();
    letDescribe();
    ImageLoader();
    dynamicTabs();
    autoHeightTextarea();
    initialDatePicker();
});

function initialDatePicker() {

    /*Tender open time range*/
    moment.locale("ru");
    $('input[name="daterange"]').dateRangePicker({
        separator: ' по ',
        language: 'ru',
        startOfWeek: 'monday',
        startDate: Date.now(),
        format: 'HH:mm DD.MM.YYYY',
        time: {
            enabled: true
        },
        /*defaultTime: moment().startOf('day').hour(9).minute(0).toDate(),*/
        defaultEndTime: moment().startOf('day').hour(17).minute(0).toDate(),
        minDays: 1,
        maxDays: 15,
        selectForward: true,
        autoClose: true,
        /*getValue: function () {
            if ($('#startDate').val() && $('#expiryDate').val())
                return $('#startDate').val() + ' to ' + $('#expiryDate').val();
            else
                return '';
        },*/
        setValue: function (s, s1, s2) {
            $('input[name="daterange"]').val(`${s1.split(' ')[1]} - ${s2.split(' ')[1]}`);
        },
        customOpenAnimation: function (cb) {
            $(this).fadeIn(300, cb);
        },
        customCloseAnimation: function (cb) {
            $(this).fadeOut(300, cb);
        }
    }).bind('datepicker-change',function(event,obj) {
        $('#startDate').val(obj.date1.getTime());
        $('#expiryDate').val(obj.date2.getTime());
        /* This event will be triggered when second date is selected */
        // obj will be something like this:
        // {
        // 		date1: (Date object of the earlier date),
        // 		date2: (Date object of the later date),
        //	 	value: "2013-06-05 to 2013-06-07"
        // }
    });

};

function dynamicTabs() {
    if(!$('.nav')) return;
    const $link = $('.nav__link');
    const $btnAdd = $('.js-add-nav-item');
    const $removeAdd = $('.js-remove-nav-item');

    $('.nav__links').delegate('.nav__link', 'click',  function(e) {
        e.preventDefault();
        $('.nav__link').parent().removeClass('active');
        $(e.target).parent().addClass('active')
        const id = $(e.target).data('page');
        $('.nav__content').removeClass('active');
        $(`${id}`).addClass('active');
    });

    $btnAdd.on('click', function (e) {
        e.preventDefault();
        const next = $('.nav__link').length + 1;
        $('.nav__links').append(`
            <li class="nav__item">
                <a class="nav__link" data-page="#lot-${next}" href="#">Лот ${next}</a>
            </li>
        `);
        $('.nav__body').append(`
             <div class="nav__content" id="lot-${next}">
                ${new Date().getSeconds()}
             </div>
        `);
    });

    $('.nav__body').delegate('.js-remove-nav-item', 'click', function (e) {
        console.log($('.js-remove-nav-item'), 'js-remove-nav-item')
        e.preventDefault();
        if($('.nav__item').length === 1) return;
        const id = $('.nav__item.active').children().data('page');
        console.log(id, 'id');
        $('.nav__item.active').remove();
        $('.nav__item').eq(0).addClass('active');
        $('.nav__content').eq(0).addClass('active');
        $(id).remove();

        $('.nav__link').each((index , item) => {
            $(item).text(`Лот ${index + 1}`)
        })
    });
}

function ImageLoader() {
    const dropzone = document.getElementById('my-form');
    if(!dropzone) return;
    let num = 1;
    new Dropzone("#my-form", {
        url: "/",
        autoProcessQueue: false,
        init: function() {
            this.on("addedfile", function(file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    let img = new Image();
                    img.src = reader.result;
                    $(`.preview-box--${num}`).html(img);
                    num === 5 ? num = 1 : num ++;
                }
            })
        }
    });
};

function showApplicationDeletingModal() {
    const $deletingBtn = $('.js-close-application');
    if(!$deletingBtn) return;
    $deletingBtn.on('click', function (e) {
        e.preventDefault();
        // TODO: логика удаления
        var myModal = new Modal(document.getElementById('applicationDeleteModal'))
        myModal.show()
    })
};
function showAdsDeletingModal() {
    const $deletingBtn = $('.js-delete-ads');
    if(!$deletingBtn) return;
    $deletingBtn.on('click', function (e) {
        e.preventDefault();
        // TODO: логика удаления
        var myModal = new Modal(document.getElementById('adsDeleteModal'))
        myModal.show()
    })
};

function toggleFaq() {
    const $fagItem = $('.js-faq');
    $fagItem.each(function(_, item) {
        const $body = $(item).find('.js-faq-body');
        $(item).off('click').on('click', function(e) {
            e.preventDefault();
            $(item).toggleClass('faq--open');
            $body.toggle(400)
        })
    });
};

function autoHeightTextarea() {
    document.querySelectorAll('textarea').forEach(el => {
        el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
        el.classList.add('auto');
        el.addEventListener('input', e => {
            el.style.height = 'auto';
            el.style.height = (el.scrollHeight) + 'px';
        });
    });
}

function fileReader() {
    const fileReaders = document.querySelectorAll(".file-reader");

    if (!(fileReaders && fileReaders.length)) return;

    fileReaders.forEach((fileReader) => {
        var fileInput = fileReader.querySelector(".file-reader__input");
        var button = fileReader.querySelector(".file-reader__label");
        var theReturn = fileReader.querySelector(".file-reader__return")
        var theReturnText = fileReader.querySelector(".file-reader__return-text");
        var closeBnt = fileReader.querySelector('.file-reader__icon-close');
        fileInput.addEventListener("change", function() {
            button.classList.add('loading');
            getData();
        });

        function getData() {
            const files = fileInput.files[0];
            if (files) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(files);
                fileReader.addEventListener("load", function(e) {
                    setTimeout(() => {
                        button.classList.remove('loading')
                    }, 500)
                    theReturnText.textContent = files.name;
                    theReturn.style.display = "flex";
                });
                closeBnt.addEventListener('click', function() {
                    theReturn.style.display = "none";
                    fileReader.abort()
                    $(this).closest('.file-reader').find('.file-reader__input').val('');
                })
            }
            setTimeout(() => {
                button.classList.remove('loading')
            }, 500)
        }
    })



};

function takePartInTender() {
    const $btn = $('.js-take-part');
    if (!$btn) return;

    $btn.on('click', function(e) {
        e.preventDefault();
        $btn.hide();;
        $('.js-take-part-info').hide();
        $('.js-take-part-form').show();
    })
};

function initSlider() {
    const $slider = $(".slider-wrapper");

    $slider.slick({
        arrows: true,
        nextArrow: $('.slider__btn-next'),
        prevArrow: $('.slider__btn-prev'),
        dots: true,
    })

    const $cardSliderNav = $('.product-card__slider-nav .slider')
    const $cardSlider = $('.product-card__slider .slider')
    $cardSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        asNavFor: '.product-card__slider-nav .slider',
        infinite: false,
        autoplay: true,
        autoplaySpeed: 4000
    });

    $cardSliderNav.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-card__slider .slider',
        arrows: false,
        infinite: false,
        dots: false,
        centerMode: false,
        swipe: false,
        focusOnSelect: true,
        vertical: true
    });

}

function sendBasket() {
    const $btnSend = $('.js-basket-send');
    const $btnContinue = $('.basket__btn-continue');
    if (!$btnSend) return;

    $btnSend.on('click', function(e) {
        e.preventDefault();
        $btnSend.addClass('is-loading');
        $btnContinue.hide();
        //TODO: Харкод
        setTimeout(() => {
            $btnSend.removeClass('is-loading');
            $btnContinue.show();
        }, 2000)
    })
};

function letDescribe() {
    const $btnDescribe = $('.js-describe');
    const $notation = $('.describe-flash');
    if (!$btnDescribe) return;

    $btnDescribe.on('click', function(e) {
        e.preventDefault();
        $btnDescribe.addClass('is-loading');
        //TODO: Харкод
        setTimeout(() => $btnDescribe.removeClass('is-loading'), 1000)
        setTimeout(() => $notation.show(), 1000)
        setTimeout(() => $notation.hide(), 3000)
    })
};
