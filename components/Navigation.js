import Link from "next/link";
import Image from "next/image";
import EyeSvg from "../public/eye.svg";

export default function Navigation() {
  return (
    <div className="py-3 px-5">
      <div>
        <Link href="/" className="flex items-center">
          <Image src={EyeSvg} width={50} height={50} alt="Ethersight Logo" />
          <h1 className="font-gothic text-4xl ml-2">Ethersight</h1>
        </Link>
      </div>
    </div>
  );
}
