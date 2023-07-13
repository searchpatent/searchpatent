import fs from "fs";
import https from "https";
import { v4 as uuidv4 } from "uuid";

/**
 * Download and store file by url
 * @param {string} url - url of file
 *
 * @returns {Promise} - Promise object represents the file
 *
 */
export function downloadFileAndStoreByUrl(
  filename: string = uuidv4(),
  url: string
) {
  return new Promise((resolve, reject) => {
    const fileExt = url.split(".").pop();
    // store in assets folder
    const file = fs.createWriteStream(`./assets/${filename + "." + fileExt}`);

    https.get(convertHttpToHttps(url), (response) => {
      response.pipe(file);

      file.on("finish", () => {
        file.close();
        resolve(file);
      });
    });
  });
}

function convertHttpToHttps(url: string) {
  return url.replace("http://", "https://");
}
