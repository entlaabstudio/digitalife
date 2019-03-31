/**
 * Inicializační soubor Digitalife
 * 
 * Autor: Robert Rajs (c) 2019
 */

class Digitalife {
	
	constructor(dlParams) {

		this.dlParams = dlParams;
		this.ld();
		this.ins();

	}

	/**
	 * Nahraje do HTML5 úložiště vše potřebné
	 */
	
	ins() {
		console.log("nazdar");
	}
	
	/**
	 * Nahraje všechny potřebné skripty do HTML
	 */

	ld() {
		
		var filesToLoad = [];
		var i = 0;
		var that = this;
		
		$.each(this.dlParams.objekty, function() {
			if (filesToLoad.indexOf(this.engine) == -1) {
				filesToLoad[i] = this.engine;
				i++;
			}
		});
		
		$.each(filesToLoad, function() {
			var s = document.createElement("script");
			s.src = that.dlParams.enginePath + this;
			document.body.appendChild(s);
		});
		
	}

	/**
	 * Vyrobí název třídy z názvu souboru třídy
	 * 
	 * @param {string} fileName název souboru třídy
	 */
	
	getClassName(fileName) {
		var fileName;
		var extPos = fileName.indexOf(".js");
		return fileName.charAt(0).toUpperCase() + fileName.substring(0,extPos).slice(1) + "Engine";
	}

}