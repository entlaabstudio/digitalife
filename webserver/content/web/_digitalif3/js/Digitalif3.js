class Digitalif3 {
    constructor(dlParams) {
        fetch('./json/digitalif3.conf.json')
        .then((response) => response.json())
        .then((json) => {
            this.conf = json;
            this.dlParams = dlParams;
            this.runtimeTicker = [];
            this.W = [];
            this.init();
        });
    }
    init() {
        this.runtime();
    }

    // runWorker(objId,value) {
    //     var c = this.console;
    //     var cfg = this.conf;
    //     var objId;
    //     var value;

    //     var that = this;
    //     var W = new Worker(cfg.app.settings.system.workers.path + value.engine);
    //     this.runtimeTicker[objId] = setInterval(
    //         function() {
    //             if (!cfg.app.settings.global.paused) {
    //                 W.postMessage({
    //                     objs: that.dlParams
    //                 });
                    
    //                 if (cfg.app.settings.global.zeroPoints.consoleInfo) {
    //                     c.info(
    //                         value.fps + 'fps of object ' + objId + ' | ' +
    //                         cfg.app.settings.global.fpsLimit + 'fps global limit' + ' | ' +
    //                         cfg.app.settings.global.slowdownMultiplier + "x slower"
    //                     );
    //                 }
    //             }
    //         }, (
    //             1000 / value.fps >= 1000 / cfg.app.settings.global.fpsLimit ? 1000 / value.fps : 1000 / cfg.app.settings.global.fpsLimit
    //         ) * cfg.app.settings.global.slowdownMultiplier
    //     );

    //     ////////////////////////////////////// TOTO PAK ZAPNOUT
    //     // W.onmessage = function(e) {
    //     //     console.log(objId + " vrací: ",e.data);
    //     // }
    // }
    
    workerInit(key,value) {
        var cfg = this.conf;
        var that = this;

        console.log(key,value);
        this.W[key] = new Worker(cfg.app.settings.system.workers.path + value.engine);
        
        this.W[key].postMessage({
            cmd: "init",
            obj: value,
            cfg: cfg
        });

        this.W[key].onmessage = function(e) {
            console.log(e.data);

            if (e.data.init !== undefined) {
                if (e.data.init == "ok") {
                    console.log("jsem OK!");
                    that.workersReady++;
                }
            }
        }
    }
        
    runtime() {
        var c = this.console;
        var that = this;

        c.info(this.conf)
        c.info(this.dlParams.objekty);

        this.workersReady = 0;

        for (const [key,value] of Object.entries(this.dlParams.objekty)) {
            var that = this;
            // this.runWorker(key,value);
            this.workerInit(key,value);
        }

        var interval = setInterval(function() {
            if (that.workersReady == 2) {
                clearInterval(interval);
                workersPushReferences();
            }
        },200);

        function workersPushReferences() {
            for (const [key,value] of Object.entries(that.W)) {
                console.log(value.postMessage({
                    ahoj: "nazdar"
                }));
                
                for (const [key2,value2] of Object.entries(that.W)) {
                    if (key2 != key) {
                        value.postMessage({
                            cmd: "pushOtherWorker",
                            worker: value2
                        });
                    }
                }
            }

            console.log(that.W);
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