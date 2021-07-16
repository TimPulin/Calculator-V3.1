// Director.js
//======================ГЛОБАЛЬНЫЕ служебные функции======================

let ID,
    INDEX_ActiveTab,
    keyOfElement;

let arrActiveTabs = {};
let arrButtonsClass = {};
let arrButtonsVal = {};
let arrLinesClass = {};
let arrButtonsAbility = {};
let arrOutputs = {};

$(document).ready(function () {
    $('.JS_Section-Table').find('.boxoutput-name, .JS_Goe, .JS_X').click(function() {
        GetID($(this) );
        MakeKeyOfElement();
    })
})

function GetID(here) {
    ID = here.closest('.JS_Section-Table').find('.JS_Section-El').index(here.closest('.JS_Section-El') );
}

function MakeKeyOfElement() {
    keyOfElement = `Element${ID+1}`;
}

const BUTTON_EU = $('#jumps .JS_ButtonModal[value="Eu"]'),
      BUTTON_A = $('#jumps .JS_ButtonModal[value="A"]'),
      BUTTON_ROTATION = $('#ElementModal .JS_Section-Tables .JS_Section-Table:eq(2) .JS_Section-El:eq(1) .JS_Rotation'),
      BUTTON_CHSQ = $('#steps .JS_ButtonModal[value="ChSq"]'),
      BUTTON_STEPLEVEL = $('#ElementModal .JS_Section-Tables .JS_Section-Table:eq(0) .JS_Level');


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
}

function Hide_HeadersSections(Iam) {
    Iam.closest('.JS_Section-Modal').find('.mod-header .JS_Section.active').removeClass('active');
}

function SwitchTabsInModal(Iam) {
        let Index,
            Title_Modal;

        Index = Iam.closest('.tabCalc-links').find('.tabCalc-link').index(Iam);
        Title_Modal = Iam.val();
        AddRemove_Active();
        ResetModal(Iam);
        ShowHide_tabel ();
        ShowHeader();
        Print_Title_Modal();


    function AddRemove_Active() {
        Iam.closest('.tabCalc-links').find('.tabCalc-link.active').removeClass('active');
        Iam.addClass('active');
    }

    function ShowHide_tabel() {
        Iam.closest('.tabCalc-wrap').find('.tabCalc-content.active').removeClass('active');
        Iam.closest('.tabCalc-wrap').find('.tabCalc-content').eq(Index).addClass('active');
    }

    function Print_Title_Modal() {
        Iam.closest('.JS_Section-Modal').find('.headeroutput-title').text(Title_Modal);
    }
} //END SwitchTabsInModal


//======================КОНЕЦ ГЛОБАЛЬНЫЕ служебные функции======================

//======================сброс массивов представлления одной линии==============================
$(document).ready(function() {
    $('#ElementModal .JS_Reset').click(function(){
        ResetModalArrs();
        Reset_ElementObject(ProgramsElements[keyOfElement]);
    })

    function ResetModalArrs() {
        delete arrActiveTabs[keyOfElement];
        delete arrButtonsClass[keyOfElement];
        delete arrButtonsVal[keyOfElement];
        delete arrLinesClass[keyOfElement];
        delete arrButtonsAbility[keyOfElement];
        delete arrOutputs[keyOfElement];
    }
})
//===================КОНЕЦ сброс массивов одной линии===================

//==================сброс массивов всей таблицы============================
$(document).ready(function() {
    let section = $('#MainTable');

    $('#MainTable .JS_Reset').click(function() {
        ResetAllArrs();
        CleanUpMainTable();
        section.find('.JS_Section-El').each(function(index) {
            Reset_ElementObject(ProgramsElements[`Element${index+1}`])
        })
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
        section.find('.lineoutput-name').val('');
        section.find('.JS_X').removeClass('active activeColor').prop('disabled', true);
        section.find('.JS_Goe').val(0).removeClass('active activeColor');
        section.find('.lineoutput-scores, .tableoutput-scores').val('0.00');
    }
}) //==================КОНЕЦ сброс массивов всей таблицы============================

function Reset_ElementObject(currentObject) {
            currentObject.value1 = 0;
            currentObject.value2 = 0;
            currentObject.value3 = 0;
            currentObject.name1 = '';
            currentObject.name2 = '';
            currentObject.name3 = '';
            currentObject.goe = 0;
            currentObject.halfPartBonus = 1;
}
// END Director.js
