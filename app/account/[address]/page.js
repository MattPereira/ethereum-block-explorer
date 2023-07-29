"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import Transactions from "@/components/Transactions";
import InfoDisplay from "@/components/InfoDisplay";
import { Utils } from "alchemy-sdk";

export default function Address({ params }) {
  const { address } = params;
  const [addressData, setAddressData] = useState();
  const [token, setToken] = useState();

  const handleChange = (event) => {
    const selectedTokenAddy = event.target.value;
    const selectedToken = tokens.tokens.find(
      (t) => t.contractAddress === selectedTokenAddy
    );
    setToken(selectedToken);
  };

  useEffect(() => {
    async function getAddressData() {
      try {
        const response = await axios.get(`/api/account/${address}`);
        setAddressData(response.data);
        setToken(response.data.tokens.tokens[0]);
      } catch (err) {
        console.log("error", err);
      }
    }
    getAddressData();
  }, [address]);

  if (!addressData) return <LoadingSpinner />;

  const { balance, tokens, transactions, price } = addressData;

  const ethUsdPrice = price.ethusd;

  const ethBalance = Utils.formatEther(balance);

  const balanceItems = [
    { key: "Balance :", value: ethBalance + " ETH" },
    {
      key: "USD Value :",
      value:
        "$" +
        (ethBalance * ethUsdPrice).toFixed(2) +
        ` (@ $${ethUsdPrice}/ETH)`,
    },
  ];

  const tokenItems = [
    {
      key: "Token :",
      value: (
        <select
          onChange={handleChange}
          className="border border-neutral-300 rounded-md bg-white w-full xl:w-3/4"
        >
          {tokens.tokens.map((token) => (
            <option key={token.contractAddress} value={token.contractAddress}>
              {token.name} {`( ${token.symbol} )`}
            </option>
          ))}
        </select>
      ),
    },
    { key: "Balance :", value: token ? token.balance : "Loading..." },
  ];

  return (
    <main className="px-5 lg:px-10">
      <div className="flex font-gothic text-2xl space-x-2 border-b border-neutral-300 py-5 lg:py-10 mb-10 overflow-x-auto">
        <h1 className="font-bold">Address</h1>
        <div>{address}</div>
      </div>

      <h3 className="font-gothic text-3xl mb-3">Overview</h3>
      <div className="mb-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <InfoDisplay items={balanceItems} />
        </div>
        <div>
          <InfoDisplay items={tokenItems} />
        </div>
      </div>

      <div>
        <h3 className="font-gothic text-3xl mb-3">Transactions</h3>
        <Transactions transactions={transactions} />
      </div>
    </main>
  );
}
