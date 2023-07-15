const puppeteer = require("puppeteer");

async function extractTrademarkInformation() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load the HTML content
  const htmlContent = `YOUR_HTML_CONTENT_HERE`;
  await page.setContent(htmlContent);

  // Extract the trademark information
  const trademarkData = {};

  // Agency
  const agencyElement = await page.$("#BibGerb");
  trademarkData.agency = await page.evaluate(
    (element) => element.textContent.trim(),
    agencyElement
  );

  // Trademark Registration Number
  const registrationNumberElement = await page.$("#BibL a");
  trademarkData.registrationNumber = await page.evaluate(
    (element) => element.textContent.trim(),
    registrationNumberElement
  );

  // Status
  const statusElement = await page.$(".Status");
  trademarkData.status = await page.evaluate(
    (element) => element.textContent.trim(),
    statusElement
  );

  // Trademark Type
  const trademarkTypeElement = await page.$("#BibType");
  trademarkData.trademarkType = await page.evaluate(
    (element) => element.textContent.trim(),
    trademarkTypeElement
  );

  // Application Number
  const applicationNumberElement = await page.$("#BibL p:nth-child(2) b");
  trademarkData.applicationNumber = await page.evaluate(
    (element) => element.textContent.trim(),
    applicationNumberElement
  );

  // Registration Expiration Date
  const expirationDateElement = await page.$("#BibL p:nth-child(3) b");
  trademarkData.expirationDate = await page.evaluate(
    (element) => element.textContent.trim(),
    expirationDateElement
  );

  // Application Date
  const applicationDateElement = await page.$("#BibR p:nth-child(1) b");
  trademarkData.applicationDate = await page.evaluate(
    (element) => element.textContent.trim(),
    applicationDateElement
  );

  // Registration Date
  const registrationDateElement = await page.$("#BibR p:nth-child(2) b");
  trademarkData.registrationDate = await page.evaluate(
    (element) => element.textContent.trim(),
    registrationDateElement
  );

  // Publication Date
  const publicationDateElement = await page.$("#BibR p:nth-child(3) b");
  trademarkData.publicationDate = await page.evaluate(
    (element) => element.textContent.trim(),
    publicationDateElement
  );

  await browser.close();

  return trademarkData;
}

// Call the function and handle missing values
extractTrademarkInformation()
  .then((trademarkData) => {
    // Handle missing values
    trademarkData.agency = trademarkData.agency || "N/A";
    trademarkData.registrationNumber =
      trademarkData.registrationNumber || "N/A";
    trademarkData.status = trademarkData.status || "N/A";
    trademarkData.trademarkType = trademarkData.trademarkType || "N/A";
    trademarkData.applicationNumber = trademarkData.applicationNumber || "N/A";
    trademarkData.expirationDate = trademarkData.expirationDate || "N/A";
    trademarkData.applicationDate = trademarkData.applicationDate || "N/A";
    trademarkData.registrationDate = trademarkData.registrationDate || "N/A";
    trademarkData.publicationDate = trademarkData.publicationDate || "N/A";

    // Use the extracted trademark information
    console.log("Trademark Agency:", trademarkData.agency);
    console.log(
      "Trademark Registration Number:",
      trademarkData.registrationNumber
    );
    console.log("Trademark Status:", trademarkData.status);
    console.log("Trademark Type:", trademarkData.trademarkType);
    console.log(
      "Trademark Application Number:",
      trademarkData.applicationNumber
    );
    console.log("Trademark Expiration Date:", trademarkData.expirationDate);
    console.log("Trademark Application Date:", trademarkData.applicationDate);
    console.log("Trademark Registration Date:", trademarkData.registrationDate);
    console.log("Trademark Publication Date:", trademarkData.publicationDate);
  })
  .catch((error) => {
    console.error("Error extracting trademark information:", error);
  });
