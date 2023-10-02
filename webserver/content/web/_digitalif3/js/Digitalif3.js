class Digitalif3 {
    constructor(dlParams) {
        fetch('./json/digitalif3.conf.json')
        .then((response) => response.json())
        .then((json) => {
            this.conf = json;
            this.dlParams = dlParams;
            this.runtimeTicker = [];
            this.init();
        });
    }
    init() {
        this.runtime();
    }

    runWorker(objId,value) {
        var c = this.console;
        var cfg = this.conf;
        var objId;
        var value;

        var that = this;
        var W = new Worker(cfg.app.settings.system.workers.path + value.engine);
        this.runtimeTicker[objId] = setInterval(
            function() {
                if (!cfg.app.settings.global.paused) {
                    W.postMessage({
                        objs: that.dlParams
                    });
                    
                    if (cfg.app.settings.global.zeroPoints.consoleInfo) {
                        c.info(
                            value.fps + 'fps of object ' + objId + ' | ' +
                            cfg.app.settings.global.fpsLimit + 'fps global limit' + ' | ' +
                            cfg.app.settings.global.slowdownMultiplier + "x slower"
                        );
                    }
                }
            }, (
                1000 / value.fps >= 1000 / cfg.app.settings.global.fpsLimit ? 1000 / value.fps : 1000 / cfg.app.settings.global.fpsLimit
            ) * cfg.app.settings.global.slowdownMultiplier
        );

        ////////////////////////////////////// TOTO PAK ZAPNOUT
        // W.onmessage = function(e) {
        //     console.log(objId + " vrací: ",e.data);
        // }
    }
    
    runtime() {
        var c = this.console;

        c.info(this.conf)
        c.info(this.dlParams.objekty);

        this.worker = [];

        for (const [key,value] of Object.entries(this.dlParams.objekty)) {
            var that = this;
            this.runWorker(key,value);
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