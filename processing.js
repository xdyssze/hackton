// Jag får, kordinater, tar reda på land, osv skickar vidare till erik som tar fram data. och rutorn för den delen. Jag tar alla rutor, parsar, kollar generellt vilken plats som e bäst.
// skickar tillbaka en string i princip med vilka platser som är bäst, och second best
const TifGet = require('./tifget');
const wc = require('which-country');



//
class processingThread {
    country;
    point;
    tif;
    constructor(d) {
        this.point = [d.pointX, d.pointY];
        this.country = wc([d.pointX, d.pointY]);
        this.tif = tifGet(this.country);
    }









    
    returnDataCreator(data) {
        var f = {
            "org": [data.orgx, data.orgy],
            "best": [data.bestx, data.besty],
            "sec": [data.secx, data.secy, data.secx2, data.secy2],
            "country": [data.country]
        };
        console.log("Data returned: " + f);
        return(JSON.stringify(f));
    };
}






//







// Data innehåller orgx, orgy, besty, bestx, secx, secy, secx2, secy2.








module.exports = {};

