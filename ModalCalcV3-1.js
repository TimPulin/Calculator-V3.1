
$(document).ready(function() {

    let Iam,
        currentLine,
        linescores;

    $('.JS_Name, .JS_Level, .JS_Rotation').click(function() {
        Iam=$(this);
    })

    $('.tabCalc-link').click(function() {
        CleanerModalArrs();
    })

//=============================перенос информации с экрана выбора значения атрибута элемента
    $(document).ready(function () {
        let Val_ButtonModal;

       $('#ElementModal .JS_ButtonModal').click(function() {
            Val_ButtonModal=$(this).val();
            AddInLine_ValButtonModal();
            CheckClass();
            DirectorModal();
        })

        function AddInLine_ValButtonModal() {
            Iam.val(Val_ButtonModal);
            Iam.addClass('active activeColor');
            return
        }

        function CheckClass() {
            if( Iam.hasClass('JS_Name') ) {
                Iam.closest('.JS_Section-El').find('.JS_Level, .JS_Rotation').addClass('active activeColor');
                if (Val_ButtonModal=='Eu'){
                    BUTTON_ROTATION.val(1);
                }
                else if(Val_ButtonModal=='ChSq'){
                    BUTTON_STEPLEVEL.val(1);
                }
            }
            return;
        }
    })
//=============================КОНЕЦ перенос информации с экрана выбора значения атрибута элемента

    $('#ElementModal .JS_Fly, #ElementModal .JS_ChangeLeg').click(function() {
        Iam=$(this);
        if(!$('#ElementModal .JS_Fly').hasClass('active') && !$('#ElementModal .JS_ChangeLeg').hasClass('active')){
            $('#ElementModal .JS_V').removeClass('active activeColor');
        }
        DirectorModal();
    })

    $('#ElementModal').find('.JS_V, .JS_Galka, .JS_Edge, .JS_RemoveJump').click(function() {
        Iam=$(this);
        DirectorModal();
    })

    $('#ElementModal .JS_Save').click(function() {
        Iam=$('.tabCalc-content.active .JS_Button:first');
        DirectorModal();
    })

    function DirectorModal() {
        DirectorLine();
    }


    function CleanerModalArrs() {

    }

    //================все функции DirectorLine=====================
    function DirectorLine() {
        GetCurrentLineAndIndex();
        GetLineName();
        ProgramsElements.ElementInModal1.MakeLinesInfo();
        PrintLineScores();
        // removeClass_Splash();
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
            currentLine.removeClass('splash'); //убираем класс анимации!!!
        }
    }

    function PrintLineScores() {
        currentLine.find('.lineoutput-scores').text(ProgramsElements.ElementInModal1.SendLinesScores().toFixed(2) );
        return;
    }
    //================КОНЕЦ все функции DirectorLine=====================

})
