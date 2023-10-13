onmessage = function(e) {
    switch(e.data.cmd) {
        case "init": this.Energon = new Energon(e);
        case "run": this.Energon.run(e);
        case "pushOtherWorker": this.Energon.pushOtherWorker(e);
        case "showOtherWorkers": this.Energon.showOtherWorkers(e);
        case "pushOtherObjData": console.warn("getting other object",e.data);
    }
}

class Energon {
    constructor(e) {
        this.data = e.data;
        this.otherWorkers = [];

        this.init();
    }

    init() {
        this.wasInit = true;
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

                acclrX++; // TODO: delete this row
                acclrY--; // TODO: delete this row
                posX++; // TODO: delete this row
                posY--; // TODO: delete this row

                // pop
                for (const [key,value] of Object.entries(otherWorkers)) {
                    that.data.cmd = "pop";
                    that.post({
                        objId: value
                    });
                }
                
                // push
                that.data.cmd = "push";
                that.post({
                    obj: {
                        acclrX,
                        acclrY,
                        posX,
                        posY,
                        weight,
                    }
                });
                
                tick(that); // TODO: pause will be here

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