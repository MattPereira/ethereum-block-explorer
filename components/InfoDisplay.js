/**
 * @param {Array} items - Array of objects with key and value
 */

export default function InfoDisplay({ items }) {
  return (
    <div className="font-gothic text-xl bg-white px-5 pb-2 pt-2 rounded-xl shadow-md border border-grey-300">
      {items.map((item, index) => (
        <div
          key={item.key}
          className={`flex flex-col md:flex-row md:space-x-4 flex-wrap py-3 ${
            index !== items.length - 1 ? "border-b border-gray-300" : ""
          }`}
        >
          <div className="sm:basis-1/4">
            <div className="font-bold whitespace-nowrap">{item.key}</div>
          </div>
          <div className="grow">
            <div>{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
