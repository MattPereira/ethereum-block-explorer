"use client";

import Link from "next/link";
import Image from "next/image";
import EthLogo from "@/public/eth-logo.svg";
import SearchBar from "@/components/SearchBar";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <>
      <div className="py-4 px-5 bg-white">
        <div className="flex justify-between flex-wrap space-y-4 md:space-y-0">
          <Link href="/" className="flex items-center ">
            <Image src={EthLogo} width={40} height={40} alt="Ethersight Logo" />
            <h1 className="font-gothic text-4xl">Etherspect</h1>
          </Link>
          <div className="w-full md:w-3/4">
            {pathname !== "/" && <SearchBar />}
          </div>
        </div>
      </div>
    </>
  );
}
