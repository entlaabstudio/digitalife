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
        this.post({
            status: "ok"
        })
    }

    showOtherWorkers(e) {
        this.data.cmd = e.data.cmd;
        this.post({
            otherWorkers: this.otherWorkers
        });
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