import { Utils } from "alchemy-sdk";
import Link from "next/link";

export default function Transactions({ transactions }) {
  console.log(transactions);
  return (
    <div className="bg-white p-5 rounded-xl border border-neutral-300 shadow-md overflow-x-auto">
      <table className="font-gothic min-w-full text-xl">
        <thead>
          <tr className="border-b border-black">
            <th className="text-start pb-2 px-2">Txn Hash</th>
            <th className="text-start pb-2 px-2">Block</th>
            <th className="text-start pb-2 px-2">From</th>
            <th></th>
            <th className="text-start pb-2 px-2">To</th>
            <th className="text-start pb-2 px-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            const { hash, from, to, value, blockNumber } = transaction;

            const txHash = hash?.slice(0, 10) + "...";
            const txFrom = from?.slice(0, 5) + "..." + from.slice(-4);
            const txTo = to?.slice(0, 5) + "..." + to?.slice(-4);
            const txValue = Utils.formatEther(value) + " ETH";

            return (
              <tr key={transaction.hash}>
                <td className="py-2 px-2 border-b border-neutral-300">
                  <Link
                    href={`/transaction/${transaction.hash}`}
                    className="text-blue-500"
                  >
                    {txHash}
                  </Link>
                </td>
                <td className="py-2 px-2 border-b border-neutral-300">
                  <Link
                    href={`/block/${blockNumber}`}
                    className="text-blue-500"
                  >
                    {blockNumber}
                  </Link>
                </td>
                <td className="py-2 px-2 text-start border-b border-neutral-30">
                  <Link href={`/account/${from}`} className="text-blue-500">
                    {txFrom}
                  </Link>
                </td>
                <td className="py-2 px-2 text-center border-b border-neutral-30">
                  <div className="border border-green-700 bg-green-100 rounded-full h-8 w-8 p-1 flex items-center justify-center">
                    <div className="text-green-700 transform -translate-y-0.5">
                      →
                    </div>
                  </div>
                </td>
                <td className="py-2 px-2 text-start border-b border-neutral-30">
                  <Link href={`/account/${to}`} className="text-blue-500">
                    {txTo}
                  </Link>
                </td>
                <td className="py-2 px-2 text-start border-b border-neutral-30">
                  {txValue}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
