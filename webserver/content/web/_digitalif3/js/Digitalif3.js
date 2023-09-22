class Digitalif3 {
    constructor(dlParams) {
        fetch('./json/digitalif3.conf.json')
        .then((response) => response.json())
        .then((json) => {
            this.conf = json;
            this.dlParams = dlParams;
            this.init();
        });
    }
    init() {
        this.runtime();
    }

    runtime() {
        var c = this.console;
        c.info("aahoj");
        c.info(this.conf)
        c.info(this.dlParams.objekty);

        var i = 0;
        for (const [key, value] of Object.entries(this.dlParams.objekty)) {
            console.log(key,value);
            this.runtimeTicker = [];
            this.runtimeTicker[i] = setInterval(function() {
                console.log(key);
            },200000 / value.fps); // TODO: ),1000 / value.fps);
            i++;
        }
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