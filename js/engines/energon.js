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
		console.log("už to jede");
	}
}