$(document).ready(function() {

    let Iam,
        IamModal,
        IamSectionTable;
    let arrTemporaryClass=[];
    let arrTemporaryAble=[];
    let arrTemporaryVal=[];

    $('#ElementModal .JS_Save').click(function() {
        Iam=$(this);
        IamModal=$(this).closest('.JS_Section-Modal');
        IamSectionTable=IamModal.find('.JS_Section-Tables .JS_Section-Table');
        DirectorCompilingConfig()
    })

    function DirectorCompilingConfig() {
        MakeTheName_Modal();
        FindActiveTab();
        GetSectionInfo();
        GetButtonsInfo();
        GetOutputInfo();
    }

    function FindActiveTab() {
        IamModal.find('.tabCalc-links .tabCalc-link').each(function(index) {
            if($(this).hasClass('active')){
                arrActiveTabs[NameOfProperty]=index;
                IndexT=index;
                return;
            }
        })
    }

    function GetSectionInfo() {
        Cleaner_arrTemporaryClass();
        IamSectionTable.eq(IndexT).find('.JS_Section-El').each(function() {
            arrTemporaryClass.push($(this).attr('class'))
        })
        arrLinesClass[NameOfProperty]=$.extend(true, [], arrTemporaryClass);
        return;
    }

    function GetButtonsInfo() {
        Cleaner_arrTemporaryClass();
        Cleaner_arrTemporaryAble();
        Cleaner_arrTemporaryVal();
        IamSectionTable.eq(IndexT).find('.JS_Button, .JS_RemoveJump, .JS_AddJump').each(function(index) {

            if($(this).hasClass('activeColor')){
                arrTemporaryClass.push('active activeColor')
            }
            else {
                arrTemporaryClass.push('')
            }
            arrTemporaryAble.push($(this).prop('disabled'));
            arrTemporaryVal.push($(this).val())
        })
        arrButtonsClass[NameOfProperty]=$.extend(true, [], arrTemporaryClass);
        arrButtonsAbility[NameOfProperty]=$.extend(true, [], arrTemporaryAble);
        arrButtonsVal[NameOfProperty]=$.extend(true, [], arrTemporaryVal);
        return;
    }
    function GetOutputInfo() {
        Cleaner_arrTemporaryVal();
        IamModal.find('.headeroutput-name, .headeroutput-scores, .lineoutput-scores').each(function() {
            arrTemporaryVal.push($(this).val());
        })
        arrOutputs[NameOfProperty]=$.extend(true, [], arrTemporaryVal);
    }

    function Cleaner_arrTemporaryClass() {
        arrTemporaryClass.splice(0, arrTemporaryClass.length);
        return;
    }
    function Cleaner_arrTemporaryAble() {
        arrTemporaryAble.splice(0, arrTemporaryAble.length);
        return;
    }
    function Cleaner_arrTemporaryVal() {
        arrTemporaryVal.splice(0, arrTemporaryVal.length);
        return;
    }

})
