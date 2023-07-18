import puppeteer from "puppeteer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const arrayOfUrls = [
  "https://www.fips.ru/fips_servl/fips_servlet?DB=RUTM&rn=1895&DocNumber=186745",
  "https://www.fips.ru/fips_servl/fips_servlet?DB=RUTM&rn=1895&DocNumber=186746",
  "https://www.fips.ru/fips_servl/fips_servlet?DB=RUTM&rn=1895&DocNumber=186747",
  "https://www.fips.ru/fips_servl/fips_servlet?DB=RUTM&rn=1895&DocNumber=186748",
  "https://www.fips.ru/fips_servl/fips_servlet?DB=RUTM&rn=1895&DocNumber=186749",
  "https://www.fips.ru/fips_servl/fips_servlet?DB=RUTM&rn=1895&DocNumber=186750",
];

async function extractTrademarkInformation(url: string) {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  //
  // const url = "https://fips.ru/registers-doc-view/fips_servlet?DB=RUPAT&DocNumber=201773&TypeFile=html";
  await page.goto(url);

  const data = await page.evaluate(async () => {
    const docType = document.evaluate(
      "//td[contains(., 'Заявка на регистрацию товарного знака (знака обслуживания)')]",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue
      ? "trademarkApplication"
      : "trademarkCertificate";
    console.log(docType);

    function getValueByITag(ITag: any) {
      // go four elements up and get the value of b tag
      return ITag.parentElement.querySelector("b").innerText;
    }

    function convertDotSeparatedDateToISO(date: string) {
      const [day, month, year] = date.split(".");

      try {
        return new Date(`${year}-${month}-${day}`).toISOString();
      } catch (error) {
        return null;
      }
    }
    function getClasses() {
      const classesTag = document.evaluate(
        "//i[contains(., 'Классы МКТУ и перечень товаров и/или услуг:')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      if (classesTag) {
        //  check if the parent of the tag has multiple b tags, if yes get all the b tags and return their innerText
        const parent = classesTag.parentElement;
        const allB = parent?.querySelectorAll("b");
        if (!allB) return null;
        const classes = [];
        for (let i = 0; i < allB.length; i++) {
          classes.push(allB[i].innerText);
        }
        return classes;
      }
    }
    // EXTRACTION FUNCTIONS

    let data: any = {
      documentType: docType,
      langCode: "RU",
      registrationNumber: null,
      registrationExpiryDate: null,
      registrationExtendedTill: null,
      registrationDate: null,
      applicationNumber: null,
      applicationDate: null,
      publicationDate: null,
      imageIdLocal: null,
      unprotectedTrademarkElements: null,
      applicant: null,
      addressForCorrespondence: null,
      classes: null,
      copyRightHolder: null,
      colorCombination: [],
    };

    function handleApplication() {
      const allB = document.querySelectorAll("b");
      data.registrationNumber = parseInt(allB[0].innerText);
      data.applicationNumber = parseInt(allB[1].innerText);
      data.registrationExpiryDate = convertDotSeparatedDateToISO(
        allB[2].innerText
      );
      data.applicationDate = convertDotSeparatedDateToISO(allB[3].innerText);
      data.registrationDate = convertDotSeparatedDateToISO(allB[4].innerText);
      data.publicationDate = convertDotSeparatedDateToISO(allB[5].innerText);

      // check if an i tag exists with inner value Имя правообладателя:
      const copyRightHolderTag = document.evaluate(
        "//i[contains(., 'Имя правообладателя:')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      if (copyRightHolderTag) {
        data.copyRightHolder = getValueByITag(copyRightHolderTag);
      }

      const unprotectedTrademarkElementsTag = document.evaluate(
        "//i[contains(., 'Неохраняемый элемент товарного знака: ')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      if (unprotectedTrademarkElementsTag) {
        data.unprotectedTrademarkElements = getValueByITag(
          unprotectedTrademarkElementsTag
        );
      }

      const colorCombinationTag = document.evaluate(
        "//i[contains(., 'Указание цвета или цветового сочетания: ')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,

        null
      ).singleNodeValue;
      if (colorCombinationTag) {
        data.colorCombination = getValueByITag(colorCombinationTag).split(", ");
      }
    }
    data.classes = getClasses();
    handleApplication();
    return data;
  });

  console.log("data", data);

  await prisma.intellectualProperty.create({
    data: {
      ...data,
    },
  });
}
async function test() {
  for (let i = 0; i < arrayOfUrls.length; i++) {
    await extractTrademarkInformation(arrayOfUrls[i]);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

test();
