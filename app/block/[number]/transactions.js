import { Utils } from "alchemy-sdk";

export default function Transactions({ transactions }) {
  return (
    <table className="font-gothic min-w-full text-xl">
      <thead>
        <tr>
          <th className="text-start">Txn Hash</th>
          <th className="text-start">From</th>
          <th></th>
          <th className="text-start">To</th>
          <th className="text-start">Value</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => {
          const { hash, from, to, value } = transaction;

          const txHash = hash?.slice(0, 10) + "...";
          const txFrom = from?.slice(0, 5) + "..." + from.slice(-4);
          const txTo = to?.slice(0, 5) + "..." + to?.slice(-4);
          const txValue = Utils.formatEther(value) + " ETH";

          return (
            <tr key={transaction.hash}>
              <td>{txHash}</td>
              <td className="text-start">{txFrom}</td>
              <td className="text-center flex justify-center">
                <div className="border border-green-700 bg-green-100 rounded-full h-8 w-8 p-1 flex items-center justify-center">
                  <div className="text-green-700">→</div>
                </div>
              </td>
              <td className="text-start">{txTo}</td>
              <td className="text-start">{txValue}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
