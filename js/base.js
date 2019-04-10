/**
 * Base Class pro Digitalife
 * 
 * Autor: Robert Rajs (c) 2019
 */

class DigitalifeBase {
	pushData() {

		var data = [];
		data[this.id] = [];
		data[this.id]["index"] = this.index;
		data[this.id]["params"] = this.params;

		data = this.toObject(data);
		
		var dataJSON = JSON.stringify(data);

		// localStorage.removeItem(this.id);
		localStorage.setItem(this.id,dataJSON);
		return localStorage.length;
	}

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