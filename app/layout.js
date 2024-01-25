import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Superball",
  description: "A game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script src="https://kit.fontawesome.com/e96f1e32e7.js" crossOrigin="anonymous" />
        {children}
      </body>
    </html>
  );
}
