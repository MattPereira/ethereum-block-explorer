"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import Transactions from "@/components/Transactions";

export default function Address({ params }) {
  const { address } = params;
  const [addressData, setAddressData] = useState();

  useEffect(() => {
    async function getAddressData() {
      try {
        const response = await axios.get(`/api/account/${address}`);
        setAddressData(response.data);
      } catch (err) {
        console.log("error", err);
      }
    }
    getAddressData();
  }, [address]);

  if (!addressData) return <LoadingSpinner />;
  console.log(addressData);

  return (
    <main className="px-5 lg:px-10">
      <div className="flex font-gothic text-2xl space-x-2 border-b border-neutral-300 py-5 lg:py-10 mb-10 overflow-x-auto">
        <h1 className="font-bold">Address</h1>
        <div>{address}</div>
      </div>
      <h3 className="font-gothic text-3xl mb-3">Overview</h3>

      <h3 className="font-gothic text-3xl mb-3">Transactions</h3>
      <Transactions transactions={addressData.transactions} />
    </main>
  );
}
