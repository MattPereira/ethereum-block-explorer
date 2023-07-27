"use client";

import { useEffect, useState } from "react";

export default function Address({ params }) {
  const { address } = params;
  const [addressData, setAddressData] = useState();

  return (
    <main className="px-5 lg:px-10">
      <div className="flex font-gothic text-2xl space-x-2 border-b border-neutral-300 py-5 lg:py-10">
        <h1 className="font-bold">Address</h1>
        <div>{address}</div>
      </div>
    </main>
  );
}
