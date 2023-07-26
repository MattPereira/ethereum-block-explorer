import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export async function GET(request) {
  try {
    // grab the latest block number
    const latestBlockNumber = await alchemy.core.getBlockNumber();

    // make array that has latest 10 block numbers
    const last5BlockNumbers = Array.from(
      { length: 10 },
      (_, i) => latestBlockNumber - i
    );

    // get details for most recent 10 blocks
    const recentBlocks = await Promise.all(
      last5BlockNumbers.map((blockNumber) => alchemy.core.getBlock(blockNumber))
    );

    return new Response(JSON.stringify(recentBlocks));
  } catch (err) {
    console.log("err", err);
  }
}
