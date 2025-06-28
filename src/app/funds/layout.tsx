import React from 'react';
import Navbar from '@/components/gen-components/Navbar';
import Sidebar from '@/components/gen-components/Sidebar';
import { Inter } from 'next/font/google';
import '../globals.css';

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
    <div className={inter.className}>
      <Navbar />
      <div className="flex w-full pt-[74px]">
        <div className="w-[25%] z-0">
          <Sidebar />
        </div>
        <main className="w-[75%] py-[28px] pt-0 px-9 fixed top-[84px] left-[25%] pr-[28px] pb-40">
          {children}
        </main>
      </div>
    </div>
  );
}