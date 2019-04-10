/**
 * Base Class pro Digitalife
 * 
 * Autor: Robert Rajs (c) 2019
 */

class DigitalifeBase {
	pushData() {

		var data = [];
		data[this.id] = [];
		data[this.id][0] = this.index;
		data[this.id][1] = this.params;

		var dataJSON = JSON.stringify(data);

		console.log(data,dataJSON);
		
		
		// localStorage.obj = [index => "ahoj"];



		// localStorage.removeItem("ahoj");
		return localStorage.length;
	}
}