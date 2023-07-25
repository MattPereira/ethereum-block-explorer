"use client";
import { alchemy } from "@/lib/alchemy";
import { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";

export default function BlockPage({ params }) {
  const [block, setblock] = useState();

  console.log("params", params);

  useEffect(() => {
    async function getblock() {
      const blockData = await alchemy.core.getBlockWithTransactions(
        params.slug
      );

      setblock(blockData);
    }

    getblock();
  }, [params.slug]);

  if (!block) return <LoadingSpinner />;

  console.log("block", block);

  return (
    <div>
      <h1 className="font-cubano text-6xl mb-6">Block #{block.number}</h1>
      <div className="font-gothic text-2xl">
        <h5>
          <span className="font-bold"> Miner : </span>
          {block.miner}
        </h5>
        <h5>
          <span className="font-bold"> Transactions : </span>{" "}
          {block.transactions.length}
        </h5>
        <h5>
          <span className="font-bold"> Gas Used : </span>
          {(parseInt(block.gasUsed) / 300000).toFixed(2)}%
        </h5>
        {/* <h5>Gas Limit: {block.gasLimit}</h5> */}
        <h5>
          <span className="font-bold"> Base Fee Per Gas : </span>
          {(parseInt(block.baseFeePerGas._hex) / 1e9).toFixed(2)} Gwei
        </h5>
      </div>
    </div>
  );
}
