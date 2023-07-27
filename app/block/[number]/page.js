"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import Transactions from "./transactions";
import Overview from "./overview";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function BlockPage({ params }) {
  const searchParams = useSearchParams();

  const search = searchParams.get("tab");

  const [block, setBlock] = useState();
  const [activeTab, setActiveTab] = useState(search || "overview");

  const blockNumber = +params.number;

  useEffect(() => {
    async function getblock() {
      try {
        const response = await axios.get(`/api/block?number=${blockNumber}`, {
          params: {
            blockNumber,
          },
        });
        console.log(response.data);

        setBlock(response.data);
      } catch (err) {
        console.log("error", err);
      }
    }

    getblock();
  }, [blockNumber]);

  if (!block) return <LoadingSpinner />;

  return (
    <main className="m-5 lg:m-10">
      <h1 className="font-gothic text-4xl md:text-5xl lg:text-5xl mb-6">
        Block{" "}
        <span className="text-neutral-500 text-3xl md:text-4xl">
          #{block.number}
        </span>
      </h1>
      <div className="flex space-x-4 mb-5">
        <button
          className={`py-2 px-4 rounded-xl font-semibold ${
            activeTab === "overview"
              ? "text-white bg-blue-500"
              : " bg-white border border-grey-300"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`py-2 px-4 rounded-xl font-semibold ${
            activeTab === "transactions"
              ? "text-white bg-blue-500"
              : " bg-white border border-gray-300"
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
    </main>
  );
}
