/**
 * Energon Engine pro Digitalife
 * 
 * Autor: Robert Rajs (c) 2019
 */
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

		// Zapni to
		super.startUp();
	}

	getMoving() {
		// console.log("už to jede");
		var ostatni = super.popDataOthers();
		// console.log("já objekt X",this.params.posX);
		// console.log("já objekt Y",this.params.posY);
		// console.log("já objekt váha",this.params.weight);
		for (var prop in ostatni) {
			// console.log("var prop",prop);
			// console.log("hodnoty X",super.popDataOthers()[prop].params.posX);
			// console.log("hodnoty Y",super.popDataOthers()[prop].params.posY);
			// console.log("váha",super.popDataOthers()[prop].params.weight);
			/**
			 * Následuje experimentální kód, který projde výpočetním zdokonalením (Energon)
			 */
			this.params.posX += 1;
			this.params.posY -= 1;
		}
		/**
		 * Uložení dat
		 * 
		 * parametr false umožňuje přepis existujících dat. ;-)
		 */
		super.pushData(false);
	}
}