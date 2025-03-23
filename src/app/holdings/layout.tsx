import React from 'react';
import Navbar from '@/components/gen-components/Navbar';
import Sidebar from '@/components/gen-components/Sidebar';
import { Inter } from 'next/font/google';
import '../globals.css';
import HoldingSelector from '@/components/holdings/HoldingSelector';

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
      <div className="flex pt-16">
        <Sidebar />
        <main className="sm:ml-[25%] w-3/4 p-6">
        <HoldingSelector />
          {children}
        </main>
      </div>
    </div>
  );
}
