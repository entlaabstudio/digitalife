/**
 * Base Class pro Digitalife
 * 
 * Autor: Robert Rajs (c) 2019
 */

class DigitalifeBase {
	
	/**
	 * Uloží data objektu do lokální databáze
	 */
	pushData() {

		var data = [];
		data["index"] = this.index;
		data["params"] = this.params;

		data = this.toObject(data);
		
		var dataJSON = JSON.stringify(data);

		localStorage.setItem(this.id,dataJSON);

	}

	/**
	 * Vrátí parametry objektu z lokální databáze
	 */
	popData() {
		return JSON.parse(localStorage.getItem(this.id)).params;
	}

	/**
	 * Vrátí parametry ostatních objektů z lokální databáze
	 */
	popDataOthers() {
		var ret = {};
		var that = this;
		for (var i = 0, len = localStorage.length; i < len; ++i) {
			if (i !== that.id) {
				ret[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
			}
		}
		return this.toObject(ret);
	}

	/**
	 * Převádí rekurzivně pole na objekt
	 * 
	 * @param {array} array 
	 */
	toObject(array) {
		var thisEleObj = new Object();
		if(typeof array == "object"){
			for(var i in array){
				var thisEle = this.toObject(array[i]);
				thisEleObj[i] = thisEle;
			}
		} else {
			thisEleObj = array;
		}
		return thisEleObj;
	}
}