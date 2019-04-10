class EnergonEngine extends DigitalifeBase {
    constructor(index,params,id) {
        super();

        var index;
        var params;
        var id;
        
        super.params = params;
        super.index = index;
        super.id = id;

        // Uložit sdílené informace
        super.pushData();
        
        console.log("popD",super.popData());
        console.log("orig",params);
        console.log("othr",super.popDataOthers());

    }
}