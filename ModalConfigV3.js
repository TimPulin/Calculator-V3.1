//===============ФОРМИРОВАНИЕ ВИДА МОДАЛЬНОГО ОКНА==============
$(document).ready(function() {
    let Iam,
        section,
        ID,
        IndexT,
        NameOfProperty;
    let arrActiveTabs={};
    let arrButtonsClass={};


    $('.boxoutput-name').click(function() {
        Iam=$(this);
        section=$(this).closest('.JS_Section-El');
        DirectorSetConfig();
    })

    $('#ElementModal .JS_Save').click(function() {
        Iam=$(this);
        DirectorCompilingConfig()
    })

    //==================DirectorSetConfig установка параметров открытого модального окна=======================
    function DirectorSetConfig() {
        GetID();
        Iam=$('#ElementModal .tabCalc-link.active');
        ResetModal(Iam);
        SetActiveTab();
        SetButtons();
    }
    function GetID() {
        ID=Iam.closest('.JS_Section-Table').find('.JS_Section-El').index(section);
        return;
    }

    function SetActiveTab() {
        MakeTheName_Modal(0);
        IndexT=arrActiveTabs[NameOfProperty];
        Iam.closest('.tabCalc-links').find('.tabCalc-link').eq(IndexT).click();
    }

    function SetButtons() {
        Iam.closest('.JS_Section-Tables').find('.JS_Section-Table:not(.hide) .JS_Button').each(function(index) {
            MakeTheName_Modal(index);
            $(this).addClass(arrButtonsClass[NameOfProperty]);
        })
        return;
    }
    //==================КОНЕЦ SetConfig установка параметров открытого модального окна=======================


    //==========================CompilingConfig сбор информации об открытом модальном окне===========================
    function DirectorCompilingConfig() {
        sectionmodal=Iam.closest('.JS_Section-modal')
        FindActiveTab();
        GetButtonsInfo();

    }

    //=====поиск активной вкладки====
    function FindActiveTab() {
        sectionmodal.find('.tabCalc-links .tabCalc-link').each(function(index) {
            if($(this).hasClass('active')){
                MakeTheName_Modal(0);
                IndexT=index;
                arrActiveTabs[NameOfProperty]=IndexT;
                return;
            }
            return;
        })
    }
    //=====КОНЕЦ поиск активной вкладки====

    //=====определение состояния кнопок====
    function GetButtonsInfo() {
        sectionmodal.find('.JS_Section-Tables .JS_Section-Table').eq(IndexT).find('.JS_Button').each(function(index) {
            MakeTheName_Modal(index);
            if($(this).hasClass('activeColor')){
                arrButtonsClass[NameOfProperty]='active activeColor';
            }
            else {
                arrButtonsClass[NameOfProperty]='';
            }
        })
        return;
    }
    //=====КОНЕЦ определение состояния кнопок====

    //==========================КОНЕЦ CompilingConfig сбор информации об открытом модальном окне===========================

    //====создание имени====
    function MakeTheName_Modal(index) {
        NameOfProperty=ID+'line'+index;
        return;
    }
    //====КОНЕЦ создание имени====
})
//===============КОНЕЦ ФОРМИРОВАНИЕ ВИДА МОДАЛЬНОГО ОКНА==============
