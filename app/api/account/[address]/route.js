import alchemy from "../../alchemy.js";
import axios from "axios";

export async function GET(request, { params }) {
  try {
    const { address } = params;

    let ensLookup;

    // if params end in ".eth" perform ens lookup
    if (address.endsWith(".eth")) {
      ensLookup = await alchemy.core.resolveName(address);
    }

    const addy = ensLookup || address;

    const ETHERSCAN_BASE_URL = "https://api.etherscan.io/api";

    const requests = [
      alchemy.core.getBalance(addy),
      alchemy.core.getTokensForOwner(addy),
      axios.get(ETHERSCAN_BASE_URL, {
        params: {
          module: "account",
          action: "txlist",
          address: addy,
          startblock: 0,
          endblock: 99999999,
          page: 1,
          offset: 10,
          sort: "asc",
          apikey: process.env.ETHERSCAN_API_KEY,
        },
      }),
      axios.get(ETHERSCAN_BASE_URL, {
        params: {
          module: "stats",
          action: "ethprice",
          apikey: process.env.ETHERSCAN_API_KEY,
        },
      }),
    ];

    const [balance, tokens, txResponse, priceResponse] = await Promise.all(
      requests
    );

    const transactions = txResponse.data.result;
    const price = priceResponse.data.result;

    return new Response(
      JSON.stringify({
        balance,
        tokens,
        transactions,
        price,
      })
    );
  } catch (err) {
    console.log("err", err);
  }
}
