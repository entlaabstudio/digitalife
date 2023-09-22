class Digitalif3 {
    constructor(dlParams) {
        fetch('./json/digitalif3.conf.json')
        .then((response) => response.json())
        .then((json) => {
            this.conf = json;
            this.dlParams = dlParams;
            this.console.info(json)
            this.console.info(dlParams);
            this.init();
        });
    }
    init() {
        var c = this.console;
        c.info("ahoj");
    }
    console = {
        info(any) {
            var that = globalThis.DL3;
            console.info(
                '[' + that.conf.app.info.name + ' ' + that.conf.app.info.version + ']',
                any
            );
        }
    }
}