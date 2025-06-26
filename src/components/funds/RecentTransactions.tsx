// components/RecentTransactions.tsx
import React from "react";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: "completed" | "processing" | "failed";
  statusText: string;
  cardLastDigits: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(Math.abs(value));
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white mb-4 max-w-[80vw] mx-auto text-xs">
      <div className="mb-4 border-b border-gray-200 pb-3">
        <h2 className="text-gray-800 font-medium">Recent Transactions</h2>
      </div>

      <div>
        {transactions.map((transaction) => (
          <div key={transaction.id} className="border-b border-gray-200 py-3">
            <div className="flex justify-between mb-2">
              <div className="text-xs text-gray-500">#{transaction.id}</div>
              <div
                className={`text-sm font-medium ${
                  transaction.amount < 0 ? "text-red-600" : "text-gray-800"
                }`}
              >
                {transaction.amount < 0 ? "-" : ""}₹
                {formatCurrency(transaction.amount)}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-600">
                  {transaction.date}
                </span>
                <span className="text-gray-400">•</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    transaction.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : transaction.status === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.statusText}
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-red-500 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 17.5C14.2091 17.5 16 15.7091 16 13.5C16 11.2909 14.2091 9.5 12 9.5C9.79086 9.5 8 11.2909 8 13.5C8 15.7091 9.79086 17.5 12 17.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 7.5H16.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs text-gray-500">
                  ***** {transaction.cardLastDigits}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
