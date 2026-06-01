"use client";

import { useEffect, useState } from "react";

export default function SummaryCards({ refreshTrigger }) {
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    topCategory: "",
    topCategoryAmount: 0,
    recentTransactions: [],
  });

  useEffect(() => {
    fetchSummary();
  }, [refreshTrigger]);

  const fetchSummary = async () => {
    try {
      const res = await fetch("/api/transactions/summary");
      const json = await res.json();
      setSummary(json);
    } catch (err) {
      console.error("Failed to fetch summary data", err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div className="p-6 bg-white dark:bg-slate-900 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Total Expenses
        </h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          ₹ {summary.totalExpenses}
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Top Category
        </h3>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          {summary.topCategory || "N/A"}
        </p>
        <p className="text-md text-gray-900 dark:text-white">
          ₹ {summary.topCategoryAmount}
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Recent Transactions
        </h3>
        <ul className="space-y-1">
          {summary.recentTransactions.slice(0, 3).map((tx) => (
            <li key={tx._id} className="text-sm text-gray-900 dark:text-white">
              <span className="font-medium">{tx.description}</span> - ₹{" "}
              {tx.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
