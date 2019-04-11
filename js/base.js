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

		var preferLocalStorage = this.params.preferLocalStorage;
		this.params.preferLocalStorage = true;
		var data = {};
		data["index"] = this.index;
		data["params"] = this.params;
		
		var dataJSON = JSON.stringify(data);

		if (preferLocalStorage) {
			if (this.popData() === false) {
				localStorage.setItem(this.id,dataJSON);
			}
		} else {
			localStorage.setItem(this.id,dataJSON);
		}

	}

	/**
	 * Načte parametry objektu z lokální databáze
	 */
	popData() {
		var ret = localStorage.getItem(this.id);
		
		if (ret !== null) {
			this.params = JSON.parse(ret).params
			return this.params;
		} else {
			return false;
		}
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
		return ret;
	}
	
	/**
	 * Tady se to zapne
	 */
	startUp() {
		var that = this;
		this.tick = setInterval(function() {
			that.getMoving();
		},1000 / this.params.fps);
	}
}