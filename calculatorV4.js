$(document).ready(function() {

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

    // classoflineobject.js
    class Element {

        constructor(){
            this.nameOfElement = ''
            this.name1 = ''
            this.name2 = ''
            this.name3 = ''
            this.value1 = 0
            this.value2 = 0
            this.value3 = 0
            this.goe = 0
            this.halfPartBonus = 1
        }

        makeNameOfElement() {
            this.nameOfElement = this.name1
            if(this.checkAxels(this.name2.toLowerCase() ) ) {
                this.nameOfElement += `+${this.name2}+SEQ`
                return this.nameOfElement
            }
            for (let i = 2; i <= 3; i++) {
                if(this['name'+i] != '')  {
                    this.nameOfElement += ('+' + this['name'+i]);
                }
            }
                return this.nameOfElement
        } // END makeNameOfElement()

        // ============== Вычисление стоимости элемента ========================
        calcValueOfElement() {
            return this.calcBaseValue() * this.halfPartBonus + this.calcGoeBonus()
        }

        calcBaseValue() {
            if(this.checkAxels(this.name2.toLowerCase() ) ) {
                return (this.value1 + this.value2) * 0.8;
            }
                return this.value1 + this.value2 + this.value3;
        } // END calcBaseValue()

        calcGoeBonus(){
            if(this.makeNameOfElement() == 'ChSq1') {
                return 0.5*this.goe;
            }
            else {
                let compare = 0;
                for (let i = 1; i <= 3; i++) {
                    if (this[`value${i}`] > compare) {
                        compare = this['value' + i];
                    }
                }
                return compare / 10 * this.goe;
            }
        } // END calcGoeBonus()

        checkAxels(secondjump) {
            for (let i = 0; i < arrOfAxels.length; i++) {
                if(arrOfAxels[i] === secondjump) {
                    return true;
                }
            }
                    return false;
        }
        // ================== END Вычисление стоимости элемента ===================================
    } // END class Element{}

    class ElementInModal extends Element {
        constructor() {
            super()
            this.linename = ''
            this.currentLine_Index = 0
        }

        CheckValidName() {
            return list_value[this.linename.toLowerCase() ] == undefined ? false : true;
        }

        MakeLinesInfo() {
            this.CheckValidName() == true ? this.SetLinesInfo() : this.ResetToZeroLinesInfo();
        }

        SetLinesInfo() {
            this[`value${this.currentLine_Index + 1}`] = list_value[ this.linename.toLowerCase() ];
            this[`name${this.currentLine_Index + 1}`] = ProgramsElements.ElementInModal1.linename;
        }

        ResetToZeroLinesInfo() {
            this[`value${this.currentLine_Index + 1}`] = 0;
            this[`name${this.currentLine_Index + 1}`] = '';
            ProgramsElements.ElementInModal1.linename = '';
        }

        ResetToZeroAllModalInfo() {
            this.linename = '';
            this.nameOfElement = '';
            for(let i = 1; i <= 3; i++) {
                this[`value${i}`] = 0;
                this[`name${i}`] = '';
            }
        }

        SendLinesScores() {
            return this[`value${this.currentLine_Index + 1}`]
        }
    }// END class ElementInModal{}

    let ProgramsElements = {
        Element1 : new Element(),
        Element2 : new Element(),
        Element3 : new Element(),
        Element4 : new Element(),
        Element5 : new Element(),
        Element6 : new Element(),
        Element7 : new Element(),
        Element8 : new Element(),
        Element9 : new Element(),
        Element10 : new Element(),
        Element11 : new Element(),
        Element12 : new Element(),
        ElementInModal1 : new ElementInModal()
    }
    // END classoflineobject.js

    // ModalWorkV3.js
    //==================вызов и закрытие модального окна======================
    $(document).ready(function() {
        let Iam;

        jQuery('.boxoutput-name').click(function(){
            $('#ElementModal').modal();
        });

        $('#ElementModal .JS_Save').click(function() {
             HideModal();
        })
        $('#ElementModal .JS_Reset').click(function() {
            HideModal();
            ResetModal($(this) );
        })

        function HideModal() {$('#ElementModal').modal('hide');}

        $('.JS_Goe').click(function() {
            $('#GoeModal').modal();
        })
        $('#GoeModal .JS_ButtonModal').click(function() {
             $('#GoeModal').modal('hide');
        })
    })
    //======================КОНЕЦ вызов и закрытие модального окна======================


    //===========================ПОВЕДЕНИЕ КНОПОК=========================================

    //========================Переключение вкладок в модальном окне==
        $('.tabCalc-link').click(function() {
            SwitchTabsInModal($(this) );
        })
    //========================КОНЕЦ Переключение вкладок в модальном окне==

    //====================вызов экрана для выбора значения атрибута элемента==========
    $(document).ready(function() {
        let Iam,
            Val_Iam,
            ID;

        $('.JS_Goe').click(function() {
            Val_Iam = $(this).val();
            ID = '#'+$(this).attr('name');
            addClassActiveTo_JS_ButtonModal();
        })

        $('.JS_Name, .JS_Level, .JS_Rotation').click(function() {
            Iam = $(this);
            Val_Iam = $(this).val();
            ID = '#'+Iam.attr('name');
            Hide_CurrentHeadersSection();
            ToggleHeaderSection();
            CheckClass() == true ? ShowHeader() : addClassActiveTo_JS_ButtonModal();
        })

        function Hide_CurrentHeadersSection() {
            Iam.closest('.JS_Section-Modal').find('.mod-header .JS_Section').not($(ID) ).removeClass('active');
        }

        function ToggleHeaderSection() {
            $(ID).toggleClass('active');
        }

        function CheckClass() {
            return !$(ID).hasClass('active') ? true : false;
        }

        function addClassActiveTo_JS_ButtonModal() {
            $(ID).find(".JS_ButtonModal").each(function(index) {
                jQuery(this).removeClass('active activeColor');
                if(Val_Iam == jQuery(this).val() ){
                    jQuery(this).addClass('active activeColor');
                }
            })
        }
    }) //====================КОНЕЦ вызов экрана для выбора значения атрибута элемента==========

    //=======================закрытие экранов "выбор значения атрибута элемента" и открытие заголовка модульного окна=======
    $(document).ready(function () {
        $('.JS_Fly, .JS_ChangeLeg, .JS_V, .JS_Galka, .JS_Edge').click(function() {
            Hide_HeadersSections($(this) );
            ShowHeader();
        })
    }) //=======================КОНЕЦ закрытие экранов "выбор значения атрибута элемента"=======

    //===============================активация кнопок при выборе значения атрибута==========
    $(document).ready(function() {
        let Iam;

        $('.JS_Fly, .JS_ChangeLeg, .JS_V, .JS_Edge').click(function() {
            $(this).toggleClass('active activeColor');

        })

        $('.JS_Galka').click(function() {
            Iam = $(this);
            Iam.toggleClass('active activeColor');
            Iam.parent().find('.JS_Galka').not(Iam).each(function() {
                jQuery(this).removeClass('active activeColor');
            })
        })
    })

    $(document).ready(function() {
        $('.JS_Level, .JS_Rotation').click(function() {
            $(this).addClass('active activeColor');
        })
    })
    //===============================КОНЕЦ поведение кнопок при выборе значения атрибута==========

    //=====================работа кнопок на экране для выбора значения атрибута элемента====
    $(document).ready(function(){

        $('#GoeModal .JS_ButtonModal').click(function() {
            AddRemove_Active($(this) );
        })

        $('#ElementModal .JS_ButtonModal').click(function() {
            AddRemove_Active($(this) );
            Hide_HeadersSections($(this) );
            ShowHeader();
        })

        function AddRemove_Active(Iam) {
            Iam.closest('.JS_Section').find('.JS_ButtonModal').each(function() {
                jQuery(this).removeClass('active activeColor');
            })
            Iam.addClass('active activeColor');
        }
    }) //=====================КОНЕЦ работа кнопок на экране для выбора значения атрибута элемента====

    //========================добавление/удаление прыжка в модальном окне==================
        //ДОЛЖНО БЫТЬ ВЫШЕ @разблокировка кнопок "добавить прыжок"@
    $(document).ready(function() {
        let section;

          $('#ElementModal .JS_AddJump').click(function() {
              $(this).closest('.JS_Section-Table').find('.JS_Section-El:not(.active):first').addClass('active splash');
              Hide_HeadersSections($(this) );
              ShowHeader();
          })
          $('#ElementModal .JS_RemoveJump').click(function() {
              section = $(this).closest('.JS_Section-Table').find('.JS_Section-El.active:last');
              ResetButtons(section);
              Hide_HeadersSections($(this) );
              ShowHeader();
          })
    }) //=========================КОНЕЦ добавление/удаление прыжка в модальном окне==================



    //======================Блокировка/Разблокировка кнопок==================================================
    $(document).ready(function () {

        //==блокировка/разблокировка кнопки "E"
        $(document).ready(function() {
            let section;
            let button;

            $('.JS_Name').click(function() {
                section = $(this).closest('.JS_Section-El');
            })
            $('#jumps .JS_ButtonModal[value="F"], #jumps .JS_ButtonModal[value="Lz"]').click(function() {
                section.find('.JS_Edge').prop('disabled', false);
            })
            $('#jumps .JS_ButtonModal:not(.JS_ButtonModal[value="F"], .JS_ButtonModal[value="Lz"])').click(function() { //было так: #jumps .JS_ButtonModal[value="Lz"]
                button = section.find('.JS_Edge');
                button.removeClass('active activeColor');
                button.prop('disabled', true);
            })
        }) //==КОНЕЦ блокировка/разблокировка кнопки "E"

        $(document).ready(function(){
            let amount, //переменная используется для кнопок "добавить/удалить прыжок" и кнопки "Eu"
                Index_ActiveSection;
            const BTN_AddJump = $('#ElementModal .JS_AddJump');
            const BTN_RemoveJump = $('#ElementModal .JS_RemoveJump');

            //===блокировка/разблокировка кнопок "добавить прыжок" и "удалить прыжок"
            $(document).ready(function() {
                let Iam;

                $('#ElementModal .JS_Name').click(function() {
                    Iam = $(this);
                })
                $('#jumps .JS_ButtonModal:not(.JS_ButtonModal[value="A"])').click(function() {
                    CheckAmountLinesHide();
                    if(amount < 3){
                        UnlockBTN_AddJump();
                    }
                })
                BTN_RemoveJump.click(function () {
                    Iam = $(this);
                    CheckAmountLinesHide();
                    if(amount < 3){
                        UnlockBTN_AddJump();
                    }
                })

                BTN_RemoveJump.click(function () {
                    Iam = $(this);
                    CheckAmountLinesHide();
                    if(amount < 2){
                        $(this).prop('disabled', true);
                    }
                })

                BTN_AddJump.click(function () {
                   LockBTN_AddJump();
                    BTN_RemoveJump.prop('disabled', false);
                })

                 //блокировка/разблокировка кнопки "добавить прыжок" в зависимости от кнопки "A"
                 BUTTON_A.click(function() {
                     if(Index_ActiveSection == 1) {
                         if(amount == 3) {
                             BTN_RemoveJump.trigger('click');
                         }
                         LockBTN_AddJump();
                     }else {
                         UnlockBTN_AddJump();
                    }
                 }) //КОНЕЦ блокировка/разблокировка кнопки "добавить прыжок" в зависимости от кнопки "A"

                function CheckAmountLinesHide() {
                    amount = $(Iam).closest('.JS_Section-Table').find('.JS_Section-El.active').length;
                }
            }) //===КОНЕЦ блокировка/разблокировка кнопок "добавить прыжок" и "удалить прыжок"

            function UnlockBTN_AddJump() {
                BTN_AddJump.prop('disabled', false);
                BTN_AddJump.addClass('splash');
            }

            function LockBTN_AddJump() {
                BTN_AddJump.prop('disabled', true);
                BTN_AddJump.removeClass('splash');
            }

            //====================блокировка/разблокировка кнопок   в секции "прыжки"===========
           $(document).ready(function() {
                let Index_ActiveTab,
                    section,
                    table;
                const NAMESECONDLINE = $('.JS_Section-Table:eq(2) .JS_Section-El:eq(1) .JS_Name'),
                      BUTTONSJUMPS = $('#jumps .JS_ButtonModal');


                //представление кнопок выбора атрибута прыжка в секции "прыжки"
                $('#ElementModal .JS_Name').click(function() {
                    table = $(this).closest('.JS_Section-Table');
                    Index_ActiveTab = $(this).closest('.JS_Section-Tables').find('.JS_Section-Table').index(table);
                    if(Index_ActiveTab == 2){
                        section = $(this).closest('.JS_Section-El');
                        Index_ActiveSection = $(this).closest('.JS_Section-Table').find('.JS_Section-El').index(section);
                        //представление прыжков в первой линии
                        if(Index_ActiveSection == 0){
                            BUTTON_EU.prop('disabled', true);
                            BUTTONSJUMPS.not(BUTTON_EU).prop('disabled', false);
                        //представление прыжков во второй линии
                        } else if (Index_ActiveSection == 1){
                            BUTTONSJUMPS.not('.JS_ButtonModal[value="Lz"]').prop('disabled', false);
                            $('#jumps .JS_ButtonModal[value="Lz"]').prop('disabled', true);
                         //представление прыжков в третьей линии
                        } else if(Index_ActiveSection == 2) {
                            if(NAMESECONDLINE.val() == 'Eu'){
                                BUTTONSJUMPS.not('.JS_ButtonModal[value="S"], .JS_ButtonModal[value="F"]').prop('disabled', true);
                            }else {
                                $('.JS_ButtonModal[value="A"], .JS_ButtonModal[value="Eu"], .JS_ButtonModal[value="Lz"]').prop('disabled', true);
                                BUTTONSJUMPS.not('.JS_ButtonModal[value="A"], .JS_ButtonModal[value="Eu"], .JS_ButtonModal[value="Lz"]').prop('disabled', false);
                            }
                        }
                    }
                }) //КОНЕЦ представление кнопок выбора атрибута прыжка в секции "прыжки"

                //блокировка/разблокировка кнопки "JS_Rotation"
                BUTTON_EU.click(function() {
                    BUTTON_ROTATION.prop('disabled', true);
                })
                $('.JS_RemoveJump').click(function() {
                    if (amount == 1){
                        BUTTON_ROTATION.prop('disabled', false);
                    }
                })
                $('#jumps .JS_ButtonModal:not(.JS_ButtonModal[value="Eu"])').click(function() {
                    if(Index_ActiveSection == 1){
                         BUTTON_ROTATION.prop('disabled', false);
                    }
                }) //КОНЕЦ блокировка/разблокировка кнопки "JS_Rotation"

                //блокировка/разблокировка кнопки "JS_Level" в зависимости от кнопки "StSq"
                BUTTON_CHSQ.click(function() {
                    BUTTON_STEPLEVEL.prop('disabled', true);
                })
                $('#steps .JS_ButtonModal[value="StSq"]').click(function() {
                     BUTTON_STEPLEVEL.prop('disabled', false);
                }) //КОНЕЦ блокировка/разблокировка кнопки "JS_Level" в зависимости от кнопки "StSq"

                //блокировка кнопки "V"
                $('#ElementModal .JS_Fly, #ElementModal .JS_ChangeLeg').click(function() {
                    if($('#ElementModal  .JS_Fly').hasClass('active') || $('#ElementModal .JS_ChangeLeg').hasClass('active')){
                        $('#ElementModal .JS_V').prop('disabled', false);
                    } else {
                         $('#ElementModal .JS_V').prop('disabled', true);
                    }
                }) //КОНЕЦ блокировка кнопки "V"
            }) //====================КОНЕЦ блокировка/разблокировка кнопок в секции "прыжки"===========
        })
    }) //======================КОНЕЦ Блокировка/Разблокировка кнопок===================================
    // END ModalWorkV3.js

    // ModalCalcV3-1.js
    $(document).ready(function() {

        let Iam,
            currentLine,
            linescores;

        $('.boxoutput-name').click(function() {
            ProgramsElements.ElementInModal1.ResetToZeroAllModalInfo();
            GetInfoFrom_ElementObject();
        })

        function GetInfoFrom_ElementObject() {
            for(let i = 1; i <= 3; i++) {
                ProgramsElements.ElementInModal1[`name${i}`] = ProgramsElements[keyOfElement][`name${i}`];
                ProgramsElements.ElementInModal1[`value${i}`] = ProgramsElements[keyOfElement][`value${i}`];
            }
        }

        $('.JS_Name, .JS_Level, .JS_Rotation').click(function() {
            Iam = $(this);
        })

        $('.tabCalc-link').click(function() {
            ProgramsElements.ElementInModal1.ResetToZeroAllModalInfo();
        })

        $('#ElementModal .JS_Reset').click(function() {
            ProgramsElements.ElementInModal1.ResetToZeroAllModalInfo();
        })

    //=============================перенос информации с экрана выбора значения атрибута элемента
        $(document).ready(function () {
            let Val_ButtonModal;

           $('#ElementModal .JS_ButtonModal').click(function() {
                Val_ButtonModal = $(this).val();
                SetPropretiesOfButtons();
                DirectorModal();
            })

            function SetPropretiesOfButtons() {
                Iam.val(Val_ButtonModal);
                Iam.addClass('active activeColor');
                if( CheckClass_JS_Name() ) {
                    Iam.closest('.JS_Section-El').find('.JS_Level, .JS_Rotation').addClass('active activeColor');
                    if (Val_ButtonModal == 'Eu'){
                        BUTTON_ROTATION.val(1);
                    }
                    else if(Val_ButtonModal == 'ChSq') {
                        BUTTON_STEPLEVEL.val(1);
                    }
                }
            }

            function CheckClass_JS_Name() {
                return Iam.hasClass('JS_Name') ? true : false;
            }
        }) //=============================КОНЕЦ перенос информации с экрана выбора значения атрибута элемента

        $('#ElementModal .JS_Fly, #ElementModal .JS_ChangeLeg').click(function() {
            Iam = $(this);
            if(!$('#ElementModal .JS_Fly').hasClass('active') && !$('#ElementModal .JS_ChangeLeg').hasClass('active') ) {
                $('#ElementModal .JS_V').removeClass('active activeColor');
            }
            DirectorModal();
        })

        $('#ElementModal').find('.JS_V, .JS_Galka, .JS_Edge, .JS_RemoveJump').click(function() {
            Iam = $(this);
            DirectorModal();
        })

        $('#ElementModal .JS_RemoveJump').click(function() {
            Iam = $(this).closest('.JS_Section-Table').find('.JS_Section-El.active:last .JS_Button:first');
            GetCurrentLineAndIndex();
            currentLine.removeClass('active splash').addClass('hide');
            ProgramsElements.ElementInModal1.ResetToZeroLinesInfo();
            PrinterModal();
        })

        function DirectorModal() {
            DirectorLine();
            PrinterModal();
        }


        //================все функции DirectorLine=====================
        function DirectorLine() {
            GetCurrentLineAndIndex();
            GetLineName();
            ProgramsElements.ElementInModal1.MakeLinesInfo();
            PrintLineScores();
            removeClass_Splash();
            return;
        }


        function GetCurrentLineAndIndex() {
            currentLine = Iam.closest('.JS_Section-El');
            ProgramsElements.ElementInModal1.currentLine_Index = Iam.closest('.JS_Section-Table').find('.JS_Section-El').index(currentLine);
        }

        function GetLineName() {
            ProgramsElements.ElementInModal1.linename = '';

            currentLine.find('.JS_Button.active').each(function() {
                ProgramsElements.ElementInModal1.linename += $(this).val();
            })
        }

        function removeClass_Splash() {
            if (ProgramsElements.ElementInModal1.CheckValidName() ) {
                currentLine.removeClass('splash');
            }
        }

        function PrintLineScores() {
            currentLine.find('.lineoutput-scores').text(ProgramsElements.ElementInModal1.SendLinesScores().toFixed(2) );
            return;
        }
        //================КОНЕЦ все функции DirectorLine=====================

        function PrinterModal() {
            $('#ElementModal .headeroutput-name').text(ProgramsElements.ElementInModal1.makeNameOfElement() );
            $('#ElementModal .headeroutput-scores').text(ProgramsElements.ElementInModal1.calcBaseValue().toFixed(2) );
        }
    })
    // END ModalCalcV3-1.js

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

    // MainCalcV3-1.js
    $(document).ready(function() {

        let Iam,
            buttonX,
            buttonGoe,
            section;

        $('.boxoutput-name').click(function() {
            Iam = $(this);
            buttonX = $(this).closest('.JS_Section-El').find('.JS_X');
            buttonGoe = $(this).closest('.JS_Section-El').find('.JS_Goe');
        })

        $('#ElementModal .JS_Save').click(function() {
            if(INDEX_ActiveTab == 2){
                buttonX.prop('disabled', false);
            }
            else {
                buttonX.prop('disabled', true).removeClass('active activeColor');
                ProgramsElements[keyOfElement].halfPartBonus = 1;
            }
            buttonGoe.removeClass('active activeColor').val(0);
            ProgramsElements[keyOfElement].goe=0;
            SendInfoTo_ElementObject();
            DirectorMain();
        })

        function SendInfoTo_ElementObject() {
            for(let i = 1; i <= 3; i++) {
                ProgramsElements[keyOfElement][`name${i}`] = ProgramsElements.ElementInModal1[`name${i}`];
                ProgramsElements[keyOfElement][`value${i}`] = ProgramsElements.ElementInModal1[`value${i}`];
            }
        }

        $('#ElementModal .JS_Reset').click(function() {
            buttonX.prop('disabled', true).removeClass('active activeColor');
            buttonGoe.removeClass('active activeColor').val(0);
            DirectorMain();
        })

        //Работа с кнопкой Goe
        $('.JS_Section-Table .JS_Goe').click(function() {
            Iam = $(this);
        })
        $('#GoeModal .JS_ButtonModal').click(function() {
            ProgramsElements[keyOfElement].goe = $(this).val();
            Iam.val(ProgramsElements[keyOfElement].goe)
            ProgramsElements[keyOfElement].goe == 0 ? Iam.removeClass('active activeColor') : Iam.addClass('active activeColor');
            DirectorMain();
        })

        //Работа с кнопкой Х
        $('.JS_Section-Table .JS_X').click(function() {
            Iam = $(this);
            $(this).toggleClass('active activeColor');
            $(this).hasClass('active') ? ProgramsElements[keyOfElement].halfPartBonus = 1.1 : ProgramsElements[keyOfElement].halfPartBonus = 1;
            DirectorMain();
        })


        function DirectorMain() {
            RenderingLine();
            RenderingFullScores();
        }

        function RenderingLine() {
            section = Iam.closest('.JS_Section-El')
            section.find('.lineoutput-name').text(ProgramsElements[keyOfElement].makeNameOfElement() );
            section.find('.lineoutput-scores').text(ProgramsElements[keyOfElement].calcValueOfElement().toFixed(2) );
        }

        function CalcFullScores() {
            let fullscores = 0;

            $('#MainTable').find('.JS_Section-El').each(function(index) {
                fullscores += ProgramsElements[`Element${index+1}`].calcValueOfElement();
            })
            return fullscores;
        }

        function RenderingFullScores() {
            $('#MainTable').find('.tableoutput-scores').text(CalcFullScores().toFixed(2) );
        }
    })
    // END MainCalcV3-1.js

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

}) //END calculatorV4.JS
