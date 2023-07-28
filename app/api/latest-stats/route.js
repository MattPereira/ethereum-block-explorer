import axios from "axios";

export async function GET(request) {
  try {
    // https://docs.etherscan.io/api-endpoints/stats-1
    const BASE_URL = "https://api.etherscan.io/api";
    const requests = [
      axios.get(BASE_URL, {
        params: {
          module: "stats",
          action: "ethsupply2",
          apikey: process.env.ETHERSCAN_API_KEY,
        },
      }),
      axios.get(BASE_URL, {
        params: {
          module: "stats",
          action: "ethprice",
          apikey: process.env.ETHERSCAN_API_KEY,
        },
      }),
      axios.get(BASE_URL, {
        params: {
          module: "stats",
          action: "nodecount",
          apikey: process.env.ETHERSCAN_API_KEY,
        },
      }),
      // TODO: find endpoint for chain size
    ];

    const [supplyRes, priceRes, nodeRes] = await Promise.all(requests);

    const supply = supplyRes.data.result;
    const prices = priceRes.data.result;
    const nodes = nodeRes.data.result;

    return new Response(JSON.stringify({ supply, prices, nodes }));
  } catch (err) {
    console.log("err", err);
  }
}
