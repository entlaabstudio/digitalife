/**
 * Inicializační soubor Digitalife
 * 
 * Autor: Robert Rajs (c) 2019
 */

class Digitalife {

	constructor(dlParams) {

		this.dlParams = dlParams;
		this.ld();

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

		this.initClass();

	}

	/**
	 * Inicializace tříd
	 */
	initClass() {

		var thatthat = this;
		$.each(this.dlParams.objekty, function(index, value) {
			setTimeout(function() {
				var initCommand = "new " + thatthat.getClassName(value.engine) + "(index,value)";
				eval(initCommand);
			},500);
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