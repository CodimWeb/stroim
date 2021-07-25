'use strict'

import $ from 'jquery';

//BS5 components
import bootstrap from 'bootstrap';

import Collapse from 'bootstrap/js/dist/collapse';
import Dropdown from 'bootstrap/js/dist/dropdown';
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
        $(this).siblings('.sidebar__links').toggleClass('full-height');
        $(this).toggleClass('active');
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
};



