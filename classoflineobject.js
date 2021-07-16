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
