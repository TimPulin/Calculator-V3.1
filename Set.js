// Set.js
$(document).ready(function() {

      let IndexT;
    const TABLINKS = $('#ElementModal .tabCalc-links .tabCalc-link');
    const SECTIONTABLES = $('#ElementModal .JS_Section-Tables .JS_Section-Table');

    $('.boxoutput-name').click(function() {
        DirectorSetConfig();
    })


    function DirectorSetConfig() {
        if(CheckAvailabilityInfo() ) {
            SetActiveTab();
            SetLines();
            SetButtons();
            SetOutputs();
        }
        else {
            $('.JS_AddJump').removeClass('splash');
            SECTIONTABLES.each(function() {
                $(this).find('.JS_Section-El:first').addClass('splash');
            })
            SwitchTabsInModal(TABLINKS.eq(2) );
        }
    }

    function CheckAvailabilityInfo() {
        return arrActiveTabs[keyOfElement] == undefined ? false : true;
    }

    function SetActiveTab() {
        IndexT = arrActiveTabs[keyOfElement];
        SwitchTabsInModal(TABLINKS.eq(IndexT) );
    }

    function SetLines() {
        SECTIONTABLES.eq(IndexT).find('.JS_Section-El').each(function(index) {
            $(this).addClass(arrLinesClass[keyOfElement][index]);
        })
        SECTIONTABLES.eq(IndexT).find('.JS_Section-El:first').removeClass('splash');
    }

    function SetButtons() {
        SECTIONTABLES.eq(IndexT).find('.JS_Button, .JS_RemoveJump, .JS_AddJump').each(function(index) {
            $(this).addClass(arrButtonsClass[keyOfElement][index]);
            $(this).val(arrButtonsVal[keyOfElement][index]);
            $(this).prop('disabled', arrButtonsAbility[keyOfElement][index]);
        })
    }

    function SetOutputs() {
        $('#ElementModal').find('.headeroutput-name, .headeroutput-scores, .lineoutput-scores').each(function(index) {
            $(this).text(arrOutputs[keyOfElement][index]);
        })
    }
})
// END Set.js
