// ModalWorkV3.js
//==================вызов и закрытие модального окна======================
$(document).ready(function() {
    let Iam;

    jQuery('.boxoutput-name').click(function(){
        $('#ElementModal').modal();
    });

    $('#ElementModal .JS_Save').click(function() {
         HideModal();
    })
    $('#ElementModal .JS_Reset').click(function() {
        HideModal();
        ResetModal($(this) );
    })

    function HideModal() {$('#ElementModal').modal('hide');}

    $('.JS_Goe').click(function() {
        $('#GoeModal').modal();
    })
    $('#GoeModal .JS_ButtonModal').click(function() {
         $('#GoeModal').modal('hide');
    })
})
//======================КОНЕЦ вызов и закрытие модального окна======================


//===========================ПОВЕДЕНИЕ КНОПОК=========================================

//========================Переключение вкладок в модальном окне==
    $('.tabCalc-link').click(function() {
        SwitchTabsInModal($(this) );
    })
//========================КОНЕЦ Переключение вкладок в модальном окне==

//====================вызов экрана для выбора значения атрибута элемента==========
$(document).ready(function() {
    let Iam,
        Val_Iam,
        ID;

    $('.JS_Goe').click(function() {
        Val_Iam = $(this).val();
        ID = '#'+$(this).attr('name');
        addClassActiveTo_JS_ButtonModal();
    })

    $('.JS_Name, .JS_Level, .JS_Rotation').click(function() {
        Iam = $(this);
        Val_Iam = $(this).val();
        ID = '#'+Iam.attr('name');
        Hide_CurrentHeadersSection();
        ToggleHeaderSection();
        CheckClass() == true ? ShowHeader() : addClassActiveTo_JS_ButtonModal();
    })

    function Hide_CurrentHeadersSection() {
        Iam.closest('.JS_Section-Modal').find('.mod-header .JS_Section').not($(ID) ).removeClass('active');
    }

    function ToggleHeaderSection() {
        $(ID).toggleClass('active');
    }

    function CheckClass() {
        return !$(ID).hasClass('active') ? true : false;
    }

    function addClassActiveTo_JS_ButtonModal() {
        $(ID).find(".JS_ButtonModal").each(function(index) {
            jQuery(this).removeClass('active activeColor');
            if(Val_Iam == jQuery(this).val() ){
                jQuery(this).addClass('active activeColor');
            }
        })
    }
}) //====================КОНЕЦ вызов экрана для выбора значения атрибута элемента==========

//=======================закрытие экранов "выбор значения атрибута элемента" и открытие заголовка модульного окна=======
$(document).ready(function () {
    $('.JS_Fly, .JS_ChangeLeg, .JS_V, .JS_Galka, .JS_Edge').click(function() {
        Hide_HeadersSections($(this) );
        ShowHeader();
    })
}) //=======================КОНЕЦ закрытие экранов "выбор значения атрибута элемента"=======

//===============================активация кнопок при выборе значения атрибута==========
$(document).ready(function() {
    let Iam;

    $('.JS_Fly, .JS_ChangeLeg, .JS_V, .JS_Edge').click(function() {
        $(this).toggleClass('active activeColor');

    })

    $('.JS_Galka').click(function() {
        Iam = $(this);
        Iam.toggleClass('active activeColor');
        Iam.parent().find('.JS_Galka').not(Iam).each(function() {
            jQuery(this).removeClass('active activeColor');
        })
    })
})

$(document).ready(function() {
    $('.JS_Level, .JS_Rotation').click(function() {
        $(this).addClass('active activeColor');
    })
})
//===============================КОНЕЦ поведение кнопок при выборе значения атрибута==========

//=====================работа кнопок на экране для выбора значения атрибута элемента====
$(document).ready(function(){

    $('#GoeModal .JS_ButtonModal').click(function() {
        AddRemove_Active($(this) );
    })

    $('#ElementModal .JS_ButtonModal').click(function() {
        AddRemove_Active($(this) );
        Hide_HeadersSections($(this) );
        ShowHeader();
    })

    function AddRemove_Active(Iam) {
        Iam.closest('.JS_Section').find('.JS_ButtonModal').each(function() {
            jQuery(this).removeClass('active activeColor');
        })
        Iam.addClass('active activeColor');
    }
}) //=====================КОНЕЦ работа кнопок на экране для выбора значения атрибута элемента====

//========================добавление/удаление прыжка в модальном окне==================
    //ДОЛЖНО БЫТЬ ВЫШЕ @разблокировка кнопок "добавить прыжок"@
$(document).ready(function() {
    let section;

      $('#ElementModal .JS_AddJump').click(function() {
          $(this).closest('.JS_Section-Table').find('.JS_Section-El:not(.active):first').addClass('active splash');
          Hide_HeadersSections($(this) );
          ShowHeader();
      })
      $('#ElementModal .JS_RemoveJump').click(function() {
          section = $(this).closest('.JS_Section-Table').find('.JS_Section-El.active:last');
          ResetButtons(section);
          Hide_HeadersSections($(this) );
          ShowHeader();
      })
}) //=========================КОНЕЦ добавление/удаление прыжка в модальном окне==================



//======================Блокировка/Разблокировка кнопок==================================================
$(document).ready(function () {

    //==блокировка/разблокировка кнопки "E"
    $(document).ready(function() {
        let section;
        let button;

        $('.JS_Name').click(function() {
            section = $(this).closest('.JS_Section-El');
        })
        $('#jumps .JS_ButtonModal[value="F"], #jumps .JS_ButtonModal[value="Lz"]').click(function() {
            section.find('.JS_Edge').prop('disabled', false);
        })
        $('#jumps .JS_ButtonModal:not(.JS_ButtonModal[value="F"], .JS_ButtonModal[value="Lz"])').click(function() { //было так: #jumps .JS_ButtonModal[value="Lz"]
            button = section.find('.JS_Edge');
            button.removeClass('active activeColor');
            button.prop('disabled', true);
        })
    }) //==КОНЕЦ блокировка/разблокировка кнопки "E"

    $(document).ready(function(){
        let amount, //переменная используется для кнопок "добавить/удалить прыжок" и кнопки "Eu"
            Index_ActiveSection;
        const BTN_AddJump = $('#ElementModal .JS_AddJump');
        const BTN_RemoveJump = $('#ElementModal .JS_RemoveJump');

        //===блокировка/разблокировка кнопок "добавить прыжок" и "удалить прыжок"
        $(document).ready(function() {
            let Iam;

            $('#ElementModal .JS_Name').click(function() {
                Iam = $(this);
            })
            $('#jumps .JS_ButtonModal:not(.JS_ButtonModal[value="A"])').click(function() {
                CheckAmountLinesHide();
                if(amount < 3){
                    UnlockBTN_AddJump();
                }
            })
            BTN_RemoveJump.click(function () {
                Iam = $(this);
                CheckAmountLinesHide();
                if(amount < 3){
                    UnlockBTN_AddJump();
                }
            })

            BTN_RemoveJump.click(function () {
                Iam = $(this);
                CheckAmountLinesHide();
                if(amount < 2){
                    $(this).prop('disabled', true);
                }
            })

            BTN_AddJump.click(function () {
               LockBTN_AddJump();
                BTN_RemoveJump.prop('disabled', false);
            })

             //блокировка/разблокировка кнопки "добавить прыжок" в зависимости от кнопки "A"
             BUTTON_A.click(function() {
                 if(Index_ActiveSection == 1) {
                     if(amount == 3) {
                         BTN_RemoveJump.trigger('click');
                     }
                     LockBTN_AddJump();
                 }else {
                     UnlockBTN_AddJump();
                }
             }) //КОНЕЦ блокировка/разблокировка кнопки "добавить прыжок" в зависимости от кнопки "A"

            function CheckAmountLinesHide() {
                amount = $(Iam).closest('.JS_Section-Table').find('.JS_Section-El.active').length;
            }
        }) //===КОНЕЦ блокировка/разблокировка кнопок "добавить прыжок" и "удалить прыжок"

        function UnlockBTN_AddJump() {
            BTN_AddJump.prop('disabled', false);
            BTN_AddJump.addClass('splash');
        }

        function LockBTN_AddJump() {
            BTN_AddJump.prop('disabled', true);
            BTN_AddJump.removeClass('splash');
        }

        //====================блокировка/разблокировка кнопок   в секции "прыжки"===========
       $(document).ready(function() {
            let Index_ActiveTab,
                section,
                table;
            const NAMESECONDLINE = $('.JS_Section-Table:eq(2) .JS_Section-El:eq(1) .JS_Name'),
                  BUTTONSJUMPS = $('#jumps .JS_ButtonModal');


            //представление кнопок выбора атрибута прыжка в секции "прыжки"
            $('#ElementModal .JS_Name').click(function() {
                table = $(this).closest('.JS_Section-Table');
                Index_ActiveTab = $(this).closest('.JS_Section-Tables').find('.JS_Section-Table').index(table);
                if(Index_ActiveTab == 2){
                    section = $(this).closest('.JS_Section-El');
                    Index_ActiveSection = $(this).closest('.JS_Section-Table').find('.JS_Section-El').index(section);
                    //представление прыжков в первой линии
                    if(Index_ActiveSection == 0){
                        BUTTON_EU.prop('disabled', true);
                        BUTTONSJUMPS.not(BUTTON_EU).prop('disabled', false);
                    //представление прыжков во второй линии
                    } else if (Index_ActiveSection == 1){
                        BUTTONSJUMPS.not('.JS_ButtonModal[value="Lz"]').prop('disabled', false);
                        $('#jumps .JS_ButtonModal[value="Lz"]').prop('disabled', true);
                     //представление прыжков в третьей линии
                    } else if(Index_ActiveSection == 2) {
                        if(NAMESECONDLINE.val() == 'Eu'){
                            BUTTONSJUMPS.not('.JS_ButtonModal[value="S"], .JS_ButtonModal[value="F"]').prop('disabled', true);
                        }else {
                            $('.JS_ButtonModal[value="A"], .JS_ButtonModal[value="Eu"], .JS_ButtonModal[value="Lz"]').prop('disabled', true);
                            BUTTONSJUMPS.not('.JS_ButtonModal[value="A"], .JS_ButtonModal[value="Eu"], .JS_ButtonModal[value="Lz"]').prop('disabled', false);
                        }
                    }
                }
            }) //КОНЕЦ представление кнопок выбора атрибута прыжка в секции "прыжки"

            //блокировка/разблокировка кнопки "JS_Rotation"
            BUTTON_EU.click(function() {
                BUTTON_ROTATION.prop('disabled', true);
            })
            $('.JS_RemoveJump').click(function() {
                if (amount == 1){
                    BUTTON_ROTATION.prop('disabled', false);
                }
            })
            $('#jumps .JS_ButtonModal:not(.JS_ButtonModal[value="Eu"])').click(function() {
                if(Index_ActiveSection == 1){
                     BUTTON_ROTATION.prop('disabled', false);
                }
            }) //КОНЕЦ блокировка/разблокировка кнопки "JS_Rotation"

            //блокировка/разблокировка кнопки "JS_Level" в зависимости от кнопки "StSq"
            BUTTON_CHSQ.click(function() {
                BUTTON_STEPLEVEL.prop('disabled', true);
            })
            $('#steps .JS_ButtonModal[value="StSq"]').click(function() {
                 BUTTON_STEPLEVEL.prop('disabled', false);
            }) //КОНЕЦ блокировка/разблокировка кнопки "JS_Level" в зависимости от кнопки "StSq"

            //блокировка кнопки "V"
            $('#ElementModal .JS_Fly, #ElementModal .JS_ChangeLeg').click(function() {
                if($('#ElementModal  .JS_Fly').hasClass('active') || $('#ElementModal .JS_ChangeLeg').hasClass('active')){
                    $('#ElementModal .JS_V').prop('disabled', false);
                } else {
                     $('#ElementModal .JS_V').prop('disabled', true);
                }
            }) //КОНЕЦ блокировка кнопки "V"
        }) //====================КОНЕЦ блокировка/разблокировка кнопок в секции "прыжки"===========
    })
}) //======================КОНЕЦ Блокировка/Разблокировка кнопок===================================
// END ModalWorkV3.js
