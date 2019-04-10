/**
 * Base Class pro Digitalife
 * 
 * Autor: Robert Rajs (c) 2019
 */

class DigitalifeBase {
    constructor() {
        this.engineID = 0;
    }

    getID() {
        this.engineID += 1;
        return this.engineID;
    }
}