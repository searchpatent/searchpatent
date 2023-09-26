import elastic from "@elastic/elasticsearch";
import { getIPs } from "../intellectual-property/controller";
const client = new elastic.Client({ node: "http://localhost:9200" });

export async function ping() {
  const result = await client.ping();
  return result;
}

export async function initIndex(index: string) {
  const result = await client.indices.create({ index });
  console.log(result);
}

export async function indexExists(index: string) {
  const result = await client.indices.exists({ index });
  console.log(result);
}

export async function initMapping(index: string, body: any) {
  console.log(body);
  try {
    const result = await client.indices.putMapping({ index, body });
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
}

export async function addDocument(index: string, body: any) {
  const result = await client.index({ index, body });
}

export async function search(index: string, body: any) {
  console.log(body);
  const result = await client.search({
    index,
    // do fuzzy search
    from: 0,
    size: 1000,
    query: {
      multi_match: {
        query: body,
        fields: [
          "unprotectedTrademarkElements",
          "registrationNumber",
          "verbalDesignation",
          "copyRightHolder",
        ],
        boost: 1,
        lenient: true,
        fuzziness: 2,
        type: "most_fields",
      },
    },
    // sort by score
    sort: [
      {
        _score: {
          order: "desc",
        },
      },
    ],
  });
  return result;
}
export async function bulkInsert() {
  const ips = await getIPs();
  const index = "trademarks";
  for (let ip of ips) {
    console.log(ip.registrationNumber, new Date());
    const nonce = await client.index({
      index,
      body: {
        ...ip,
      },
    });
    console.log(nonce);
  }
}
