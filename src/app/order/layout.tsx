import React from 'react';
import Navbar from '@/components/gen-components/Navbar';
import Sidebar from '@/components/gen-components/Sidebar';
import { Inter } from 'next/font/google';
import OrderSelector from './components/OrderSelector';
import OrdersTable from './components/OrdersTable';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Trading Platform',
  description: 'A modern trading platform interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white ">
      <Navbar />
      <div className="flex pt-[74px]">
        <Sidebar />
        <main className=" sm:ml-[25%] w-3/4 py-6 px-9">
          {/* {children} */}
          <div className="bg-white w-full">
            <OrderSelector />

            <OrdersTable />
          </div>
        </main>
      </div>
    </div>
  );
}
