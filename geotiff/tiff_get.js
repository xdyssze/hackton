const fs = require("fs");
const request = require("request");


function callback(message) {
  console.warn(message);
  return;
}

const download = (url, dest, cb) => {
  const file = fs.createWriteStream(dest);
  const sendReq = request.get(url);
  
  // Verify response code
  sendReq.on("response", (response) => {
      if (response.statusCode !== 200) {
          return cb("Response status was " + response.statusCode);
      }

      sendReq.pipe(file);
  });

  file.on("finish", () => file.close(cb));

  // Request errors
  sendReq.on("error", (err) => {
      fs.unlink(dest, () => cb(err.message)); // Delete the partial file
  });

  file.on("error", (err) => {
      fs.unlink(dest, () => cb(err.message));
  });
};


const country = "SWE";
const height = "100";
// download .tif
download(`https://globalwindatlas.info/api/gis/country/${country}/power-density/${height}`, `./db/${country}_${height}m.tif`, callback);
// testt