"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CustomError() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  console.log(query);

  return (
    <div className="font-gothic flex flex-col mt-28">
      {query ? (
        <div className="text-center text-3xl">
          No results found for &quot;{query}&quot;
        </div>
      ) : (
        <div className="text-center text-3xl">
          The requested resource does not exist.
        </div>
      )}
      <button className="mx-auto mt-10 text-xl text-white bg-sky-500 text-3xl px-5 py-3 rounded-xl">
        <Link href="/">Back Home</Link>
      </button>
    </div>
  );
}
