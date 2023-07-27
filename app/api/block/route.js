import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  try {
    const blockNumber = +searchParams.get("number");
    const blockData = await alchemy.core.getBlockWithTransactions(blockNumber);

    return new Response(JSON.stringify(blockData));
  } catch (err) {
    console.log("err", err);
  }
}
