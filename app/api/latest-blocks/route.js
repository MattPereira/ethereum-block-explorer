import alchemy from "../alchemy.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const onlyLatestOne = searchParams.get("onlyOne");

    // grab the latest block number
    const latestBlockNumber = await alchemy.core.getBlockNumber();

    if (onlyLatestOne) {
      return new Response(JSON.stringify(latestBlockNumber));
    }

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
