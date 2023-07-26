export default function Overview({ block }) {
  const gasUsageRate =
    (parseInt(block.gasUsed) / parseInt(block.gasLimit)).toFixed(2) * 100;

  const items = [
    { label: "Height :", value: block.number },
    {
      label: "Timestamp :",
      value: new Date(block.timestamp * 1000).toString(),
    },
    { label: "Miner :", value: block.miner },
    { label: "Transactions :", value: block.transactions.length },
    {
      label: "Gas Used :",
      value: parseInt(block.gasUsed),
    },
    { label: "Gas Limit :", value: parseInt(block.gasLimit) },
    {
      label: "Gas Usage Rate :",
      value: gasUsageRate + "%",
    },
    {
      label: "Base Fee Per Gas :",
      value: (parseInt(block.baseFeePerGas._hex) / 1e9).toFixed(2) + " Gwei",
    },
  ];

  return (
    <div className="font-gothic text-xl">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col md:flex-row md:space-x-4 flex-wrap mb-2"
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
