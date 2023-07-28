import Link from "next/link";
import Image from "next/image";
import blockSvg from "../public/block-array.svg";
import searchSvg from "@/public/search.svg";

export default function Navigation() {
  return (
    <>
      <div className="py-4 px-5 bg-white">
        <div className="flex">
          <Link href="/" className="flex items-center">
            <Image
              src={blockSvg}
              width={35}
              height={35}
              alt="Ethersight Logo"
            />
            <h1 className="font-gothic text-4xl ml-2">Etherscan</h1>
          </Link>
        </div>
      </div>

      <section style={{ backgroundColor: "#1a2231" }} className="h-52 md:h-72">
        <div className="flex flex-col justify-center h-full px-5 lg:px-10">
          <div className="flex items-center">
            <div className="w-full lg:basis-1/2 font-gothic">
              <h1 className="mb-3 text-2xl text-white font-gothic">
                Ethereum Mainnet Explorer
              </h1>
              <div className="flex shadow-white rounded-lg">
                <input
                  className="w-full px-4 py-3 rounded-l-lg text-xl outline-none"
                  id="search"
                  type="text"
                  placeholder="Address, Transaction Hash, or Block Number"
                />
                <button className="bg-[#28a0f0] w-16 flex justify-center items-center rounded-r-lg">
                  <Image src={searchSvg} alt="eye glass search button" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
