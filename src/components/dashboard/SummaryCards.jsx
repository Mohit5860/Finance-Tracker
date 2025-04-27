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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="p-4 border rounded-xl shadow bg-white">
        <h3 className="text-sm font-semibold text-gray-500 mb-1">
          Total Expenses
        </h3>
        <p className="text-2xl font-bold text-gray-800">
          ₹ {summary.totalExpenses}
        </p>
      </div>
      <div className="p-4 border rounded-xl shadow bg-white">
        <h3 className="text-sm font-semibold text-gray-500 mb-1">
          Top Category
        </h3>
        <p className="text-lg font-semibold text-gray-700">
          {summary.topCategory || "N/A"}
        </p>
        <p className="text-md text-gray-500">₹ {summary.topCategoryAmount}</p>
      </div>
      <div className="p-4 border rounded-xl shadow bg-white">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">
          Recent Transactions
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          {summary.recentTransactions.slice(0, 3).map((tx) => (
            <li key={tx._id}>
              {tx.description} - ₹ {tx.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
