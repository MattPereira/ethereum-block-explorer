"use client";
import Image from "next/image";
import Link from "next/link";

import { alchemy } from "@/lib/alchemy";
import { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import blockSvg from "@/public/block.svg";

export default function Home() {
  const [blockDetails, setBlockDetails] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      const latestBlockNumber = await alchemy.core.getBlockNumber();

      // return latest block number for use in getBlockDetails()
      return latestBlockNumber;
    }

    async function getBlockDetails(number) {
      // make array that has latest 5 block numbers
      const last5BlockNumbers = Array.from(
        { length: 10 },
        (_, i) => number - i
      );

      const last5BlockDetails = await Promise.all(
        last5BlockNumbers.map((blockNumber) =>
          alchemy.core.getBlock(blockNumber)
        )
      );

      setBlockDetails(last5BlockDetails);
    }

    // wait for latest block number to be fetched, then get details for latest 5 blocks
    getBlockNumber().then((number) => getBlockDetails(number));
  }, []);

  if (!blockDetails) return <LoadingSpinner />;

  return (
    <main>
      <h1 className="font-cubano text-6xl text-center mb-8">
        Ethereum Block Explorer
      </h1>
      <div className="flex items-center mb-3">
        <Image src={blockSvg} alt="block" />
        <h3 className="font-cubano text-3xl">Latest Blocks</h3>
      </div>
      <table className="min-w-full font-gothic">
        <thead className="text-2xl">
          <tr className="border border-2 border-black bg-neutral-900 text-white">
            <th className="text-start py-2 px-2">Number</th>
            <th className="text-end">Transactions</th>
            <th className="text-end">Miner</th>
            <th className="text-end">Base Fee Per Gas</th>
            <th className="text-end">Gas Used</th>
            <th className="text-end px-2">Gas Limit</th>
          </tr>
        </thead>
        <tbody className="text-2xl">
          {blockDetails.map((block) => (
            <tr key={block.number}>
              <td className="py-2 border-b border-black px-2">
                <Link href={`/block/${block.number}`} className="text-blue-600">
                  {block.number}
                </Link>
              </td>
              <td className="text-end border-b border-black">
                {block.transactions.length}
              </td>
              <td className="text-end border-b border-black">
                {block.miner.slice(0, 4) + "..." + block.miner.slice(-4)}
              </td>
              <td className="text-end border-b border-black">
                {(parseInt(block.baseFeePerGas._hex) / 1e9).toFixed(2)} Gwei
              </td>
              <td className="text-end border-b border-black">
                {parseInt(block.gasUsed)}
              </td>
              <td className="text-end border-b border-black px-2">
                %{(parseInt(block.gasUsed) / 300000).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
