$(document).ready(function() {
    let Iam,
        buttonX,
        buttonGoe,
        scores,
        x,
        goe,
        bonusGoe,
        compare,
        fullscores;
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
        }
        buttonGoe.removeClass('active activeColor').val(0);
        DirectorMain();
    })
    $('#ElementModal .JS_Reset').click(function() {
        MakeTheName_Modal(0);
        arrScoresInMain[NameOfProperty]=0;
        arrNamesInMain[NameOfProperty]=$.extend(true, [], arrNameZero);
        buttonX.prop('disabled', true).removeClass('active activeColor');
        buttonGoe.removeClass('active activeColor').val(0);
        DirectorMain();
    })


    $('.JS_Section-Table .JS_X').click(function() {
        Iam=$(this);
        DirectorMain();
    })

    $(document).ready(function() {
        let Val_IamModal;

        $('.JS_Section-Table .JS_Goe').click(function() {
            Iam=$(this);
        })

        $('#GoeModal .JS_ButtonModal').click(function() {
            Val_IamModal=$(this).val();
            Iam.val(Val_IamModal);
            Iam.addClass('active activeColor');
            DirectorMain();
        })
    })


    function DirectorMain() {
        DirectorLine();
        CounterMain();
        PrinterMain();
    }

    function CounterMain() {
        fullscores=0;
        Iam.closest('.JS_Section-Table').find('.JS_Section-El').each(function(index) {
            Ich=$(this).find('.boxoutput-name');
            sectionINmain=$(this);
            GetID();
            MakeTheName_Modal(0);

            if(arrLineScores[NameOfProperty]==undefined){
                arrLineScores[NameOfProperty]=0;
            }
            fullscores=fullscores+arrLineScores[NameOfProperty];
        })
        return;
    }

    function PrinterMain() {
        Ich.closest('.JS_Section-Table').find('.tableoutput-scores').text(fullscores.toFixed(2));
    }

    //==============функции DirectorLine=====================
    function DirectorLine() {
        MakeTheName_Modal(0);
        CheckAvailabilityInfo();
        GetInfoX();
        GetGOE();
        CounterLIne();
        PrinterLine();
        return;
    }

    function CheckAvailabilityInfo() {
        if(arrNamesInMain[NameOfProperty]==undefined){
            arrScoresInMain[NameOfProperty]=0;
            arrNamesInMain[NameOfProperty]=$.extend(true, [], arrNameZero);
            arrLineScores[NameOfProperty]=0;
        }
        return;
    }

    function GetInfoX() {
        if(sectionINmain.find('.JS_X').hasClass('active')){
            x=1.1;
        }
        else {
            x=1;
        }
        return;
    }

    function GetGOE() {
        compare=0;
        bonusGoe=0;
        goe=sectionINmain.find('.JS_Goe').val();
        for(let i=0; i<arrScoresInMain[NameOfProperty].length; i++){
            if(arrScoresInMain[NameOfProperty][i]>compare){
                compare=arrScoresInMain[NameOfProperty][i];
            }
        }

        if(arrNamesInMain[NameOfProperty] =='ChSq1'){
            bonusGoe=0.5*goe;
        }
        else {
            bonusGoe=compare/10*goe;
        }
        return;
    }

    function CounterLIne() {
        scores=0;

        for(let i=0; i<arrScoresInMain[NameOfProperty].length; i++){
            scores=scores+arrScoresInMain[NameOfProperty][i];
        }
        scores=scores*x+bonusGoe;

        if(arrNamesInMain[NameOfProperty].length==2){
            let secondjump=arrNamesInMain[NameOfProperty][1].toLowerCase();
            CheckAxels(secondjump);
            if(CheckAxels(secondjump)){
                scores=scores*0.8;
                arrNamesInMain[NameOfProperty].push('SEQ');
            }
        }
        arrLineScores[NameOfProperty]=scores;

        return;
    }

    //=========проверка второго элемента - является ли он акселем==========
    function CheckAxels(secondjump){
        for (let i=0; i<arrOfAxels.length; i++){
            if(arrOfAxels[i]===secondjump){
            return true;
            }
        }
        return false;
    }
    //=========КОНЕЦ проверка второго элемента - является ли он акселем==========

    function PrinterLine() {
        sectionINmain.find('.lineoutput-scores').text(scores.toFixed(2));
        sectionINmain.find('.lineoutput-name').text(arrNamesInMain[NameOfProperty].join('+'));
    }
    //==============КОНЕЦ функции DirectorLine=====================
})
