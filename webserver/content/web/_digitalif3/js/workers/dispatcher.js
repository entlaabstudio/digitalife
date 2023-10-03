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
            obj: {
                ...value,
                id: parseInt(key)
            },
            cfg: cfg
        });

        this.W[key].onmessage = function(e) {
            if (e.data.status !== undefined) {
                if (e.data.status == "ok") {
                    that.workersReady++;
                }
            }

            console.log(e.data);
        }
    }

    runtime(e) {
        var that = this;
        var numOfWorkers = Object.entries(e.data.cfg.objs).length;
        for (const [key,value] of Object.entries(e.data.cfg.objs)) {
            this.workerInit(key,value);
        }
        
        var interval = setInterval(function() {
            if (that.workersReady == numOfWorkers) {
                clearInterval(interval);
                workersPushReferences();
            }
        },200);

        function workersPushReferences() {
            for (const [key,value] of Object.entries(that.W)) {
                for (const [key2,value2] of Object.entries(that.W)) {
                    if (key2 != key) {
                        value.postMessage({
                            cmd: "pushOtherWorker",
                            key: key2
                        });
                    }
                }
                value.postMessage({
                    cmd: "showOtherWorkers"
                });
            }
        }

        postMessage({
            cmd: "createWorkers",
            status: "ok"
        });
    }
}
