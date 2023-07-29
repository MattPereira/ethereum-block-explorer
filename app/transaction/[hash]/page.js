"use client";

import { useEffect, useState } from "react";
import { Utils } from "alchemy-sdk";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import TxSvg from "@/public/transaction.svg";
import Image from "next/image";

export default function Transaction({ params }) {
  const { hash } = params;
  const [tx, setTx] = useState();

  useEffect(() => {
    async function getTransaction() {
      try {
        const response = await axios.get(`/api/transaction/${hash}`);
        setTx(response.data);
      } catch (err) {
        console.log("error", err);
      }
    }
    getTransaction();
  }, [hash]);

  if (!tx) return <LoadingSpinner />;

  const items = [
    {
      label: "Hash :",
      value: tx.hash,
    },
    {
      label: "Block :",
      value: tx.blockNumber,
    },
    {
      label: "From :",
      value: (
        <Link href={`/account/${tx.from}`} className="text-blue-500">
          {tx.from}
        </Link>
      ),
    },
    {
      label: "To :",
      value: (
        <Link href={`/account/${tx.to}`} className="text-blue-500">
          {tx.to}
        </Link>
      ),
    },
    {
      label: "Value :",
      value: Utils.formatEther(tx.value) + " ETH",
    },
    {
      label: "Nonce :",
      value: tx.nonce,
    },

    {
      label: "Gas Price :",
      value: (parseInt(tx.gasPrice.hex) / 1e9).toFixed(2) + " Gwei",
    },
    {
      label: "Gas Limit :",
      value: parseInt(tx.gasLimit.hex),
    },
  ];

  return (
    <div className="p-5 lg:p-10">
      <div className="flex items-center">
        <Image src={TxSvg} alt="Transactionlogo " width={35} height={35} />
        <h1 className="text-3xl text-gothic text-neutral-700 ml-2">
          Transaction Details
        </h1>
      </div>

      <div className="bg-white border border-neutral-300 rounded-xl shadow-md px-5 py-2 mt-5 overflow-x-auto font-gothic text-xl">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row md:space-x-4 flex-wrap py-3 ${
              index !== items.length - 1 ? "border-b border-gray-300" : ""
            }`}
          >
            <div className="md:basis-1/4">
              <div className="font-bold">{item.label}</div>
            </div>
            <div>
              <div>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
