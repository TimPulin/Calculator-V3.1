jQuery(document).ready(function() { // Версия 3.1 с анимацией выбора элементов

//================================PrintTable==============================
/*
jQuery(document).ready(function() {
    var tr = '<tr class="JS_Section-El">\
                <td class="JS_NumberOfline"></td><td class=""><div class="boxoutput-name"><output class="lineoutput-name"></output></div></td>\
                <td><input type="button" class="JS_X JS_Button buttonGuideBasic" value="X" disabled></td>\
                <td><input type="button" class="JS_Goe JS_Button buttonGuideBasic" name="goe" value="0"></td>\
                <td><output class="lineoutput-scores">0.00</output></td>\
            </tr>';

    var lastrow= '<tr>\
                    <td colspan="4" class="pl-0">	<button class="JS_Reset buttonFlat float-left">Сброс</button></td>\
                    <td><output class="tableoutput-scores">0.00</output></td>\
                  </tr>';

    var i=0;

    for(i=0;i<12;i++){
        PrintTable()
    }
    //PrintLastRow();

    function PrintTable() {
        jQuery(tr).appendTo('.tbody');
        jQuery('.JS_NumberOfline').eq(i).append(i+1)
        return;
    }
    function PrintLastRow() {
        jQuery(lastrow).appendTo('.tbody');
    }
})
*/
//================================КОНЕЦ PrintTable==============================

//=========================ModalWorkV3====================================
//==================вызов и закрытие модального окна======================
jQuery(document).ready(function() {
    let Iam;
    //вызов модального окна
    jQuery('.boxoutput-name').click(function(){
        jQuery('#ElementModal').modal();
    });
    //закрытие модального окна
    jQuery('#ElementModal .JS_Save').click(function() {
         HideModal();
    })
    jQuery('#ElementModal .JS_Reset').click(function() {
        Iam=jQuery(this);
        HideModal();
        ResetModal(Iam);
    })
    function HideModal() {jQuery('#ElementModal').modal('hide');}
    //КОНЕЦ закрытие модального окна

    jQuery('.JS_Goe').click(function() {
        jQuery('#GoeModal').modal();
    })
    jQuery('#GoeModal .JS_ButtonModal').click(function() {
         jQuery('#GoeModal').modal('hide');
    })
})
//======================КОНЕЦ вызов и закрытие модального окна======================


//===========================ПОВЕДЕНИЕ КНОПОК=========================================

//========================Переключение вкладок в модальном окне==
jQuery(document).ready(function(){
    let Iam,
        Index,
        Title_Modal,
        section;
    jQuery('.tabCalc-link').click(function(){
        Iam=jQuery(this);
        Index=Iam.closest('.tabCalc-links').find('.tabCalc-link').index(Iam);
        Title_Modal=Iam.val();
        AddRemove_Active();
        ResetModal(Iam);
        ShowHide_tabel ();
        ShowHeader();
        Print_Title_Modal();
    });

    function AddRemove_Active(){
        Iam.closest('.tabCalc-links').find('.tabCalc-link.active').removeClass('active');
        Iam.addClass('active');
    };

    function ShowHide_tabel(){
        Iam.closest('.tabCalc-wrap').find('.tabCalc-content.active').removeClass('active');
        Iam.closest('.tabCalc-wrap').find('.tabCalc-content').eq(Index).addClass('active');
    };


    function Print_Title_Modal(){
        Iam.closest('.JS_Section-Modal').find('.headeroutput-title').text(Title_Modal);
    };

});
//========================КОНЕЦ Переключение вкладок в модальном окне==

//====================вызов экрана для выбора значения атрибута элемента==========
jQuery(document).ready(function() {
    let Iam,
        Val_Iam,
        IamModal,
        ID;
    jQuery('.JS_Goe').click(function() {
        Val_Iam=jQuery(this).val();
        ID='#'+jQuery(this).attr('name');
        addClassActiveTo_JS_ButtonModal();
    })

    jQuery('.JS_Name, .JS_Level, .JS_Rotation').click(function() {
        Iam=jQuery(this);
        Val_Iam=jQuery(this).val();
        ID='#'+Iam.attr('name');
        Hide_CurrentHeadersSection();
        ToggleHeaderSection();
        CheckClass();
    })

    function Hide_CurrentHeadersSection() {
        Iam.closest('.JS_Section-Modal').find('.mod-header .JS_Section').not(jQuery(ID)).removeClass('active');
        return;
    }

    function ToggleHeaderSection() {
        jQuery(ID).toggleClass('active');
        return;
    }

    function CheckClass() {
        if(!jQuery(ID).hasClass('active')){
            ShowHeader();
        } else {
            addClassActiveTo_JS_ButtonModal();
        }
    }
    function addClassActiveTo_JS_ButtonModal(){
        jQuery(ID).find(".JS_ButtonModal").each(function(index){
            jQuery(this).removeClass('active activeColor');
            if(Val_Iam==jQuery(this).val()){
                jQuery(this).addClass('active activeColor');
            }
        })
    }
})
//====================КОНЕЦ вызов экрана для выбора значения атрибута элемента==========

//=======================закрытие экранов "выбор значения атрибута элемента" и открытие заголовка модульного окна=======
jQuery(document).ready(function () {
    let Iam;
    jQuery('.JS_Fly, .JS_ChangeLeg, .JS_V, .JS_Galka, .JS_Edge').click(function(){
        Iam=jQuery(this);
        Hide_HeadersSections(Iam);
        ShowHeader();
    })
})
//=======================КОНЕЦ закрытие экранов "выбор значения атрибута элемента"=======

//===============================активация кнопок при выборе значения атрибута==========
jQuery(document).ready(function() {
    let Iam;

    jQuery('.JS_Fly, .JS_ChangeLeg, .JS_V, .JS_Edge, .JS_X').click(function() {
        jQuery(this).toggleClass('active activeColor');

    })

    jQuery('.JS_Galka').click(function() {
        Iam=jQuery(this);
        Iam.toggleClass('active activeColor');
        Iam.parent().find('.JS_Galka').not(Iam).each(function(index){
            jQuery(this).removeClass('active activeColor');
        })
    })
})

jQuery(document).ready(function() {
    jQuery('.JS_Level, .JS_Rotation').click(function() {
        jQuery(this).addClass('active activeColor');

    })
})
//===============================КОНЕЦ поведение кнопок при выборе значения атрибута==========

//=====================работа кнопок на экране для выбора значения атрибута элемента====
jQuery(document).ready(function(){
    let Iam;

    jQuery('#GoeModal .JS_ButtonModal').click(function() {
        Iam=jQuery(this);
        AddRemove_Active();
    })

    jQuery('#ElementModal .JS_ButtonModal').click(function() {
        Iam=jQuery(this);
        AddRemove_Active();
        Hide_HeadersSections(Iam);
        ShowHeader();
    })

    function AddRemove_Active() {
        Iam.closest('.JS_Section').find('.JS_ButtonModal').each(function(index){
            jQuery(this).removeClass('active activeColor');
        })
        Iam.addClass('active activeColor');
        return;
    }
})
//=====================КОНЕЦ работа кнопок на экране для выбора значения атрибута элемента====

//========================добавление/удаление прыжка в модальном окне==================
    //ДОЛЖНО БЫТЬ ВЫШЕ @разблокировка кнопок "добавить прыжок"@
jQuery(document).ready(function() {
    let section,
        Iam;

      jQuery('#ElementModal .JS_AddJump').click(function() {
          Iam=jQuery(this);
          jQuery(this).closest('.JS_Section-Table').find('.JS_Section-El:not(.active):first').addClass('active splash');
          Hide_HeadersSections(Iam);
          ShowHeader();
      })
      jQuery('#ElementModal .JS_RemoveJump').click(function() {
          Iam=jQuery(this);
          section=Iam.closest('.JS_Section-Table').find('.JS_Section-El.active:last')
          ResetButtons(section);
          section.removeClass('active splash').addClass('hide');
          Hide_HeadersSections(Iam);
          ShowHeader();
      })
})
//=========================КОНЕЦ добавление/удаление прыжка в модальном окне==================



//======================Блокировка/Разблокировка кнопок==================================================
jQuery(document).ready(function () {

    //==блокировка/разблокировка кнопки "E"
    jQuery(document).ready(function() {
        let section;
        let button;
        jQuery('.JS_Name').click(function() {
            section=jQuery(this).closest('.JS_Section-El');
        })
        jQuery('#jumps .JS_ButtonModal[value="F"], #jumps .JS_ButtonModal[value="Lz"]').click(function() {
            section.find('.JS_Edge').prop('disabled', false);
        })
        jQuery('#jumps .JS_ButtonModal:not(.JS_ButtonModal[value="F"], #jumps .JS_ButtonModal[value="Lz"])').click(function() {
            button=section.find('.JS_Edge');
            button.removeClass('active activeColor');
            button.prop('disabled', true);
        })
    })
    //==КОНЕЦ блокировка/разблокировка кнопки "E"

    jQuery(document).ready(function(){
        let amount, //переменная используется для кнопок "добавить/удалить прыжок" и кнопки "Eu"
            IndexS;

        //===блокировка/разблокировка кнопок "добавить прыжок" и "удалить прыжок"
        jQuery(document).ready(function() {
            let Iam;

            jQuery('#ElementModal .JS_Name').click(function() {
                Iam=jQuery(this);
            })
            jQuery('#jumps .JS_ButtonModal:not(.JS_ButtonModal[value="A"])').click(function() {
                CheckAmountLinesHide();
                if(amount < 3){
                    jQuery('#ElementModal .JS_AddJump').prop('disabled', false);
                }
            })
            jQuery('#ElementModal .JS_RemoveJump').click(function () {
                Iam=jQuery(this);
                CheckAmountLinesHide();
                if(amount < 3){
                    jQuery('#ElementModal .JS_AddJump').prop('disabled', false);
                }
            })

            jQuery('.JS_RemoveJump').click(function () {
                Iam=jQuery(this);
                CheckAmountLinesHide();
                if(amount < 2){
                    jQuery(this).prop('disabled', true);
                }
            })

            jQuery('#ElementModal .JS_AddJump').click(function () {
               jQuery(this).prop('disabled', true);
                jQuery('#ElementModal .JS_RemoveJump').prop('disabled', false);;
            })

             //блокировка/разблокировка кнопки "добавить прыжок" в зависимости от кнопки "A"
             BUTTON_A.click(function() {
                 if(IndexS==1){
                     if(amount==3){
                         jQuery('#ElementModal .JS_RemoveJump').trigger('click');
                     }
                     jQuery('#ElementModal .JS_AddJump').prop('disabled', true);
                 }else {
                     jQuery('#ElementModal .JS_AddJump').prop('disabled', false);
                }
             })
             //КОНЕЦ блокировка/разблокировка кнопки "добавить прыжок" в зависимости от кнопки "A"

            function CheckAmountLinesHide() {
                amount=jQuery(Iam).closest('.JS_Section-Table').find('.JS_Section-El.active').length;

                return;
            }

        })
        //===КОНЕЦ блокировка/разблокировка кнопок "добавить прыжок" и "удалить прыжок"

        //====================блокировка/разблокировка кнопок   в секции "прыжки"===========
       jQuery(document).ready(function() {
            let IndexT,
                section,
                table;
            const NAMESECONDLINE=jQuery('.JS_Section-Table:eq(2) .JS_Section-El:eq(1) .JS_Name'),
                  BUTTONSJUMPS=jQuery('#jumps .JS_ButtonModal');


            //представление кнопок выбора атрибута прыжка в секции "прыжки"
            jQuery('#ElementModal .JS_Name').click(function() {
                table=jQuery(this).closest('.JS_Section-Table');
                IndexT=jQuery(this).closest('.JS_Section-Tables').find('.JS_Section-Table').index(table);
                if(IndexT==2){
                    section=jQuery(this).closest('.JS_Section-El');
                    IndexS=jQuery(this).closest('.JS_Section-Table').find('.JS_Section-El').index(section);
                    //представление прыжков в первой линии
                    if(IndexS==0){
                        BUTTON_EU.prop('disabled', true);
                        BUTTONSJUMPS.not(BUTTON_EU).prop('disabled', false);
                    //представление прыжков во второй линии
                    } else if (IndexS==1){
                        BUTTONSJUMPS.not('.JS_ButtonModal[value="Lz"]').prop('disabled', false);
                        jQuery('#jumps .JS_ButtonModal[value="Lz"]').prop('disabled', true);
                     //представление прыжков в третьей линии
                    } else if(IndexS==2) {
                        if(NAMESECONDLINE.val()=='Eu'){
                            BUTTONSJUMPS.not('.JS_ButtonModal[value="S"], .JS_ButtonModal[value="F"]').prop('disabled', true);
                        }else {
                            jQuery('.JS_ButtonModal[value="A"], .JS_ButtonModal[value="Eu"], .JS_ButtonModal[value="Lz"]').prop('disabled', true);
                            BUTTONSJUMPS.not('.JS_ButtonModal[value="A"], .JS_ButtonModal[value="Eu"], .JS_ButtonModal[value="Lz"]').prop('disabled', false);
                        }
                    }
                }
            })
            //КОНЕЦ представление кнопок выбора атрибута прыжка в секции "прыжки"

            //блокировка/разблокировка кнопки "JS_Rotation"
            BUTTON_EU.click(function() {
                BUTTON_ROTATION.prop('disabled', true);
            })
            jQuery('.JS_RemoveJump').click(function() {
                if (amount==1){
                    BUTTON_ROTATION.prop('disabled', false);
                }
            })
            jQuery('#jumps .JS_ButtonModal:not(.JS_ButtonModal[value="Eu"])').click(function() {
                if(IndexS==1){
                     BUTTON_ROTATION.prop('disabled', false);
                }
            })
            //КОНЕЦ блокировка/разблокировка кнопки "JS_Rotation"

            //блокировка/разблокировка кнопки "JS_Level" в зависимости от кнопки "StSq"
            BUTTON_CHSQ.click(function() {
                BUTTON_STEPLEVEL.prop('disabled', true);
            })
            jQuery('#steps .JS_ButtonModal[value="StSq"]').click(function() {
                 BUTTON_STEPLEVEL.prop('disabled', false);
            })
            //КОНЕЦ блокировка/разблокировка кнопки "JS_Level" в зависимости от кнопки "StSq"

            //блокировка кнопки "V"
            jQuery('#ElementModal .JS_Fly, #ElementModal .JS_ChangeLeg').click(function() {
                if(jQuery('#ElementModal  .JS_Fly').hasClass('active') || jQuery('#ElementModal .JS_ChangeLeg').hasClass('active')){
                    jQuery('#ElementModal .JS_V').prop('disabled', false);
                } else {
                     jQuery('#ElementModal .JS_V').prop('disabled', true);
                }
            })
            //КОНЕЦ блокировка кнопки "V"
        })
        //====================КОНЕЦ блокировка/разблокировка кнопок в секции "прыжки"===========
    })
})
//======================КОНЕЦ Блокировка/Разблокировка кнопок===================================

//=========================КОНЕЦ ModalWorkV3====================================

//=========================ModalCalculateV3=====================================
//====================вычисления в модульном окне==========
jQuery(document).ready(function() {
    let Iam,
        table,
        line,
        linename,
        linescores,
        tablescores;
    let arrName=[];
    let arrScore=[];

    jQuery('.JS_Name, .JS_Level, .JS_Rotation').click(function() {
        Iam=jQuery(this);
    })

    jQuery('.tabCalc-link').click(function() {
        CleanerModalArrs();
    })

//=============================перенос информации с экрана для выбора значения атрибута элемента
    jQuery(document).ready(function () {
        let Val_IamModal;

       jQuery('#ElementModal .JS_ButtonModal').click(function() {
            Val_IamModal=jQuery(this).val();
            AddInLine_ValButtonModal();
            CheckClass();
            DirectorModal();
        })
        function AddInLine_ValButtonModal(){
            Iam.val(Val_IamModal);
            Iam.addClass('active activeColor');
            return
        };
        function CheckClass() {
            if(Iam.hasClass('JS_Name')){
                Iam.closest('.JS_Section-El').find('.JS_Level, .JS_Rotation').addClass('active activeColor');
                if (Val_IamModal=='Eu'){
                    BUTTON_ROTATION.val(1);
                }
                else if(Val_IamModal=='ChSq'){
                    BUTTON_STEPLEVEL.val(1);
                }
            }
            return;
        }
    })
//=============================КОНЕЦ перенос информации с экрана для выбора значения атрибута элемента
    jQuery('#ElementModal .JS_Fly, #ElementModal .JS_ChangeLeg').click(function() {
        Iam=jQuery(this);
        if(!jQuery('#ElementModal .JS_Fly').hasClass('active') && !jQuery('#ElementModal .JS_ChangeLeg').hasClass('active')){
            jQuery('#ElementModal .JS_V').removeClass('active activeColor');
        }
        DirectorModal();
    })

    jQuery('#ElementModal').find('.JS_V, .JS_Galka, .JS_Edge, .JS_RemoveJump').click(function() {
        Iam=jQuery(this);
        DirectorModal();
    })


    function DirectorModal() {
        Packer();
        ComputerModal();
        PrinterModal();
        return;
    }

    //==============все функции Packer==============================
    function Packer() {
        MakeTheName_Modal(0);
        CleanerModalArrs();
        Iam.closest('.JS_Section-Table').find('.JS_Section-El').each(function(){
            line=jQuery(this);
            DirectorLine();
            PusherInArr_forModal();
        })
        return;
    }
    function CleanerModalArrs(){
        arrName.splice(0, arrName.length);
        arrScore.splice(0, arrScore.length);
        delete arrNamesInMain[NameOfProperty];
        delete arrScoresInMain[NameOfProperty];

        return;
    }
    function PusherInArr_forModal() {
        if (linename!=null){
            arrName.push(linename);
            arrScore.push(linescores);
        }
            arrNamesInMain[NameOfProperty]=jQuery.extend(true, [], arrName);
            arrScoresInMain[NameOfProperty]=jQuery.extend(true, [], arrScore);

    }

    //==============КОНЕЦ все функции Packer==============================

    //================все функции DirectorLine=====================
    function DirectorLine() {
        GetLineName();
        GetLineScores();
        PrintLineScores();
        return;
    }

    function GetLineName() {
        linename=''
        line.find('.JS_Button.active').each(function (index) {
            linename=linename+jQuery(this).val();
        })
        return;
    }
    function GetLineScores() {
        linescores=list_value[linename.toLowerCase()]
        if (linescores==undefined){
            linescores=0;
            linename=null;
            return false;
        }
        line.removeClass('splash');//убираем класс анимации!!!
        return true;
    }
    function PrintLineScores() {
        line.find('.lineoutput-scores').text(linescores.toFixed(2));
        return;
    }
    //================КОНЕЦ все функции DirectorLine=====================

    //=================================подсчет баллов====================================================
    function ComputerModal() {
        GetTablescores();
        if(arrName.length==2){
            let secondjump=arrName[1].toLowerCase();
            CheckAxels(secondjump);
            if(CheckAxels(secondjump)){
                tablescores=tablescores*0.8;
                arrName.push('SEQ');
            }
        }
        return;
    }
    function GetTablescores() {
        tablescores=0;
        for(let i=0; i<arrScore.length; i++){
            tablescores=tablescores+arrScore[i];
        }
        return;
    }
    //=========проверка второго элемента - является ли он акселем==========
    function CheckAxels(secondjump){
        for (let i=0; i<arrOfAxels.length; i++){
            if(arrOfAxels[i]===secondjump){
            return true;
            }
        }
        return false;
    }
    //=========КОНЕЦ проверка второго элемента - является ли он акселем==========
    //===============КОНЕЦ подсчет баллов====================================================

    function PrinterModal(){
        jQuery('#ElementModal .headeroutput-name').text(arrName.join('+'));
        jQuery('#ElementModal .headeroutput-scores').text(tablescores.toFixed(2));
        return;
    }
})
//====================КОНЕЦ вычисления в модульном окне==========

//=========================КОНЕЦ ModalCalculateV3=====================================

//=========================Director===================================================
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

jQuery(document).ready(function () {
    jQuery('.JS_Section-Table').find('.boxoutput-name, .JS_Goe, .JS_X').click(function() {
        Ich=jQuery(this);
        sectionINmain=jQuery(this).closest('.JS_Section-El');
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

const BUTTON_EU=jQuery('#jumps .JS_ButtonModal[value="Eu"]'),
      BUTTON_A=jQuery('#jumps .JS_ButtonModal[value="A"]'),
      BUTTON_ROTATION=jQuery('#ElementModal .JS_Section-Tables .JS_Section-Table:eq(2) .JS_Section-El:eq(1) .JS_Rotation'),
      BUTTON_CHSQ=jQuery('#steps .JS_ButtonModal[value="ChSq"]'),
      BUTTON_STEPLEVEL=jQuery('#ElementModal .JS_Section-Tables .JS_Section-Table:eq(0) .JS_Level');


function ResetModal(Iam) {
    let section;
    section=Iam.closest('.JS_Section-Modal');
    ResetButtons(section);
    Hide_HeadersSections(Iam);

    ShowHeader();
    jQuery('#ElementModal').find('.JS_Section-Table .JS_Section-El').not(':only-child').not(':first').removeClass('active');
    section.find('.headeroutput-name').val('');
    section.find('.headeroutput-scores').val('0.00');
    jQuery('#ElementModal').find('.JS_RemoveJump, .JS_AddJump').prop('disabled', true);
    return;
}
function ResetButtons(section) {
    section.find('.JS_Button').removeClass('active activeColor');
    section.find('.JS_Name').val('элемент');
    section.find('.JS_Level').val('B').prop('disabled', false);
    section.find('.JS_Rotation').val('1').prop('disabled', false);
    jQuery('#ElementModal .JS_V').prop('disabled', true);
    section.find('.lineoutput-scores').text('0.00');
    section.find('.JS_Edge').prop('disabled', true);

}

function ShowHeader() {
    jQuery('#header_title').addClass('active');
    return ;
}
function Hide_HeadersSections(Iam) {
    Iam.closest('.JS_Section-Modal').find('.mod-header .JS_Section.active').removeClass('active');
    return;
}
//======================КОНЕЦ ГЛОБАЛЬНЫЕ служебные функции======================

//======================сброс массивов одной линии==============================
jQuery(document).ready(function() {
    jQuery('#ElementModal .JS_Reset').click(function(){
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
jQuery(document).ready(function() {
    let section;
    jQuery('#MainTable .JS_Reset').click(function() {
        section=jQuery(this).closest('.JS_Section-Table');
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

//=========================КОНЕЦ Director===================================================

//=========================Compiling========================================================
jQuery(document).ready(function() {

    let Iam,
        IamModal,
    //    IndexT,
        IamSectionTable;
    let arrTemporaryClass=[];
    let arrTemporaryAble=[];
    let arrTemporaryVal=[];

    jQuery('#ElementModal .JS_Save').click(function() {
        Iam=jQuery(this);
        IamModal=jQuery(this).closest('.JS_Section-Modal');
        IamSectionTable=IamModal.find('.JS_Section-Tables .JS_Section-Table');
        DirectorCompilingConfig()
    })

    function DirectorCompilingConfig() {
        MakeTheName_Modal(0);
        FindActiveTab();
        GetSectionInfo();
        GetButtonsInfo();
        GetOutputInfo();
    }

    function FindActiveTab() {
        IamModal.find('.tabCalc-links .tabCalc-link').each(function(index) {
            if(jQuery(this).hasClass('active')){
                arrActiveTabs[NameOfProperty]=index;
                IndexT=index;
                return;
            }
        })
    }

    function GetSectionInfo() {
        Cleaner_arrTemporaryClass();
        IamSectionTable.eq(IndexT).find('.JS_Section-El').each(function() {
            arrTemporaryClass.push(jQuery(this).attr('class'))
        })
        arrLinesClass[NameOfProperty]=jQuery.extend(true, [], arrTemporaryClass);
        return;
    }

    function GetButtonsInfo() {
        Cleaner_arrTemporaryClass();
        Cleaner_arrTemporaryAble();
        Cleaner_arrTemporaryVal();
        IamSectionTable.eq(IndexT).find('.JS_Button, .JS_RemoveJump, .JS_AddJump').each(function(index) {

            if(jQuery(this).hasClass('activeColor')){
                arrTemporaryClass.push('active activeColor')
            }
            else {
                arrTemporaryClass.push('')
            }
            arrTemporaryAble.push(jQuery(this).prop('disabled'));
            arrTemporaryVal.push(jQuery(this).val())
        })
        arrButtonsClass[NameOfProperty]=jQuery.extend(true, [], arrTemporaryClass);
        arrButtonsAbility[NameOfProperty]=jQuery.extend(true, [], arrTemporaryAble);
        arrButtonsVal[NameOfProperty]=jQuery.extend(true, [], arrTemporaryVal);
        return;
    }
    function GetOutputInfo() {
        Cleaner_arrTemporaryVal();
        IamModal.find('.headeroutput-name, .headeroutput-scores, .lineoutput-scores').each(function() {
            arrTemporaryVal.push(jQuery(this).val());
        })
        arrOutputs[NameOfProperty]=jQuery.extend(true, [], arrTemporaryVal);
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
//=========================КОНЕЦ Compiling========================================================

//=========================Set====================================================================
jQuery(document).ready(function() {

      let IndexT;
    const Iam=jQuery('#ElementModal .tabCalc-links .tabCalc-link');
    const IamSectionTable=jQuery('#ElementModal .JS_Section-Tables .JS_Section-Table');

    jQuery('.boxoutput-name').click(function() {
        DirectorSetConfig();
    })


    function DirectorSetConfig() {
        MakeTheName_Modal(0);
        CheckAvailabilityInfo();
        if(CheckAvailabilityInfo()){
            SetActiveTab();
            SetLines();
            SetButtons();
            SetOutputs();
        }
        else {
            jQuery('#ElementModal .JS_Section-Tables .JS_Section-Table').each(function(index){
                jQuery(this).find('.JS_Section-El:first').addClass('splash');
            })
            Iam.eq(2).click();
        }

    }

    function CheckAvailabilityInfo() {
        if(arrActiveTabs[NameOfProperty]==undefined){
            return false;
        }
        else {
            return true;
        }
    }

    function SetActiveTab() {
        IndexT=arrActiveTabs[NameOfProperty];
        Iam.eq(IndexT).click();
        return;
    }

    function SetLines() {
        IamSectionTable.eq(IndexT).find('.JS_Section-El').each(function(index) {
            jQuery(this).addClass(arrLinesClass[NameOfProperty][index]);
        })
        return;
    }

    function SetButtons() {
        IamSectionTable.eq(IndexT).find('.JS_Button, .JS_RemoveJump, .JS_AddJump').each(function(index) {
            jQuery(this).addClass(arrButtonsClass[NameOfProperty][index]);
            jQuery(this).val(arrButtonsVal[NameOfProperty][index]);
            jQuery(this).prop('disabled', arrButtonsAbility[NameOfProperty][index]);
        })
        return;
    }

    function SetOutputs() {
        jQuery('#ElementModal').find('.headeroutput-name, .headeroutput-scores, .lineoutput-scores').each(function(index) {
            jQuery(this).text(arrOutputs[NameOfProperty][index]);
        })
    }
})
//=========================КОНЕЦ Set====================================================================

//=========================MainCalculateV3==============================================================
jQuery(document).ready(function() {
    let Iam,
        buttonX,
        buttonGoe,
        scores,
        x,
        goe,
        bonusGoe,
        compare,
        fullscores;
    let arrNameZero=[''];


    jQuery('.boxoutput-name').click(function() {
        Iam=jQuery(this);
        buttonX=jQuery(this).closest('.JS_Section-El').find('.JS_X');
        buttonGoe=jQuery(this).closest('.JS_Section-El').find('.JS_Goe');
    })
    jQuery('#ElementModal .JS_Save').click(function(){
        if(IndexT==2){
            buttonX.prop('disabled', false);
        }
        else {
            buttonX.prop('disabled', true).removeClass('active activeColor');
        }
        buttonGoe.removeClass('active activeColor').val(0);
        DirectorMain();
    })
    jQuery('#ElementModal .JS_Reset').click(function() {
        MakeTheName_Modal(0);
        arrScoresInMain[NameOfProperty]=0;
        arrNamesInMain[NameOfProperty]=jQuery.extend(true, [], arrNameZero);
        buttonX.prop('disabled', true).removeClass('active activeColor');
        buttonGoe.removeClass('active activeColor').val(0);
        DirectorMain();
    })


    jQuery('.JS_Section-Table .JS_X').click(function() {
        Iam=jQuery(this);
        DirectorMain();
    })

    jQuery(document).ready(function() {
        let Val_IamModal;

        jQuery('.JS_Section-Table .JS_Goe').click(function() {
            Iam=jQuery(this);
        })

        jQuery('#GoeModal .JS_ButtonModal').click(function() {
            Val_IamModal=jQuery(this).val();
            Iam.val(Val_IamModal);
            Iam.addClass('active activeColor');
            DirectorMain();
        })
    })


    function DirectorMain() {
        DirectorLine();
        CounterMain();
        PrinterMain();
    }

    function CounterMain() {
        fullscores=0;
        Iam.closest('.JS_Section-Table').find('.JS_Section-El').each(function(index) {
            Ich=jQuery(this).find('.boxoutput-name');
            sectionINmain=jQuery(this);
            GetID();
            MakeTheName_Modal(0);

            if(arrLineScores[NameOfProperty]==undefined){
                arrLineScores[NameOfProperty]=0;
            }
            fullscores=fullscores+arrLineScores[NameOfProperty];
        })
        return;
    }

    function PrinterMain() {
        Ich.closest('.JS_Section-Table').find('.tableoutput-scores').text(fullscores.toFixed(2));
    }

    //==============функции DirectorLine=====================
    function DirectorLine() {
        MakeTheName_Modal(0);
        CheckAvailabilityInfo();
        GetInfoX();
        GetGOE();
        CounterLIne();
        PrinterLine();
        return;
    }

    function CheckAvailabilityInfo() {
        if(arrNamesInMain[NameOfProperty]==undefined){
            arrScoresInMain[NameOfProperty]=0;
            arrNamesInMain[NameOfProperty]=jQuery.extend(true, [], arrNameZero);
            arrLineScores[NameOfProperty]=0;
        }
        return;
    }

    function GetInfoX() {
        if(sectionINmain.find('.JS_X').hasClass('active')){
            x=1.1;
        }
        else {
            x=1;
        }
        return;
    }

    function GetGOE() {
        compare=0;
        bonusGoe=0;
        goe=sectionINmain.find('.JS_Goe').val();
        for(let i=0; i<arrScoresInMain[NameOfProperty].length; i++){
            if(arrScoresInMain[NameOfProperty][i]>compare){
                compare=arrScoresInMain[NameOfProperty][i];
            }
        }

        if(arrNamesInMain[NameOfProperty] =='ChSq1'){
            bonusGoe=0.5*goe;
        }
        else {
            bonusGoe=compare/10*goe;
        }
        return;
    }

    function CounterLIne() {
        scores=0;

        for(let i=0; i<arrScoresInMain[NameOfProperty].length; i++){
            scores=scores+arrScoresInMain[NameOfProperty][i];
        }
        scores=scores*x+bonusGoe;

        if(arrNamesInMain[NameOfProperty].length==2){
            let secondjump=arrNamesInMain[NameOfProperty][1].toLowerCase();
            CheckAxels(secondjump);
            if(CheckAxels(secondjump)){
                scores=scores*0.8;
                arrNamesInMain[NameOfProperty].push('SEQ');
            }
        }
        arrLineScores[NameOfProperty]=scores;

        return;
    }

    //=========проверка второго элемента - является ли он акселем==========
    function CheckAxels(secondjump){
        for (let i=0; i<arrOfAxels.length; i++){
            if(arrOfAxels[i]===secondjump){
            return true;
            }
        }
        return false;
    }
    //=========КОНЕЦ проверка второго элемента - является ли он акселем==========

    function PrinterLine() {
        sectionINmain.find('.lineoutput-scores').text(scores.toFixed(2));
        sectionINmain.find('.lineoutput-name').text(arrNamesInMain[NameOfProperty].join('+'));
    }
    //==============КОНЕЦ функции DirectorLine=====================
})
//=========================КОНЕЦ MainCalculateV3==============================================================

})
//=============================КОНЕЦ ВСЕГО ДОКУМЕНТА============================================================
