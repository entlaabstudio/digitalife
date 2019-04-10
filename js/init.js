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

		var s = document.createElement("script");
		s.type = "text/ecmascript";
		s.src = "js/base.js";
		
		$("head").append(s).promise().done(function () {
			console.log(that);
			$.each(that.dlParams.objekty, function() {
				if (filesToLoad.indexOf(this.engine) == -1) {
					filesToLoad[i] = this.engine;
					i++;
				}
			});
			console.log(filesToLoad);
	
			$.each(filesToLoad, function() {
				var s = document.createElement("script");
				s.type = "text/ecmascript";
				s.src = that.dlParams.enginePath + this;
				$("head").append(s);
			});
			that.initClass();
		});
	}

	/**
	 * Inicializace tříd
	 */
	initClass() {

		var thatthat = this;
		var id = 0;
		$.each(this.dlParams.objekty, function(index, value) {
			var initCommand = "new " + thatthat.getClassName(value.engine) + "(index,value,id)";
			eval(initCommand);
			id++;
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
