import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Block Explorer",
  description:
    "Explore blocks, accounts, and transactions on the Ethereum mainnet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#f8f9fa] flex flex-col min-h-screen`}
      >
        <Navigation />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
