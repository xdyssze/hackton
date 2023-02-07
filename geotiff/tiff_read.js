import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import fetch from "node-fetch";

async function get_power(country, height, coords) {
  const response = await fetch("https://globalwindatlas.info/api/gis/country/SWE/power-density/100");
  const arrayBuffer = await response.arrayBuffer();
  const tiff = await fromArrayBuffer(arrayBuffer);

  const data = await tiff.readRasters({
    bbox: coords
  });

  return(data)
}

const coords = [16.474484, 56.559733, 16.502838, 56.543965];
get_power("SWE", "100", coords);