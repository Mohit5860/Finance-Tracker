"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, Download, Filter, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import MonthlyExpensesChart from "@/components/charts/MonthlyExpensesChart";
import CategoryPieChart from "@/components/charts/CategoryPieChart";
import BudgetVsActualChart from "@/components/charts/BudgetVsActualChart";

const CATEGORIES = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Shopping",
  "Others",
];

export default function Analytics() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalExpenses: 0,
    averageTransaction: 0,
    largestExpense: 0,
    transactionCount: 0,
  });

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/transactions/get");
      const data = await response.json();

      let filtered = data || [];

      if (selectedCategory !== "all") {
        filtered = filtered.filter(
          (t) => t.category.toLowerCase() === selectedCategory.toLowerCase(),
        );
      }

      const now = new Date();
      if (filter === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter((t) => new Date(t.date) >= weekAgo);
      } else if (filter === "month") {
        filtered = filtered.filter(
          (t) =>
            new Date(t.date).getMonth() === now.getMonth() &&
            new Date(t.date).getFullYear() === now.getFullYear(),
        );
      } else if (filter === "year") {
        filtered = filtered.filter(
          (t) => new Date(t.date).getFullYear() === now.getFullYear(),
        );
      }

      setTransactions(filtered);
      calculateStats(filtered);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  }, [filter, selectedCategory]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const calculateStats = (txns) => {
    if (txns.length === 0) {
      setStats({
        totalExpenses: 0,
        averageTransaction: 0,
        largestExpense: 0,
        transactionCount: 0,
      });
      return;
    }

    const total = txns.reduce((sum, t) => sum + t.amount, 0);
    const largest = Math.max(...txns.map((t) => t.amount));

    setStats({
      totalExpenses: total,
      averageTransaction: total / txns.length,
      largestExpense: largest,
      transactionCount: txns.length,
    });
  };

  const handleExport = () => {
    const csv = [
      ["Date", "Description", "Category", "Amount"],
      ...transactions.map((t) => [
        new Date(t.date).toLocaleDateString(),
        t.description,
        t.category,
        t.amount,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-900 dark:to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={32} />
            <h1 className="text-4xl font-bold">Analytics & Reports</h1>
          </div>
          <p className="text-emerald-100">
            Detailed insights into your spending patterns and financial trends
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 mb-8 border border-gray-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-wrap">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="font-semibold text-gray-900 dark:text-white">
                Filters:
              </span>
            </div>

            <div className="flex gap-2">
              {["all", "week", "month", "year"].map((period) => (
                <Button
                  key={period}
                  variant={filter === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(period)}
                  className="capitalize"
                >
                  {period}
                </Button>
              ))}
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
            <Button
              onClick={handleExport}
              variant="secondary"
              className="gap-2 ml-auto"
            >
              <Download size={18} />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Expenses"
            value={`$${stats.totalExpenses.toFixed(2)}`}
            icon="💰"
            color="blue"
          />
          <StatCard
            title="Transactions"
            value={stats.transactionCount}
            icon="📊"
            color="purple"
          />
          <StatCard
            title="Average"
            value={`$${stats.averageTransaction.toFixed(2)}`}
            icon="📈"
            color="green"
          />
          <StatCard
            title="Largest Expense"
            value={`$${stats.largestExpense.toFixed(2)}`}
            icon="📌"
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Monthly Trend
            </h3>
            <MonthlyExpensesChart refreshTrigger={selectedCategory} />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Category Distribution
            </h3>
            <CategoryPieChart refreshTrigger={selectedCategory} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-800 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Budget Comparison
          </h3>
          <BudgetVsActualChart refreshTrigger={selectedCategory} />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Transaction Details
          </h3>

          {loading ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              Loading transactions...
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              No transactions found for the selected filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Description
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Category
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                        {transaction.description}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-900 dark:text-gray-100">
                        ${transaction.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400",
    purple:
      "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400",
    green:
      "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400",
    red: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400",
  };

  return (
    <div
      className={`rounded-xl p-6 border ${colorClasses[color]} hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}
