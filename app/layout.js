import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Block Explorer",
  description: "Explore blocks on the Ethereum mainnet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navigation />
        <div>{children}</div>
      </body>
    </html>
  );
}
