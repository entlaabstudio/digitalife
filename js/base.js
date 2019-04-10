/**
 * Base Class pro Digitalife
 * 
 * Autor: Robert Rajs (c) 2019
 */

class DigitalifeBase {
	getID() {
		// var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
		// localStorage.setItem("")
		console.log(this.params,this.index);
		localStorage.index = this.index;
		return localStorage.index;
	}
}