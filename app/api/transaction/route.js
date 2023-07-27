import alchemy from "../alchemy.js";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const txHash = searchParams.get("hash");

    const transactionDetails = await alchemy.core.getTransaction(txHash);

    return new Response(JSON.stringify(transactionDetails));
  } catch (err) {
    console.log("err", err);
  }
}
