class EnergonEngine extends DigitalifeBase {
    constructor(index,params) {
        super();

        var index;
        var params;
        
        super.params = params;
        super.index = index;

        var id = super.getID();
        
        console.log(localStorage.index,id,index,"energon engine se hlásí...",params);

        // Uložit sdílené informace
    }
}