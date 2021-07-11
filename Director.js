//======================ГЛОБАЛЬНЫЕ служебные функции======================

let ID,
    Ich, // Удалить после проверки
    IndexT,
    NameOfProperty, // Удалить после проверки
    sectionInMain, // Удалить после проверки
    keyOfElement;

let arrActiveTabs={};
let arrButtonsClass={};
let arrButtonsVal={};
let arrLinesClass={};
let arrButtonsAbility={};
let arrOutputs={};


$(document).ready(function () {
    $('.JS_Section-Table').find('.boxoutput-name, .JS_Goe, .JS_X').click(function() {
        Ich=$(this); // Удалить после проверки
        sectionInMain=$(this).closest('.JS_Section-El');
        GetID($(this));
        MakeKeyOfElement();
    })
})

function GetID(here) {
    ID = here.closest('.JS_Section-Table').find('.JS_Section-El').index(sectionInMain);
    return;
}

function MakeKeyOfElement() {
    keyOfElement = `Element${ID+1}`;
    return;
}

//====создание имени====
function MakeTheName_Modal() {
    NameOfProperty = 'line'+ID+1;
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
    section = Iam.closest('.JS_Section-Modal');
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
        MakeTheName_Modal();
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
    let section=$('#MainTable');
    $('#MainTable .JS_Reset').click(function() {
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
    }

    function CleanUpMainTable() {
        let keyOfElement;

        section.find('.lineoutput-name').val('');
        section.find('.JS_X').removeClass('active activeColor').prop('disabled', true);
        section.find('.JS_Goe').val(0).removeClass('active activeColor');
        section.find('.lineoutput-scores, .tableoutput-scores').val('0.00');

        section.find('.JS_Section-El').each(function(index){
            keyOfElement = `Element${index+1}`;

            ProgramsElements[keyOfElement].value1 = 0;
            ProgramsElements[keyOfElement].value2 = 0;
            ProgramsElements[keyOfElement].value3 = 0;
            ProgramsElements[keyOfElement].goe = 0;
            ProgramsElements[keyOfElement].halfPartBonus = 1;
        })
    }
})

//==================КОНЕЦ сброс массивов всей таблицы============================
