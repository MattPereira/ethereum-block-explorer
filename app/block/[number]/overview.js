export default function Overview({ block }) {
  const {
    number,
    timestamp,
    miner,
    transactions,
    gasUsed,
    gasLimit,
    baseFeePerGas,
  } = block;

  const gasUsageRate =
    (parseInt(gasUsed.hex) / parseInt(gasLimit.hex)).toFixed(2) * 100;

  const items = [
    { label: "Height :", value: number },
    {
      label: "Timestamp :",
      value: new Date(timestamp * 1000).toString(),
    },
    { label: "Miner :", value: miner.slice(0, 5) + "..." + miner.slice(-3) },
    { label: "Transactions :", value: transactions.length },
    {
      label: "Gas Used :",
      value: parseInt(gasUsed.hex),
    },
    { label: "Gas Limit :", value: parseInt(gasLimit.hex) },
    {
      label: "Gas Usage Rate :",
      value: gasUsageRate + "%",
    },
    {
      label: "Base Fee Per Gas :",
      value: (parseInt(baseFeePerGas.hex) / 1e9).toFixed(2) + " Gwei",
    },
  ];

  return (
    <div className="font-gothic text-xl bg-white px-5 pb-2 pt-2 rounded-xl shadow-md border border-grey-300">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`flex flex-col md:flex-row md:space-x-4 flex-wrap py-3 ${
            index !== items.length - 1 ? "border-b border-gray-300" : ""
          }`}
        >
          <div className="md:basis-1/4">
            <div className="font-bold">{item.label}</div>
          </div>
          <div className="">
            <div>{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
