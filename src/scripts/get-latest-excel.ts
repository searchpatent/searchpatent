// Link to the open register of trademarks and service marks of the russian federation
// https://rospatent.gov.ru/opendata/7730176088-tz

// latest link as of 9 July 5:31 PM PDT
// https://rospatent.gov.ru/opendata/7730176088-tz/data-20230701-structure-20180828.csv
import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";
// download and save the latest excel file in the files folder

export async function downloadLatestDatasetOrigin() {
  const latestDatasetOrigin =
    "https://rospatent.gov.ru/opendata/7730176088-tz/data-20230701-structure-20180828.csv";
  const latestDatasetOriginFilename = "latest-dataset-origin.csv";
  const latestDatasetOriginPath = path.join(
    __dirname,
    "..",
    "..",
    "files",
    latestDatasetOriginFilename
  );

  const file = fs.createWriteStream(latestDatasetOriginPath);
  const response = await fetch(latestDatasetOrigin, {
    method: "GET",
    headers: {
      //   "Content-Type": "text/csv",
    },
  });
  await new Promise((resolve: any, reject: any) => {
    if (!response.body) {
      reject("No response body");
    }
    response?.body?.pipe(file);
    response?.body?.on("error", reject);
    file.on("finish", resolve);
  });
}
