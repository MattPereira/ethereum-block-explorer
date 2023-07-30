"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CustomError() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  console.log(query);

  return (
    <div className="font-gothic flex flex-col mt-28 ">
      {query ? (
        <>
          <div className="text-center text-3xl mb-10">
            No results found for &quot;{query}&quot;
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col">
              <div className="text-2xl">
                Please search for one of the following:
              </div>
              <div>
                <ul className="text-xl list-disc list-inside">
                  <li>ENS names ending with .eth</li>
                  <li>
                    Block numbers greater than 0 and less than the current block
                    number
                  </li>
                  <li>Account addresses 42 characters long starting with 0x</li>
                  <li>
                    Transaction hashes 66 characters long starting with 0x
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
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
