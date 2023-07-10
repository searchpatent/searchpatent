import fs from "fs";
import { parse } from "csv-parse";

/**
 * Parses the csv dataset from fips.ru and returns the document Ids
 *
 * @param   {string}  path  The path to the csv file
 * @param   {number}  from  The starting line
 * @param   {number}  countTo  Number of lines to parse
 * @returns {Promise<number[]>}  The document Ids
 *
 */
export function parseCsv(
  path: string,
  from: number,
  countTo: number
): Promise<number[]> {
  return new Promise((resolve, reject) => {
    let arr: number[] = [];
    fs.createReadStream(path)
      .pipe(parse({ delimiter: ",", from_line: from, to: countTo }))
      .on("data", function (row) {
        arr.push(row[0]);
        resolve(arr);
      })
      .on("end", function () {
        resolve(arr);
      });
  });
}
