// Compiling.js
$(document).ready(function() {

    let Iam,
        IamModal,
        IamSectionTable;
    let arrTemporaryClass = [];
    let arrTemporaryAble = [];
    let arrTemporaryVal = [];

    $('#ElementModal .JS_Save').click(function() {
        Iam = $(this);
        IamModal = $(this).closest('.JS_Section-Modal');
        IamSectionTable = IamModal.find('.JS_Section-Tables .JS_Section-Table');
        DirectorCompilingConfig()
    })

    function DirectorCompilingConfig() {
        FindActiveTab();
        GetSectionInfo();
        GetButtonsInfo();
        GetOutputInfo();
    }

    function FindActiveTab() {
        IamModal.find('.tabCalc-links .tabCalc-link').each(function(index) {
            if($(this).hasClass('active') ) {
                arrActiveTabs[keyOfElement] = index;
                INDEX_ActiveTab = index;
                return;
            }
        })
    }

    function GetSectionInfo() {
        Cleaner_arrTemporaryClass();
        IamSectionTable.eq(INDEX_ActiveTab).find('.JS_Section-El').each(function() {
            arrTemporaryClass.push($(this).attr('class') )
        })
        arrLinesClass[keyOfElement] = $.extend(true, [], arrTemporaryClass);
    }

    function GetButtonsInfo() {
        Cleaner_arrTemporaryClass();
        Cleaner_arrTemporaryAble();
        Cleaner_arrTemporaryVal();
        IamSectionTable.eq(INDEX_ActiveTab).find('.JS_Button, .JS_RemoveJump, .JS_AddJump').each(function(index) {

            if($(this).hasClass('activeColor') ) {
                arrTemporaryClass.push('active activeColor');
            }
            else {
                arrTemporaryClass.push('');
            }
            arrTemporaryAble.push($(this).prop('disabled') );
            arrTemporaryVal.push($(this).val() );
        })
        arrButtonsClass[keyOfElement] = $.extend(true, [], arrTemporaryClass);
        arrButtonsAbility[keyOfElement] = $.extend(true, [], arrTemporaryAble);
        arrButtonsVal[keyOfElement] = $.extend(true, [], arrTemporaryVal);
    }

    function GetOutputInfo() {
        Cleaner_arrTemporaryVal();
        IamModal.find('.headeroutput-name, .headeroutput-scores, .lineoutput-scores').each(function() {
            arrTemporaryVal.push($(this).val() );
        })
        arrOutputs[keyOfElement] = $.extend(true, [], arrTemporaryVal);
    }

    function Cleaner_arrTemporaryClass() {
        arrTemporaryClass.splice(0, arrTemporaryClass.length);
    }

    function Cleaner_arrTemporaryAble() {
        arrTemporaryAble.splice(0, arrTemporaryAble.length);
    }

    function Cleaner_arrTemporaryVal() {
        arrTemporaryVal.splice(0, arrTemporaryVal.length);
    }
})
// END Compiling.js
