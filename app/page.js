"use client";
import Image from "next/image";
import Link from "next/link";

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
      <section className="m-5 lg:m-10">
        <div className="border border-gray-300 shadow-md rounded-lg bg-white">
          <div className="flex items-center mb-3 border-b border-gray-300 px-5 py-3">
            <h3 className="font-gothic text-3xl">Latest Blocks</h3>
          </div>
          <div className="px-5 pb-5 pt-1 overflow-x-auto">
            <table className="min-w-full font-gothic">
              <thead className="text-2xl">
                <tr className="border-b border-black whitespace-nowrap">
                  <th className="text-start pb-2">Number</th>
                  <th className="text-end pb-2">Transactions</th>
                  <th className="text-end pb-2">Miner</th>
                  <th className="text-end pb-2">Base Fee Per Gas</th>
                  <th className="text-end pb-2">Gas Used</th>
                </tr>
              </thead>
              <tbody className="text-2xl">
                {blockDetails.map((block) => {
                  const {
                    number,
                    transactions,
                    miner,
                    baseFeePerGas,
                    gasUsed,
                  } = block;

                  const totalTransactions = transactions.length;

                  const blockBaseFeePerGas =
                    (parseInt(baseFeePerGas.hex) / 1e9).toFixed(2) + " Gwei";

                  const blockGasUsed =
                    (parseInt(gasUsed.hex) / 300000).toFixed(2) + "%";

                  return (
                    <tr key={number}>
                      <td className="py-2 border-b border-grey-300 px-2">
                        <Link
                          href={`/block/${number}`}
                          className="text-blue-500 flex items-center"
                        >
                          <Image
                            src={blockSvg}
                            width={35}
                            height={35}
                            alt="block"
                          />
                          {number}
                        </Link>
                      </td>
                      <td className="text-end border-b border-grey-300">
                        <Link
                          href={`/block/${number}?tab=transactions`}
                          className="text-blue-500"
                        >
                          {totalTransactions}
                        </Link>
                      </td>
                      <td className="text-end border-b border-grey-300">
                        <Link
                          href={`/address/${miner}`}
                          className="text-blue-500"
                        >
                          {miner.slice(0, 4) + "..." + miner.slice(-4)}
                        </Link>
                      </td>
                      <td className="text-end border-b border-grey-300">
                        {blockBaseFeePerGas}
                      </td>
                      <td className="text-end border-b border-grey-300 px-2">
                        {blockGasUsed}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
