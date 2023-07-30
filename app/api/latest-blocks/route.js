import alchemy from "../alchemy.js";

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
    console.error("err", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
