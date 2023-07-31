import Image from "next/image";

import GithubSvg from "@/public/github.svg";
import LinkedinSvg from "@/public/linkedin.svg";
import MpLogo from "@/public/mp-logo.svg";

const links = [
  {
    icon: <Image src={GithubSvg} width={35} height={35} alt="Github Logo" />,
    href: "https://github.com/MattPereira",
  },
  {
    icon: (
      <Image src={LinkedinSvg} width={35} height={35} alt="Linkedin Logo" />
    ),
    href: "https://www.linkedin.com/in/-matt-pereira-/",
  },
  {
    icon: <Image src={MpLogo} width={30} height={30} alt="Matt Pereira Logo" />,
    href: "https://matt-pereira.vercel.app",
  },
];

export default function Footer() {
  return (
    <div className="py-3 bg-dark-blue text-white flex justify-evenly items-center">
      <div>
        Developed by{" "}
        <a href="https://github.com/MattPereira" className="underline">
          Matt Pereira
        </a>
      </div>
      <div className="flex items-center">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            {link.icon}
          </a>
        ))}
      </div>
      <div>
        Thanks to{" "}
        <a href="https://university.alchemy.com/" className="underline">
          Alchemy University
        </a>
      </div>
    </div>
  );
}
