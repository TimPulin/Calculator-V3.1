//======================ГЛОБАЛЬНЫЕ служебные функции======================

let ID,
    Ich,
    IndexT,
    NameOfProperty,
    sectionINmain;

let arrActiveTabs={};
let arrButtonsClass={};
let arrButtonsVal={};
let arrLinesClass={};
let arrButtonsAbility={};
let arrOutputs={};

let arrNamesInMain={};
let arrScoresInMain={};
let arrLineScores={};

$(document).ready(function () {
    $('.JS_Section-Table').find('.boxoutput-name, .JS_Goe, .JS_X').click(function() {
        Ich=$(this);
        sectionINmain=$(this).closest('.JS_Section-El');
        GetID();
    })
})




function GetID() {
    ID=Ich.closest('.JS_Section-Table').find('.JS_Section-El').index(sectionINmain);
    return;
}

//====создание имени====
function MakeTheName_Modal(index) {
    NameOfProperty='line'+ID+1+'_index'+index;
    return;
}
//====КОНЕЦ создание имени====

const BUTTON_EU=$('#jumps .JS_ButtonModal[value="Eu"]'),
      BUTTON_A=$('#jumps .JS_ButtonModal[value="A"]'),
      BUTTON_ROTATION=$('#ElementModal .JS_Section-Tables .JS_Section-Table:eq(2) .JS_Section-El:eq(1) .JS_Rotation'),
      BUTTON_CHSQ=$('#steps .JS_ButtonModal[value="ChSq"]'),
      BUTTON_STEPLEVEL=$('#ElementModal .JS_Section-Tables .JS_Section-Table:eq(0) .JS_Level');


function ResetModal(Iam) {
    let section;
    section=Iam.closest('.JS_Section-Modal');
    ResetButtons(section);
    Hide_HeadersSections(Iam);

    ShowHeader();
    $('#ElementModal').find('.JS_Section-Table .JS_Section-El').not(':only-child').not(':first').removeClass('active');
    section.find('.headeroutput-name').val('');
    section.find('.headeroutput-scores').val('0.00');
    $('#ElementModal').find('.JS_RemoveJump, .JS_AddJump').prop('disabled', true);
    return;
}
function ResetButtons(section) {
    section.find('.JS_Button').removeClass('active activeColor');
    section.find('.JS_Name').val('элемент');
    section.find('.JS_Level').val('B').prop('disabled', false);
    section.find('.JS_Rotation').val('1').prop('disabled', false);
    $('#ElementModal .JS_V').prop('disabled', true);
    section.find('.lineoutput-scores').text('0.00');
    section.find('.JS_Edge').prop('disabled', true);

}

function ShowHeader() {
    $('#header_title').addClass('active');
    return ;
}
function Hide_HeadersSections(Iam) {
    Iam.closest('.JS_Section-Modal').find('.mod-header .JS_Section.active').removeClass('active');
    return;
}
//======================КОНЕЦ ГЛОБАЛЬНЫЕ служебные функции======================

//======================сброс массивов одной линии==============================
$(document).ready(function() {
    $('#ElementModal .JS_Reset').click(function(){
        MakeTheName_Modal(0);
        ResetModalArrs();
    })

    function ResetModalArrs() {
        delete arrActiveTabs[NameOfProperty];
        delete arrButtonsClass[NameOfProperty];
        delete arrButtonsVal[NameOfProperty];
        delete arrLinesClass[NameOfProperty];
        delete arrButtonsAbility[NameOfProperty];
        delete arrOutputs[NameOfProperty];
    }
})

//===================КОНЕЦ сброс массивов одной линии===================

//==================сброс массивов всей таблицы============================
$(document).ready(function() {
    let section;
    $('#MainTable .JS_Reset').click(function() {
        section=$(this).closest('.JS_Section-Table');
        ResetAllArrs();
        CleanUpMainTable();
    })

    function ResetAllArrs() {
        for (key in arrActiveTabs){
            delete arrActiveTabs[key];
        }
        for (key in arrButtonsClass){
            delete arrButtonsClass[key];
        }
        for (key in arrButtonsVal){
            delete arrButtonsVal[key];
        }
        for (key in arrLinesClass){
            delete arrLinesClass[key];
        }
        for (key in arrButtonsAbility){
            delete arrButtonsAbility[key];
        }
        for (key in arrOutputs){
            delete arrOutputs[key];
        }
        for (key in arrNamesInMain){
            delete arrNamesInMain[key];
        }
        for (key in arrScoresInMain){
            delete arrScoresInMain[key];
        }
        for (key in arrLineScores){
            delete arrLineScores[key];
        }
        return;
    }

    function CleanUpMainTable() {
        section.find('.lineoutput-name').val('');
        section.find('.JS_X').removeClass('active activeColor').prop('disabled', true);
        section.find('.JS_Goe').val(0).removeClass('active activeColor');
        section.find('.lineoutput-scores, .tableoutput-scores').val('0.00');
    }
})

//==================КОНЕЦ сброс массивов всей таблицы============================
