import alchemy from "../../alchemy.js";
import axios from "axios";

export async function GET(request, { params }) {
  try {
    console.log(params);
    const { address } = params;

    // alchemy provided endpoints
    const balance = await alchemy.core.getBalance(address);
    const transactionCount = await alchemy.core.getTransactionCount(address);
    const tokens = await alchemy.core.getTokensForOwner(address);

    // https://docs.etherscan.io/api-endpoints/accounts
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "account",
        action: "txlist",
        address: address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 10,
        sort: "asc",
        apikey: process.env.ETHERSCAN_API_KEY,
      },
    });

    const transactions = response.data.result;

    return new Response(
      JSON.stringify({ balance, transactionCount, tokens, transactions })
    );
  } catch (err) {
    console.log("err", err);
  }
}
