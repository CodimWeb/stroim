'use strict'

// import $ from 'jquery';

//BS4 components
// import bootstrap from 'bootstrap';

//styles
import '../scss/style.scss';

import select2 from 'select2';

console.log(select2);



$(document).ready(function(){
    $('.materil-group__input').on('focus', function(){
        $(this).closest('.materil-group').addClass('active');
    })

    $('.materil-group__input').on('blur', function(e){
        if(e.target.value == '') {
            $(this).closest('.materil-group').removeClass('active');
        }
    })

    $('.test').select2({
        width: '100%',
        selectionCssClass: 'test',
        dropdownCssClass: 'test-dropdown'
    });
})

