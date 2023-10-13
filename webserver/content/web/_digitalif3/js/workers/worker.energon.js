onmessage = function(e) {
    if (e.data.cmd == "init") {
        this.Energon = new Energon(e);
    }

    if (e.data.cmd == "pushOtherWorker") {
        this.Energon.pushOtherWorker(e);
    }

    if (e.data.cmd == "showOtherWorkers") {
        this.Energon.showOtherWorkers(e);
    }
}

class Energon {
    constructor(e) {
        this.data = e.data;
        this.otherWorkers = [];

        this.init();
    }

    init() {
        this.run()

        this.post({
            status: "ok" // must be ok
        })
    }

    showOtherWorkers(e) {
        this.data.cmd = e.data.cmd;
        this.post({
            otherWorkers: this.otherWorkers
        });
    }

    run() {
        var cfg = this.data.cfg.app.settings;
        var otherWorkers = this.otherWorkers;
        var fpsLimitMs = 1000 / cfg.global.fpsLimit;
        var slowdownMultiplier = cfg.global.slowdownMultiplier;
        
        var id = this.data.obj.id; // object id
        var fpsMs = 1000 / this.data.obj.fps;
        var posX = this.data.obj.posX;
        var posY = this.data.obj.posY;
        var weight = this.data.obj.weight;
        var acclrX = this.data.obj.acclrX;
        var acclrY = this.data.obj.acclrY;
        var interaction = this.data.obj.interaction;

        if (fpsLimitMs > fpsMs) {
            fpsMs = fpsLimitMs;
        }
        
        // console.warn( // no delete for this time
        //     cfg,
        //     otherWorkers,
        //     fpsLimitMs,
        //     fpsMs,
        //     acclrX,
        //     acclrY,
        //     id,
        //     interaction,
        //     posX,
        //     posY,
        //     weight,
        //     slowdownMultiplier,
        //     // this.data.obj
        // );

        tick(this); // first tick

        function tick(that) {
            setTimeout(function() {
                console.error('object ' + id + ' is in good condition');

                tick(that);
            },that.slow(fpsMs));
        }
    }

    slow(ms) {
        return ms * this.data.cfg.app.settings.global.slowdownMultiplier;
    }
    
    pushOtherWorker(e) {
        this.data.cmd = e.data.cmd;
        if (this.otherWorkers.push(parseInt(e.data.key))) {
            this.post({
                key: e.data.key,
                status: "ok"
            });
        } else {
            this.post({
                status: "err"
            });
        }
    }

    post(e) {
        postMessage({
            cmd: this.data.cmd,
            id: this.data.obj.id,
            ...e
        });
    }
}