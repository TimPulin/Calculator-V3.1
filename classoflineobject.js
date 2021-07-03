
class Element {
    arrNames=[]
    value1=3
    value2=2
    value3=1
    goe=5
    halfPartBonus=1
    valueOfElement = this.calcBaseValue() * this.halfPartBonus + this.calcGoeBonus()

    name(){
        return this.arrNames.join('+')
    } // END name()

    calcBaseValue(){
        return this.value1 + this.value2 + this.value3
    } // END calcBaseValue()

    calcGoeBonus(){
        if(this.name() =='ChSq1'){
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
    Element12 : new Element()
}



console.log(ProgramsElements[keyOfElement].valueOfElement)
