onmessage = function(e) {
    console.log(e);
    postMessage({
        value: "nazdar",
    });
}