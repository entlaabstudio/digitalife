onmessage = function(e) {
    console.log(e.data);

    if (e.data.cmd == "init") {
        var data = e.data
        postMessage({
            init: "ok"
        });
    }

    postMessage({
        value: data,
    });
}