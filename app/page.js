"use client";
import Image from "next/image";
import Link from "next/link";

import { alchemy } from "@/lib/alchemy";
import { useEffect, useState } from "react";
import axios from "axios";

import LoadingSpinner from "@/components/LoadingSpinner";
import blockSvg from "@/public/block.svg";

export default function Home() {
  const [blockDetails, setBlockDetails] = useState();

  useEffect(() => {
    async function getRecentBlocks() {
      try {
        const response = await axios.get("/api/recent-blocks");
        setBlockDetails(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }

    getRecentBlocks();
  }, []);

  if (!blockDetails) return <LoadingSpinner />;

  return (
    <main>
      <h1 className="font-cubano text-6xl text-center mb-8">Block Explorer</h1>
      <div className="flex items-center mb-3">
        <Image src={blockSvg} alt="block" />
        <h3 className="font-cubano text-3xl">Latest Blocks</h3>
      </div>
      <table className="min-w-full font-gothic">
        <thead className="text-2xl">
          <tr className="border-b-2 border-black">
            <th className="text-start py-2 px-2">Number</th>
            <th className="text-end">Transactions</th>
            <th className="text-end">Miner</th>
            <th className="text-end">Base Fee Per Gas</th>
            <th className="text-end px-2">Gas Used</th>
          </tr>
        </thead>
        <tbody className="text-2xl">
          {blockDetails.map((block) => {
            const { number, transactions, miner, baseFeePerGas, gasUsed } =
              block;

            const totalTransactions = transactions.length;

            const blockBaseFeePerGas =
              (parseInt(baseFeePerGas.hex) / 1e9).toFixed(2) + " Gwei";

            const blockGasUsed =
              (parseInt(gasUsed.hex) / 300000).toFixed(2) + "%";

            return (
              <tr key={number}>
                <td className="py-2 border-b border-black px-2">
                  <Link href={`/block/${number}`} className="text-blue-600">
                    {number}
                  </Link>
                </td>
                <td className="text-end border-b border-black">
                  <Link
                    href={`/block/${number}?tab=transactions`}
                    className="text-blue-600"
                  >
                    {totalTransactions}
                  </Link>
                </td>
                <td className="text-end border-b border-black">
                  {miner.slice(0, 4) + "..." + miner.slice(-4)}
                </td>
                <td className="text-end border-b border-black">
                  {blockBaseFeePerGas}
                </td>
                <td className="text-end border-b border-black px-2">
                  {blockGasUsed}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
