import Link from "next/link";

export default function CustomError({ message }) {
  return (
    <div className="font-gothic flex flex-col mt-28">
      <div className="text-center text-3xl">{message}</div>
      <button className="mx-auto mt-10 text-xl text-white bg-sky-500 text-3xl px-5 py-3 rounded-xl">
        <Link href="/">Back Home</Link>
      </button>
    </div>
  );
}
