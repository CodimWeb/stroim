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

import Tender from './Tender';


Dropzone.autoDiscover = false;
$(document).ready(function() {
    setTimeout(function() {
        $('body').removeClass('transition-off')
    }, 100);

    $(document).on('focus', '.materil-group__input', function() {
        $(this).closest('.materil-group').addClass('active');
    })

    $(document).on('blur', '.materil-group__input', function(e) {
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
        if ($(this).hasClass('active')) {
            $(this).siblings('.sidebar__links').removeAttr('style')
            $(this).removeClass('active');
        } else {
            $(this).siblings('.sidebar__links').css('max-height', maxHeight + 'px');
            $(this).addClass('active');
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
        }
        if (e.target.id == 'register-entity') {
            $('.refister__form').removeClass('active');
            $('#form-entity').addClass('active');

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


    //select checkbox
    const $textarea = $('.js-location-modal');

    let accum = [];
    $('.location-checkbox__input').on('input', function(e) {
        const $currentCheck = $(e.target);
        const checkedVal = $currentCheck.val();
        const textareaVal = $textarea.val();

        if($currentCheck.is(":checked")) {
            accum.push(checkedVal);
        }else {
            accum = accum.filter(item => item !== checkedVal);
        }
        $textarea.val(`${accum.join(', ')}`).focus();
        // $textarea.trigger("change")
        $textarea.css('overflow', 'auto');
        // $textarea.css('height', 'auto');
        // $textarea.css('height', $textarea.scrollTop() + $textarea.height());

    })

    // tender tabs
    $(document).on('click', '.nav__link', function(e){
        e.preventDefault();
        $('.nav__link').parent().removeClass('active');
        $(e.target).parent().addClass('active')
        const id = $(e.target).data('page');
        $('.nav__content').removeClass('active');
        $(`${id}`).addClass('active');
        let index = $(this).attr('data-index');
        tender.activeLotIndex = index;
        tender.getSelectedCategories();
        console.log(tender.activeLotIndex, 'activeLotIndex')
    })

    // инициализация тендера
    const tender = new Tender;
    tender.render();

    // добавление категорий в лот
    $('.tender-sidebar-category input').on('change', function(e) {
        console.log(tender.activeLotIndex, 'activeLotIndex')
        var category = {
            id: e.target.value,
            name: e.target.getAttribute('data-name'),
            isCloned: false,
            quantity: '',
            unitId: '',
            size: '',
            _length: '',
            steel: '',
            maxPrice: '',
            comment: '',
        }

        if($(this).prop('checked') == true) {
            tender.lotList[tender.activeLotIndex].categories.push(category)
        }
        else {
            tender.lotList[tender.activeLotIndex].categories = tender.lotList[tender.activeLotIndex].categories.filter(item => item.id != category.id);
        }
        tender.render();

        console.log(tender.lotList);
    })

    // показать таблицу
    $(document).on('click', '.lot-show-table', function(e){
        e.preventDefault();
        var index = $(this).closest('.nav__content').attr('data-index');
        tender.lotList[index].isShowTable = true;
        tender.render();
    })

    // добавить файл
    $(document).on('click', '.tender-add-file', function(e){
        e.preventDefault();
        console.log('scroll');
        let offsetTop = $('.tender-file-container').offset().top;
        $('body,html').animate({scrollTop: $('.tender-file-container').offset().top}, 300, function() {
            console.log('animation end')
        });
    })

    // дублировать категорию
    $(document).on('click', '.lot-clone-category', function(e){
        e.preventDefault();
        let categoryIndex = $(this).closest('.table__row').attr('lot-category-index');
        let insertPosition = 0;
        let categoryId = tender.lotList[tender.activeLotIndex].categories[categoryIndex].id;
        // определение позиции вставки
        for(let i = categoryIndex; i < tender.lotList[tender.activeLotIndex].categories.length; i++) {

            if(tender.lotList[tender.activeLotIndex].categories[i].id == categoryId) {
                insertPosition = i + 1;
            }
        }

        let category = Object.assign({}, tender.lotList[tender.activeLotIndex].categories[categoryIndex]);
        category.isCloned = true;
        category.quantity = '';
        category.unitId = '';
        category.size = '';
        category._length = '';
        category.steel = '';
        category.maxPrice = '';
        category.comment = '';

        tender.lotList[tender.activeLotIndex].categories.splice(insertPosition, 0, category)
        tender.render();
    })

    // удалить дублированую категорию
    $(document).on('click', '.lot-remove-category', function(e){
        e.preventDefault();
        let categoryIndex = $(this).closest('.table__row').attr('lot-category-index');
        let category = Object.assign({}, tender.lotList[tender.activeLotIndex].categories[categoryIndex]);
        category.isCloned = true;
        tender.lotList[tender.activeLotIndex].categories.splice(categoryIndex, 1)
        tender.render();
    })

    // добавить лот
    $('.js-add-nav-item').on('click', function(e) {
        e.preventDefault();
        if(tender.lotList.length < 8) {
            var lot = {
                categories: [],
                isShowTable: false,
            }
            tender.lotList.push(lot);
            tender.activeLotIndex = tender.lotList.length -1;
            tender.render();
            tender.getSelectedCategories();
            console.log(tender.lotList);
        }
    })

    // удалить лот
    $('.js-remove-nav-item').on('click', function(e){
        e.preventDefault();
        if(tender.lotList.length > 1) {
            tender.lotList.splice(tender.activeLotIndex, 1);
            if(tender.activeLotIndex != 0) {
                tender.activeLotIndex--;
            }
            else {
                tender.activeLotIndex = 0;
            }
            tender.render()
            tender.getSelectedCategories();
            console.log(tender.lotList);
        }
    })

    // заполнение полей таблицы лота
    $(document).on('input', '.lot-category-input', function(e){
        let categoryIndex = $(this).closest('.table__row').attr('lot-category-index');

        if($(this).hasClass('quantity')) {
            tender.lotList[tender.activeLotIndex].categories[categoryIndex].quantity = e.target.value;
        }

        if($(this).hasClass('size')) {
            tender.lotList[tender.activeLotIndex].categories[categoryIndex].size = e.target.value;
        }

        if($(this).hasClass('length')) {
            tender.lotList[tender.activeLotIndex].categories[categoryIndex]._length = e.target.value;
        }

        if($(this).hasClass('steel')) {
            tender.lotList[tender.activeLotIndex].categories[categoryIndex].steel = e.target.value;
        }

        if($(this).hasClass('maxPrice')) {
            tender.lotList[tender.activeLotIndex].categories[categoryIndex].maxPrice = e.target.value;
        }

        if($(this).hasClass('comment')) {
            tender.lotList[tender.activeLotIndex].categories[categoryIndex].comment = e.target.value;
        }
    })

    // заполнение селекта таблицы лота
    $(document).on('select2:select', '.lot-category-select.unitId', function(e){
        let categoryIndex = $(this).closest('.table__row').attr('lot-category-index');
        console.log(e.target.value)
        tender.lotList[tender.activeLotIndex].categories[categoryIndex].unitId = e.target.value;

    });

    $(document).on('input', '.lot-description-input', function(e){
        if($(this).hasClass('lot-input-title')) {
            tender.lotList[tender.activeLotIndex].title = e.target.value;
        }

        if($(this).hasClass('lot-input-description')) {
            tender.lotList[tender.activeLotIndex].description = e.target.value;
        }

        if($(this).hasClass('lot-input-note')) {
            tender.lotList[tender.activeLotIndex].note = e.target.value;
        }

        if($(this).hasClass('lot-input-estimated')) {
            tender.lotList[tender.activeLotIndex].estimated = e.target.value;
        }

        if($(this).hasClass('lot-input-address')) {
            tender.lotList[tender.activeLotIndex].address = e.target.value;
        }
    })

    $(document).on('change', '.lot-description-checkbox', function(e){
        if($(this).prop('checked') == true) {
            tender.lotList[tender.activeLotIndex].delivery = true;
        }
        else {
            tender.lotList[tender.activeLotIndex].delivery = false;
        }
    });



    toggleFaq();
    fileReader();
    takePartInTender();
    initSlider();
    sendBasket();
    showApplicationDeletingModal();
    showAdsDeletingModal();
    showLocationModal();
    letDescribe();
    ImageLoader();
    // dynamicTabs();
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
        format: 'HH:mm DD MMMM YYYY',
        time: {
            enabled: true
        },
        /*defaultTime: moment().startOf('day').hour(9).minute(0).toDate(),*/
        defaultEndTime: moment().startOf('day').hour(17).minute(0).toDate(),
        minDays: 1,
        maxDays: 15,
        selectForward: true,
        autoClose: true,
        setValue: function (s, s1, s2) {
            $('input[name="daterange"]').val(s);
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
    });

};

function dynamicTabs() {
    // if(!$('.nav')) return;
    // const $link = $('.nav__link');
    // const $btnAdd = $('.js-add-nav-item');
    // const $removeAdd = $('.js-remove-nav-item');

    // $('.nav__links').delegate('.nav__link', 'click',  function(e) {
    //     e.preventDefault();
    //     $('.nav__link').parent().removeClass('active');
    //     $(e.target).parent().addClass('active')
    //     const id = $(e.target).data('page');
    //     $('.nav__content').removeClass('active');
    //     $(`${id}`).addClass('active');
    // });

    // $btnAdd.on('click', function (e) {
    //     e.preventDefault();
    //     const next = $('.nav__link').length + 1;
    //     $('.nav__links').append(`
    //         <li class="nav__item">
    //             <a class="nav__link" data-page="#lot-${next}" href="#">Лот ${next}</a>
    //         </li>
    //     `);
    //     $('.nav__body').append(`
    //          <div class="nav__content" id="lot-${next}">
    //             ${new Date().getSeconds()}
    //          </div>
    //     `);
    // });

    // $('.nav__body').delegate('.js-remove-nav-item', 'click', function (e) {
    //     e.preventDefault();
    //     if($('.nav__item').length === 1) return;
    //     const id = $('.nav__item.active').children().data('page');
    //     $('.nav__item.active').remove();
    //     $('.nav__item').eq(0).addClass('active');
    //     $('.nav__content').eq(0).addClass('active');
    //     $(id).remove();

    //     $('.nav__link').each((index , item) => {
    //         $(item).text(`Лот ${index + 1}`)
    //     })
    // });

    // $('.js-sidebar-ad-category').on('change', function(){
    //     if($(this).prop('checked') == true) {
    //         var value = $(this).attr('data-value');
    //         $('#basket-ad-form-category').val(`Категория ${value}`);
    //     }
    // })
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
                    $(`.preview-box--${num}`).append(`<span class="preview-box--bg" style="background-image: url(${reader.result})"></span>`)
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

function showLocationModal() {
    const $LocationModalBtn = $('.js-location-modal');
    if(!$LocationModalBtn) return;
    let myModal;
    $LocationModalBtn.on('click', function (e) {
        e.preventDefault();
        // TODO: логика удаления
        myModal = new Modal(document.getElementById('locationModal'))
        myModal.show();

        // search
        const $search = $('.js-location-search');
        $search.on('input', function (e) {
            const substr = $(e.target).val().toLowerCase();
            $('.location-checkbox__input').each((_, item) => {
                const value = $(item).val().toLowerCase();
                if(!value.includes(substr)) {
                    $(item).closest('.modal-location__item').hide()
                }else {
                    $(item).closest('.modal-location__item').show()
                }
            })
        });
    $('.js-close-location-modal').on('click', function (e) {
        e.preventDefault();
        myModal.hide();
    })

    });
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
        $(item).on('click', function(e) {
            e.preventDefault();
            $(item).toggleClass('faq--open');
        })
    });
};

function autoHeightTextarea() {
    document.querySelectorAll('textarea').forEach(el => {
        el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
        el.classList.add('auto');
        console.log(el, 'target');
        el.addEventListener('change', e => {
            console.log('input');
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
        speed: 300,
        arrows: false,
        fade: false,
        asNavFor: '.product-card__slider-nav .slider',
        infinite: false,
        vertical: true
    });

    $cardSliderNav.slick({
        slidesToShow: 5,
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
