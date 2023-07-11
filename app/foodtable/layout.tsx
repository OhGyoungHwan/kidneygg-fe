"use client";
import { Providers } from "../redux/provider";
import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KidneyGG | 식재료 검색",
  description: "KidneyGG 식재료 검색 이름으로 쉽게 찾는 식재료",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}