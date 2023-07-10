import puppeteer from "puppeteer";
import { scrapFips } from "./src/scrappers/fips.ru";
import { addTradeMark } from "./src/scripts/insert-trademark";
import { parseCsv } from "./src/scripts/parse-csv";
import * as fs from "fs";
import { downloadLatestDatasetOrigin } from "./src/scripts/get-latest-excel";
async function test(from: number, to: number) {
  // read the sample dataset and get the docuemntId from index 0 and then log the documentId
  const sampleDatasetPath = "./files/latest-dataset-origin.csv";
  // check if the file exists
  if (!fs.existsSync(sampleDatasetPath)) {
    await downloadLatestDatasetOrigin();
  }

  // launch the browser
  const browser = await puppeteer.launch({
    headless: false,
  });

  // parse the csv file and get the documentIds
  const docIds: number[] = await parseCsv(sampleDatasetPath, from, to);

  for (let i = 0; i < docIds.length; i++) {
    // wait 3 seconds to avoid getting blocked by the website, rate limit is 3 second between each request from same host
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const scrapedData = await scrapFips(
      browser,
      "https://new.fips.ru/registers-doc-view/fips_servlet?DB=RUTM&DocNumber=" +
        docIds[i]
    );
    if (!scrapedData) {
      return;
    }
    await addTradeMark(
      scrapedData.holderName,
      scrapedData.classLevel,
      parseInt(scrapedData.stateRegistrationNumber),
      parseInt(scrapedData.applicationNumber),
      scrapedData.standardisedDates.registrationDate,
      scrapedData.standardisedDates.registrationDate,
      scrapedData.standardisedDates.expirationDate,
      scrapedData.imgUrl,
      scrapedData.holderName
    );
  }
}

// call the function
test(2000, 5);
