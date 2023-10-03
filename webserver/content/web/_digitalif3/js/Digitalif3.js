class Digitalif3 {
    constructor(dlParams) {
        fetch('./json/digitalif3.conf.json')
        .then((response) => response.json())
        .then((json) => {
            this.conf = {
                ...json,
                ...dlParams
            }
            this.runtimeTicker = [];
            this.W = [];
            this.init();
        });
    }
    init() {
        this.runtime();
    }
    
    runDispatcher() {
        var cfg = this.conf;

        this.WDispatcher = new Worker(cfg.app.settings.system.workers.path + "dispatcher.js");

        this.WDispatcher.postMessage({
            cmd: "createWorkers",
            cfg: cfg
        });
        
        this.WDispatcher.onmessage = function(e) {
            console.log(e.data);
        };
    }
        
    runtime() {
        var c = this.console;
        
        c.info(this.conf)
        this.runDispatcher();
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