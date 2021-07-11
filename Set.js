$(document).ready(function() {

      let IndexT;
    const TABLINKS = $('#ElementModal .tabCalc-links .tabCalc-link');
    const SECTIONTABLES = $('#ElementModal .JS_Section-Tables .JS_Section-Table');

    $('.boxoutput-name').click(function() {
        DirectorSetConfig();
    })


    function DirectorSetConfig() {
        CheckAvailabilityInfo();
        if(CheckAvailabilityInfo() ) {
            SetActiveTab();
            SetLines();
            SetButtons();
            SetOutputs();
        }
        else {
            $('#ElementModal .JS_Section-Tables .JS_Section-Table').each(function(index) {
                $(this).find('.JS_Section-El:first').addClass('splash');
            })
            SwitchTabsInModal(TABLINKS.eq(2) );
        }
    }



    function CheckAvailabilityInfo() {
        if(arrActiveTabs[keyOfElement] == undefined) {
            return false;
        }
        else {
            return true;
        }
    }

    function SetActiveTab() {
        IndexT = arrActiveTabs[keyOfElement];
        SwitchTabsInModal(TABLINKS.eq(IndexT) );
    }

    function SetLines() {
        SECTIONTABLES.eq(IndexT).find('.JS_Section-El').each(function(index) {
            $(this).addClass(arrLinesClass[keyOfElement][index]);
        })
    }

    function SetButtons() {
        SECTIONTABLES.eq(IndexT).find('.JS_Button, .JS_RemoveJump, .JS_AddJump').each(function(index) {
            $(this).addClass(arrButtonsClass[keyOfElement][index]);
            $(this).val(arrButtonsVal[keyOfElement][index]);
            $(this).prop('disabled', arrButtonsAbility[keyOfElement][index]);
        })
        return;
    }

    function SetOutputs() {
        $('#ElementModal').find('.headeroutput-name, .headeroutput-scores, .lineoutput-scores').each(function(index) {
            $(this).text(arrOutputs[keyOfElement][index]);
        })
    }
})
