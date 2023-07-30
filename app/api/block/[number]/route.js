import alchemy from "../../alchemy.js";

export async function GET(request, { params }) {
  try {
    const { number } = params;
    // getBlockWithTransactions expects a number!!!
    const blockData = await alchemy.core.getBlockWithTransactions(+number);

    console.log("blockData", blockData);
    return new Response(JSON.stringify(blockData));
  } catch (err) {
    console.log("err", err);
  }
}
