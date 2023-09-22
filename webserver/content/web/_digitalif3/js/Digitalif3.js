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
        var cfg = this.conf;
        c.info("aahoj");
        c.info(this.conf)
        c.info(this.dlParams.objekty);

        var i = 0;
        for (const [key, value] of Object.entries(this.dlParams.objekty)) {
            console.log(key,value);
            this.runtimeTicker = [];
            this.runtimeTicker[i] = setInterval(
                function() {
                    if (!cfg.app.settings.global.paused) {
                        if (cfg.app.settings.global.zeroPoints.consoleInfo) {
                            c.info(
                                value.fps + 'fps of object ' + key + ' | ' +
                                cfg.app.settings.global.fpsLimit + 'fps global limit' + ' | ' +
                                cfg.app.settings.global.slowdownMultiplier + "x slower"
                            );
                        }
                    }
                }, (
                    1000 / value.fps >= 1000 / cfg.app.settings.global.fpsLimit ? 1000 / value.fps : 1000 / cfg.app.settings.global.fpsLimit
                ) * cfg.app.settings.global.slowdownMultiplier
            );
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