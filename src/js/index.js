'use strict'

import $ from 'jquery';

//BS5 components

import Collapse from 'bootstrap/js/dist/collapse';
import Modal from 'bootstrap/js/dist/modal';
import Dropdown from 'bootstrap/js/dist/dropdown';
import Tab from 'bootstrap/js/dist/tab';

//styles
import '../scss/style.scss';

import Inputmask from "inputmask";
import select2 from 'select2';


$(document).ready(function(){

    $('body').removeClass('transition-off')

    $('.materil-group__input').on('focus', function(){
        $(this).closest('.materil-group').addClass('active');
    })

    $('.materil-group__input').on('blur', function(e){
        if(e.target.value == '') {
            $(this).closest('.materil-group').removeClass('active');
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

    }).on('select2:open', function () {
        setTimeout(function () {
            $('.header__search').addClass('header__search--infocus')
        }, 0)
    }).on('select2:close', function () {
        $('.header__search').removeClass('header__search--infocus')
    });

    $('.header__search-input').on('focus', function (e) {
        $('.header__search').addClass('header__search--infocus')
    });

    $('.header__search-input').on('blur', function (e) {
        $('.header__search').removeClass('header__search--infocus')
    });

    $('#header-search-input').on('input', function(e){
        console.log()
        if(e.target.value.length > 0) {
            $('.header__search').addClass('header__search--searching')
        }
        else {
            $('.header__search').removeClass('header__search--searching')
        }
    })

    $(document).on('click', '.sidebar__show-more', function(){
        var links = $(this).siblings('.sidebar__links').find('.sidebar__links__item');
        var linkHeight = links.outerHeight();
        var maxHeight = (linkHeight + 12) * links.length;
        console.log(links.length)
        if($(this).hasClass('active')) {
            $(this).siblings('.sidebar__links').removeAttr('style')
            $(this).removeClass('active');
            console.log('if')
        }
        else {
            $(this).siblings('.sidebar__links').css('max-height', maxHeight + 'px');
            $(this).addClass('active');
            console.log('else')
        }
    })

    $('.sidebar__item__search-field').on('input', function(e){
        var searchtList = $(this).closest('.collapse').find('.sidebar__links');
        var links = searchtList.find('.sidebar__links__item');
        links.each(function(){
            if($(this).attr('data-value').toLowerCase().indexOf(e.target.value.toLowerCase()) == -1) {
                $(this).addClass('hidden');
            }
            else {
                $(this).removeClass('hidden');
            }
        })
        var visibleLink = searchtList.find('.sidebar__links__item:not(.hidden)');
        if(visibleLink.length < 9) {
            $(this).closest('.collapse').find('.sidebar__show-more').addClass('hidden')
        }
        else {
            $(this).closest('.collapse').find('.sidebar__show-more').removeClass('hidden')
        }

    })

    $('.catalog-item__phone__label').on('click', function(){
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
    if(phones) {
        Inputmask({"mask": "+7(999) 999-99-99"}).mask(phones);
    }

    $('.register-type').on('change', function(e){
        if(e.target.id == 'register-individual') {
            $('.refister__form').removeClass('active');
            $('#form-individual').addClass('active');
            console.log('fiz');
        }
        if(e.target.id == 'register-entity') {
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

});

function toggleFaq() {
    const $fagItem = $('.js-faq');
    $fagItem.each(function (_, item) {
        const $btn = $(item).find('.faq__btn');
        const $body = $(item).find('.faq__body');
        $btn.off('click').on('click', function (e) {
            e.preventDefault();
            $(item).toggleClass('faq--open');
            $body.toggle(400)
        })
    });
}

function fileReader() {
    var fileInput  = document.querySelector( ".file-reader__input" );
    var button     = document.querySelector( ".file-reader__label" );
    var theReturn = document.querySelector(".file-reader__return")
    var theReturnText = document.querySelector(".file-reader__return-text");
    var closeBnt = document.querySelector('.file-reader__icon-close');

    fileInput.addEventListener("change", function () {
        button.classList.add('loading');
        getData();
    });

    function getData() {
        const files = fileInput.files[0];
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener("load", function (e) {
                setTimeout(() => {
                    button.classList.remove('loading')
                }, 500)
                theReturnText.textContent = files.name;
                theReturn.style.display = "flex";
            });
            closeBnt.addEventListener('click', function() {
                theReturn.style.display = "none";
                fileReader.abort()
            })
        }
    }

}
