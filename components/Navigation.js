import Link from "next/link";
import Image from "next/image";
import blockSvg from "../public/block-array.svg";

export default function Navigation() {
  return (
    <div className="py-4 px-5 bg-white">
      <div>
        <Link href="/" className="flex items-center">
          <Image src={blockSvg} width={35} height={35} alt="Ethersight Logo" />
          <h1 className="font-gothic text-4xl ml-2">Etherscan</h1>
        </Link>
      </div>
    </div>
  );
}
