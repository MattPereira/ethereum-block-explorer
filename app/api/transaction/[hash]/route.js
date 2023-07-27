import alchemy from "../../alchemy.js";

export async function GET(request, { params }) {
  try {
    const { hash: txHash } = params;

    const transactionDetails = await alchemy.core.getTransaction(txHash);

    return new Response(JSON.stringify(transactionDetails));
  } catch (err) {
    console.log("err", err);
  }
}
