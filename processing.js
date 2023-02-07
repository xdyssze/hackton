// Jag får, kordinater, tar reda på land, osv skickar vidare till erik som tar fram data. och rutorn för den delen. Jag tar alla rutor, parsar, kollar generellt vilken plats som e bäst.
// skickar tillbaka en string i princip med vilka platser som är bäst, och second best
const TifGet = require('./geotiff/tiff_read.js');
const wc = require('which-country');


//
class ProcessingThread {
    country;
    point;
    tifHandler;
    height;
    data;
    constructor(d) {
        this.point = [d.cords];
        this.country = wc(Integer.valueOf(this.point[0]), Integer.valueOf(this.point[1]));
        this.height = d.height;
        tifHandler = new TifProcessing(get_power(this.country, this.height, this.point));
        this.cord = [(this.point[0] + this.tifHandler.cor[1]), (this.point[1] + this.tifHandler.cor[2])];
        this.data = {
            bestx:  this.cord[0],
            besty:  this.cord[1],
            best: this.tifHandler.cor[0]
        }
    }

    returnDataCreator() {
        var f = {
            "best": [this.data.bestx, this.data.besty, this.data.best],
            //"sec": [this.data.secx, this.data.secy, this.data.secx2, this.data.secy2],
           // "country": [this.data.country]
        };
        console.log("Data returned: " + f);
        return(JSON.stringify(f));
    };
}






class TifProcessing {
    // vi ska han en array med alla värden i ett område., som stoppas in efteråt.
    
    constructor(tif) {
        this.tif = tif;
        this.cor = this.getBiggest();
    }
    // skaffar i en viss ruta.

    getBiggest() {
        var a = this.tif[0];
        var biggest = a[0];
        
        for(var i = 0; i < a.length; i++) {
            if(a[i] >= biggest) {
                biggest = a[i];
            }
        }
        12*y + x
        var y = (i-(i%this.tif[1]))/this.tif[1];
        var x = (i%this.tif[1]);
        var xkord = ((xmax - xmin) / this.tif[1])*x;
        var ykord = ((ymax - ymin) / this.tif[2])*y;
        return([biggest, xkord, ykord]);
    }

    
}





//







// Data innehåller orgx, orgy, besty, bestx, secx, secy, secx2, secy2.








module.exports = ProcessingThread;


