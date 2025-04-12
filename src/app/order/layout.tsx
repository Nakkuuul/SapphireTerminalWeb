import React from "react";
import Navbar from "@/components/gen-components/Navbar";
import Sidebar from "@/components/gen-components/Sidebar";
import { Inter } from "next/font/google";
import OrderSelector from "./components/OrderSelector";
import OrdersTable from "./components/OrdersTable";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trading Platform",
  description: "A modern trading platform interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <Navbar />
      <div className="flex w-full pt-[60px]">
        <div className="w-[30%]">
          <Sidebar />
        </div>
        <main className="w-[70%] py-6 px-9 bg-white dark:bg-[#121212]">
          {children}
          <div className="bg-white w-full">
            <OrderSelector />

            <OrdersTable />
          </div>
        </main>
      </div>
    </div>
  );
}
