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


    function AddRemove_Active(){
        Iam.closest('.tabCalc-links').find('.tabCalc-link.active').removeClass('active');
        Iam.addClass('active');
    }

    function ShowHide_tabel(){
        Iam.closest('.tabCalc-wrap').find('.tabCalc-content.active').removeClass('active');
        Iam.closest('.tabCalc-wrap').find('.tabCalc-content').eq(Index).addClass('active');
    }

    function Print_Title_Modal(){
        Iam.closest('.JS_Section-Modal').find('.headeroutput-title').text(Title_Modal);
    }
}
