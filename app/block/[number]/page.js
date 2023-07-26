"use client";
import { alchemy } from "@/lib/alchemy";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import Transactions from "./transactions";
import Overview from "./overview";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function BlockPage({ params }) {
  const searchParams = useSearchParams();

  const search = searchParams.get("tab");
  console.log("search", search);

  const [block, setblock] = useState();
  const [activeTab, setActiveTab] = useState(search || "overview");

  const blockNumber = +params.number;

  useEffect(() => {
    async function getblock() {
      const blockData = await alchemy.core.getBlockWithTransactions(
        blockNumber
      );

      setblock(blockData);
    }

    getblock();
  }, [blockNumber]);

  if (!block) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-cubano text-4xl md:text-5xl lg:text-6xl mb-6">
        Block <span className="font-gothic">#{block.number}</span>
      </h1>
      <hr className="border-1 border-black mb-5" />
      <div className="flex space-x-4 mb-5">
        <button
          className={`py-2 px-4 rounded-xl bg-neutral-200 font-semibold ${
            activeTab === "overview" && "text-white bg-blue-500"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`py-2 px-4 rounded-xl bg-neutral-200 font-semibold ${
            activeTab === "transactions" && "text-white bg-blue-500"
          }`}
          onClick={() => setActiveTab("transactions")}
        >
          Transactions
        </button>
      </div>
      {activeTab === "overview" && <Overview block={block} />}
      {activeTab === "transactions" && (
        <Transactions transactions={block.transactions} />
      )}
    </div>
  );
}
