
class Element {
    arrNames=[]
    value1=0
    value2=0
    value3=0
    goe=0
    halfPartBonus=1

    makeNameOfElement(){
        return this.arrNames.join('+')
    } // END MakeNameOfElement()

    // ============== Вычисление стоимости элемента
    calcValueOfElement(){
        return this.calcBaseValue() * this.halfPartBonus + this.calcGoeBonus()
    }

    calcBaseValue(){
        if(this.arrNames.length==2){
            if(this.CheckAxels(this.arrNames[1].toLowerCase())){
                this.arrNames.push('SEQ');
                return (this.value1 + this.value2 + this.value3) * 0.8
            }
        }
        return this.value1 + this.value2 + this.value3
    } // END calcBaseValue()

    calcGoeBonus(){
        if(this.makeNameOfElement() =='ChSq1'){
            return 0.5*this.goe;
        }
        else {
            let compare=0
            for (let i=1; i<=3; i++) {
                if (this['value'+i]>compare){
                    compare=this['value'+i]
                }
            }
            return compare/10*this.goe;
        }
    } // END calcGoeBonus()

    CheckAxels(secondjump){
        for (let i=0; i<arrOfAxels.length; i++){
            if(arrOfAxels[i]===secondjump){
            return true;
            }
        }
        return false;
    }
    // ================== END Вычисление стоимости элемента
} // END class Element{}

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
    ElementInModal : new Element()
}
