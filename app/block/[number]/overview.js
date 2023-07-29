import InfoDisplay from "@/components/InfoDisplay";

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
    { key: "Height :", value: number },
    {
      key: "Timestamp :",
      value: new Date(timestamp * 1000).toString(),
    },
    { key: "Miner :", value: miner.slice(0, 5) + "..." + miner.slice(-3) },
    { key: "Transactions :", value: transactions.length },
    {
      key: "Gas Used :",
      value: parseInt(gasUsed.hex),
    },
    { key: "Gas Limit :", value: parseInt(gasLimit.hex) },
    {
      key: "Gas Usage Rate :",
      value: gasUsageRate + "%",
    },
    {
      key: "Base Fee Per Gas :",
      value: (parseInt(baseFeePerGas.hex) / 1e9).toFixed(2) + " Gwei",
    },
  ];

  return <InfoDisplay items={items} />;
}
