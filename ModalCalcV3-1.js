
$(document).ready(function() {

    let Iam,
        currentLine;

    $('.boxoutput-name').click(function() {
        CopyInfoFromMainTo_ElementModal1();
    })

    function CopyInfoFromMainTo_ElementModal1() {
        for(let i = 1; i <= 3; i++) {
            ProgramsElements.ElementInModal1[`name${i}`] = ProgramsElements[keyOfElement][`name${i}`];
            ProgramsElements.ElementInModal1[`value${i}`] = ProgramsElements[keyOfElement][`value${i}`];
        }
    }


    $('#ElementModal .JS_Reset').click(function() {
            ProgramsElements.ElementInModal1.ResetToZeroAllModalInfo();
    })

    $('.tabCalc-link').click(function() {
        ProgramsElements.ElementInModal1.ResetToZeroLinesInfo();
    })

    $('.JS_Name, .JS_Level, .JS_Rotation').click(function() {
        Iam = $(this);
    })

//=============================перенос информации с экрана выбора значения атрибута элемента
    $(document).ready(function () {
        let Val_ButtonModal;

       $('#ElementModal .JS_ButtonModal').click(function() {
            Val_ButtonModal = $(this).val();
            SetPropretiesOfButtons();
            DirectorModal();
        })

        function SetPropretiesOfButtons() {
            Iam.val(Val_ButtonModal);
            Iam.addClass('active activeColor');
            if( CheckClass_JS_Name() ) {
                Iam.closest('.JS_Section-El').find('.JS_Level, .JS_Rotation').addClass('active activeColor');
                if (Val_ButtonModal == 'Eu'){
                    BUTTON_ROTATION.val(1);
                }
                else if(Val_ButtonModal == 'ChSq'){
                    BUTTON_STEPLEVEL.val(1);
                }
            }
        }

        function CheckClass_JS_Name() {
            return Iam.hasClass('JS_Name') ? true : false;
        }
    }) //=============================КОНЕЦ перенос информации с экрана выбора значения атрибута элемента

    $('#ElementModal .JS_Fly, #ElementModal .JS_ChangeLeg').click(function() {
        Iam = $(this);
        if(!$('#ElementModal .JS_Fly').hasClass('active') && !$('#ElementModal .JS_ChangeLeg').hasClass('active') ) {
            $('#ElementModal .JS_V').removeClass('active activeColor');
        }
        DirectorModal();
    })

    $('#ElementModal').find('.JS_V, .JS_Galka, .JS_Edge').click(function() {
        Iam = $(this);
        DirectorModal();
    })

    $('#ElementModal .JS_RemoveJump').click(function() {
        Iam = $(this).closest('.JS_Section-Table').find('.JS_Section-El.active:last .JS_Button:first');
        GetCurrentLineAndIndex();
        ProgramsElements.ElementInModal1.ResetToZeroLinesInfo();
        currentLine.removeClass('active splash').addClass('hide');
        PrinterModal();
    })

    $('#ElementModal .JS_Save').click(function() {
        Iam = $('.tabCalc-content.active .JS_Button:first');
        DirectorModal();
    })


    function DirectorModal() {
        DirectorLine();
        PrinterModal();
    }

    //================все функции DirectorLine=====================
    function DirectorLine() {
        GetCurrentLineAndIndex();
        GetLineName();
        ProgramsElements.ElementInModal1.MakeLinesInfo();
        PrintLineScores();
        RemoveClass_Splash();
    }

    function GetCurrentLineAndIndex() {
        currentLine = Iam.closest('.JS_Section-El');
        ProgramsElements.ElementInModal1.currentLine_Index = Iam.closest('.JS_Section-Table').find('.JS_Section-El').index(currentLine)
    }


    function GetLineName() {
        ProgramsElements.ElementInModal1.linename = '';

        currentLine.find('.JS_Button.active').each(function() {
            ProgramsElements.ElementInModal1.linename += $(this).val();
        })
    }

    function RemoveClass_Splash() {
        if (ProgramsElements.ElementInModal1.CheckValidName() ) {
            currentLine.removeClass('splash'); //убираем класс анимации!!!
        }
    }

    function PrintLineScores() {
        currentLine.find('.lineoutput-scores').text(ProgramsElements.ElementInModal1.SendLinesScores().toFixed(2) );
    }
    //================КОНЕЦ все функции DirectorLine=====================

    function PrinterModal() {
        $('#ElementModal .headeroutput-name').text(ProgramsElements.ElementInModal1.makeNameOfElement() );
        $('#ElementModal .headeroutput-scores').text(ProgramsElements.ElementInModal1.calcBaseValue().toFixed(2) );
    }

}) //END ModalCalcV3.js
