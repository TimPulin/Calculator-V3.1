$(document).ready(function(){

    let Iam,
        buttonX,
        buttonGoe,
        section;
    let arrNameZero=[''];

    $('.boxoutput-name').click(function() {
        Iam=$(this);
        buttonX=$(this).closest('.JS_Section-El').find('.JS_X');
        buttonGoe=$(this).closest('.JS_Section-El').find('.JS_Goe');
    })

    $('#ElementModal .JS_Save').click(function(){
        if(IndexT==2){
            buttonX.prop('disabled', false);
        }
        else {
            buttonX.prop('disabled', true).removeClass('active activeColor');
            ProgramsElements[keyOfElement].halfPartBonus = 1;
        }
        buttonGoe.removeClass('active activeColor').val(0);
        ProgramsElements[keyOfElement].goe=0;
        DirectorMain();
    })

    $('#ElementModal .JS_Reset').click(function() {
        MakeTheName_Modal();
        arrScoresInMain[NameOfProperty]=0;
        arrNamesInMain[NameOfProperty]=$.extend(true, [], arrNameZero);
        buttonX.prop('disabled', true).removeClass('active activeColor');
        buttonGoe.removeClass('active activeColor').val(0);
        DirectorMain();
    })

    //Работа с кнопкой Goe
    $('.JS_Section-Table .JS_Goe').click(function() {
        Iam=$(this);
    })
    $('#GoeModal .JS_ButtonModal').click(function() {
        ProgramsElements[keyOfElement].goe=$(this).val();
        Iam.val(ProgramsElements[keyOfElement].goe)
        ProgramsElements[keyOfElement].goe == 0 ? Iam.removeClass('active activeColor') : Iam.addClass('active activeColor');
        DirectorMain();
    })

    //Работа с кнопкой Х
    $('.JS_Section-Table .JS_X').click(function() {
        Iam=$(this);
        $(this).toggleClass('active activeColor');
        $(this).hasClass('active') ? ProgramsElements[keyOfElement].halfPartBonus = 1.1 : ProgramsElements[keyOfElement].halfPartBonus = 1;
        DirectorMain();
    })


    function DirectorMain() {
        RenderingLine();
        RenderingFullScores(CalcFullScores());
    }

    function RenderingLine() {
        section=Iam.closest('.JS_Section-El')
        section.find('.lineoutput-name').text(ProgramsElements[keyOfElement].makeNameOfElement())
        section.find('.lineoutput-scores').text(ProgramsElements[keyOfElement].calcValueOfElement().toFixed(2))
    }

    function CalcFullScores() {
        let keyOfElement
        let fullscores = 0;
        $('#MainTable').find('.JS_Section-El').each(function(index){
            keyOfElement = `Element${index+1}`;
            fullscores += ProgramsElements[keyOfElement].calcValueOfElement();
        })
        return fullscores;
    }

    function RenderingFullScores(fullscores) {
        $('#MainTable').find('.tableoutput-scores').text(fullscores.toFixed(2))
    }
})
