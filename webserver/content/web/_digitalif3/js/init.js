class Digitalif3 {
    constructor(dlParams) {
        fetch('./json/digitalif3.conf.json')
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            this.conf = json;
            this.dlParams = dlParams;
            console.log(dlParams);
        });
    }
}