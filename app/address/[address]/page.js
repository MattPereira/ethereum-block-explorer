"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Address({ params }) {
  const { address } = params;
  const [addressData, setAddressData] = useState();

  useEffect(() => {
    async function getAddressData() {
      try {
        const response = await axios.get(`/api/address/${address}`);
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
      <div className="flex font-gothic text-2xl space-x-2 border-b border-neutral-300 py-5 lg:py-10">
        <h1 className="font-bold">Address</h1>
        <div>{address}</div>
      </div>
    </main>
  );
}
