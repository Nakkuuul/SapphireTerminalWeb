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
    <div className="flex w-full justify-between">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.path}
          className={`flex-1 text-center px-6 py-2 rounded-md border transition-all duration-300 mx-1 ${
            pathname === tab.path
              ? "bg-green-100 text-green-600 border-green-400 shadow-md"
              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
}

export default Selector;
