//================представление в главной таблице===================
/*
$(document).ready(function() {

    //================представление кнопок Х и Goe=====================
    $(document).ready(function() {

        let buttonX,
            buttonGoe;

        $('.boxoutput-name').click(function() {
            buttonX=$(this).closest('.JS_Section-El').find('.JS_X');
            buttonGoe=$(this).closest('.JS_Section-El').find('.JS_Goe');
        })
        $('#ElementModal .JS_Save').click(function() {
            if(IndexT==2){
                buttonX.prop('disabled', false);
            }
            else {
                buttonX.prop('disabled', true).removeClass('active activeColor');
            }
            buttonGoe.removeClass('active activeColor').val(0);
        })

        $('#ElementModal .JS_Reset').click(function() {
            buttonX.prop('disabled', true).removeClass('active activeColor');
            buttonGoe.removeClass('active activeColor').val(0);
        })

    })
    //================КОНЕЦ представление кнопок Х и Goe=====================



})
//================КОНЕЦ представление в главной таблице===================
*/
