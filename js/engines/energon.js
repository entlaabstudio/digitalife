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
			/**
			 * Následuje experimentální kód, který projde výpočetním zdokonalením (Energon)
			 */
			
			// console.log("váha",super.popDataOthers()[prop].params.weight);
			var otherPosX = super.popDataOthers()[prop].params.posX;
			var otherPosY = super.popDataOthers()[prop].params.posY;
			
			var accXChange = ((otherPosX > this.params.posX) ? this.params.acclrX += 1 : this.params.acclrX -= 1);
			var accYChange = ((otherPosY > this.params.posY) ? this.params.acclrY += 1 : this.params.acclrY -= 1);
			
			this.params.acclrX = accXChange;
			this.params.acclrY = accYChange;
			
			this.params.posX += accXChange;
			this.params.posY += accYChange;
		}
		/**
		 * Uložení dat
		 * 
		 * parametr false umožňuje přepis existujících dat. ;-)
		 */
		super.pushData(false);
	}
}