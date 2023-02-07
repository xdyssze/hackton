const { Console } = require("console");
const fs = require("fs");
const request = require("request");

function format_path (country, height) {
  return `./db/${country}_${height}m.tif`;
}

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


function get_tiff(country, height) {
  if (fs.existsSync(format_path(country, height))) {
    // File already exists
    console.log("File already exists.");
    return;
  }
  console.log("Downloading file...");
  download(`https://globalwindatlas.info/api/gis/country/${country}/power-density/${height}`, format_path(country, height), callback)
}

const country = "SWE";
const height = "100";
// download .tif
get_tiff(country, height);