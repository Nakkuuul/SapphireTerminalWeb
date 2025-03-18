"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Selector() {
  const pathname = usePathname();

  const tabs = [
    { name: "Stocks", path: "/trade/stocks" },
    { name: "Future", path: "/trade/futures" },
    { name: "Option", path: "/trade/option" },
    { name: "Commodity", path: "/trade/commodity" },
  ];

  return (
    <div className="flex w-full justify-center items-center gap-x-12">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.path}
          className={`min-w-[170px] px-6 py-2 font-semibold text-sm text-center flex items-center justify-center rounded-sm border transition-all duration-300 ${
            pathname === tab.path
              ? "bg-green-100 text-[#1DB954] border-[1px] border-[#22A06B]"
              : "bg-[#F6F6F6] text-gray-600 border-[#D1D5DB] hover:bg-gray-100"
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
}

export default Selector;
