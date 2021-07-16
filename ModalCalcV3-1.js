// ModalCalcV3-1.js
$(document).ready(function() {

    let Iam,
        currentLine,
        linescores;

    $('.boxoutput-name').click(function() {
        ProgramsElements.ElementInModal1.ResetToZeroAllModalInfo();
        GetInfoFrom_ElementObject();
    })

    function GetInfoFrom_ElementObject() {
        for(let i = 1; i <= 3; i++) {
            ProgramsElements.ElementInModal1[`name${i}`] = ProgramsElements[keyOfElement][`name${i}`];
            ProgramsElements.ElementInModal1[`value${i}`] = ProgramsElements[keyOfElement][`value${i}`];
        }
    }

    $('.JS_Name, .JS_Level, .JS_Rotation').click(function() {
        Iam = $(this);
    })

    $('.tabCalc-link').click(function() {
        ProgramsElements.ElementInModal1.ResetToZeroAllModalInfo();
    })

    $('#ElementModal .JS_Reset').click(function() {
        ProgramsElements.ElementInModal1.ResetToZeroAllModalInfo();
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
                else if(Val_ButtonModal == 'ChSq') {
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

    $('#ElementModal').find('.JS_V, .JS_Galka, .JS_Edge, .JS_RemoveJump').click(function() {
        Iam = $(this);
        DirectorModal();
    })

    $('#ElementModal .JS_RemoveJump').click(function() {
        Iam = $(this).closest('.JS_Section-Table').find('.JS_Section-El.active:last .JS_Button:first');
        GetCurrentLineAndIndex();
        currentLine.removeClass('active splash').addClass('hide');
        ProgramsElements.ElementInModal1.ResetToZeroLinesInfo();
        PrinterModal();
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
        removeClass_Splash();
        return;
    }


    function GetCurrentLineAndIndex() {
        currentLine = Iam.closest('.JS_Section-El');
        ProgramsElements.ElementInModal1.currentLine_Index = Iam.closest('.JS_Section-Table').find('.JS_Section-El').index(currentLine);
    }

    function GetLineName() {
        ProgramsElements.ElementInModal1.linename = '';

        currentLine.find('.JS_Button.active').each(function() {
            ProgramsElements.ElementInModal1.linename += $(this).val();
        })
    }

    function removeClass_Splash() {
        if (ProgramsElements.ElementInModal1.CheckValidName() ) {
            currentLine.removeClass('splash');
        }
    }

    function PrintLineScores() {
        currentLine.find('.lineoutput-scores').text(ProgramsElements.ElementInModal1.SendLinesScores().toFixed(2) );
        return;
    }
    //================КОНЕЦ все функции DirectorLine=====================

    function PrinterModal() {
        $('#ElementModal .headeroutput-name').text(ProgramsElements.ElementInModal1.makeNameOfElement() );
        $('#ElementModal .headeroutput-scores').text(ProgramsElements.ElementInModal1.calcBaseValue().toFixed(2) );
    }
})
// END ModalCalcV3-1.js
