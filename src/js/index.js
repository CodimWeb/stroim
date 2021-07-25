'use strict'

import $ from 'jquery';

//BS4 components
// import bootstrap from 'bootstrap';
import Collapse from 'bootstrap/js/dist/collapse';
import Modal from 'bootstrap/js/dist/modal';

//styles
import '../scss/style.scss';

import select2 from 'select2';


$(document).ready(function(){
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


    $('.sidebar__show-more').on('click', function(){
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

    toggleFaq();
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

