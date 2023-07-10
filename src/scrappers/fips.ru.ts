import { FipsScrappedData } from "../../types/fips.types";
import { convertDotSeparatedDateToISO } from "../scripts/date-functions";

export async function scrapFips(
  browser: any,
  url: string
): Promise<FipsScrappedData | null> {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const data = await page.evaluate(async () => {
    const row = document.querySelectorAll("tr")[4] as any;

    if (!row) return;
    const stateRegistrationNumber = row.querySelector(
      "td#BibL p.bib:nth-child(1) b a"
    ).innerText;
    const applicationNumber = row.querySelector(
      "td#BibL p.bib:nth-child(2) b"
    )?.innerText;
    const expirationDate = row.querySelector(
      "td#BibL p.bib:nth-child(3) b"
    )?.innerText;
    const applicationDate = row.querySelector(
      "td#BibR p.bib:nth-child(1) b"
    )?.innerText;
    const registrationDate = row.querySelector(
      "td#BibR p.bib:nth-child(2) b"
    )?.innerText;
    const publicationDate = row.querySelector(
      "td#BibR p.bib:nth-child(3) b"
    )?.innerText;

    const imgTag = document.querySelector('p.bib a[target="_blank"] img');
    const imgUrl = imgTag ? imgTag.getAttribute("src") : null;

    const holderName = (document as any).querySelector(
      "p.bib:nth-child(4) b"
    )?.innerText;
    console.log("abc", holderName);
    const classLevel = (document as any).querySelector("p.bib:nth-child(5) b")
      ?.innerText as any;

    return {
      stateRegistrationNumber,
      applicationNumber,
      expirationDate,
      applicationDate,
      registrationDate,
      publicationDate,
      imgUrl,
      holderName,
      classLevel,
    };
  });

  if (!data) {
    console.log("No data found");
    return null;
  }

  const standardisedData = {
    ...data,
    standardisedDates: {
      applicationDate: convertDotSeparatedDateToISO(data.applicationDate),
      registrationDate: convertDotSeparatedDateToISO(data.registrationDate),
      publicationDate: convertDotSeparatedDateToISO(data.publicationDate),
      expirationDate: convertDotSeparatedDateToISO(data.expirationDate),
    },
  };
  return standardisedData;
}
