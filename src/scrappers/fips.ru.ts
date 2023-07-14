import { FipsScrappedData } from "../../types/fips.types";
import { convertDotSeparatedDateToISO } from "../scripts/date-functions";

export async function scrapFips(browser: any, url: string): Promise<any> {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const data = await page.evaluate(async () => {
    const translationMap: any = {
      "Номер государственной регистрации: ": "stateRegisterationNumber",
      "Номер заявки: ": "applicationNumber",
      "Дата истечения срока действия исключительного права: ":
        "registrationExpiryDate",
      "Дата подачи заявки: ": "applicationDate",
      "Дата государственной регистрации: ": "registrationDate",
      "Дата публикации: ": "publicationDate",
      "Правообладатель: ": "copyRightOwner",
      "Классы МКТУ и перечень товаров и/или услуг:": "classes",
    };
    // get tag font with inner text value of Registration number: then move 4 tags up to get the value of inner text of the nested b tag
    const allItags = document.querySelectorAll("i");
    // loop over every i
    for (let i = 0; i < allItags.length; i++) {
      // in every i go 2 tags up to get the parent element and then get the value of b tag under the parent elem
      const parentElem = allItags[i].parentElement as any;
      if (parentElem) {
        const bTag = parentElem.querySelector("b");
        if (bTag) {
          // use translation map to get the key of the object
          const key = translationMap[allItags[i].innerText];
          if (key) {
            // get the value of the next sibling of the parent element
            const value = parentElem.nextElementSibling?.querySelector("b");
            // set the value of the key of the object
            console.log(key, value);
            return { [key]: value?.innerText };
          }
        }
      }
    }
  });
  console.log(data);
}
