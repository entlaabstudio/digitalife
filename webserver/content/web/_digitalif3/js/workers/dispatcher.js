onmessage = function(e) {
    if (e.data.cmd !== undefined) {
        if (e.data.cmd == "createWorkers") {
            Dispatcher = new WDispatcher(e)
        }
    }
}

class WDispatcher {
    constructor(e) {
        this.conf = e.data.cfg;
        this.W = [];
        this.workersReady = 0;
        this.runtime(e);
    }

    workerInit(key,value) {
        var cfg = this.conf;
        var that = this;

        console.log(key,value);
        this.W[key] = new Worker(value.engine);
        
        this.W[key].postMessage({
            cmd: "init",
            obj: value,
            cfg: cfg
        });

        this.W[key].onmessage = function(e) {
            if (e.data.init !== undefined) {
                if (e.data.init == "ok") {
                    console.log("jsem OK!");
                    that.workersReady++;
                }
            }
        }
    }

    runtime(e) {
        var that = this;
        console.log(e.data.cfg.objs);
        for (const [key,value] of Object.entries(e.data.cfg.objs)) {
            this.workerInit(key,value);

            console.log(key,value);
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
                            // worker: value2
                        });
                    }
                }
            }

            console.log(that.W);
        }

        postMessage({
            cmd: "createWorkers",
            status: "ok"
        });
    }
}
