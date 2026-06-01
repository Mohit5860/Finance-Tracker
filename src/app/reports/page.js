"use client";

import { useState, useEffect, useCallback } from "react";
import { FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Reports() {
  const [reportData, setReportData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().split("T")[0].slice(0, 7),
  );
  const [loading, setLoading] = useState(false);

  const generateReport = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/transactions/get");
      const data = await response.json();

      const [year, month] = selectedMonth.split("-");
      const filtered = (data || []).filter((t) => {
        const tDate = new Date(t.date);
        return (
          tDate.getFullYear() === parseInt(year) &&
          tDate.getMonth() + 1 === parseInt(month)
        );
      });

      const totalSpent = filtered.reduce((sum, t) => sum + t.amount, 0);
      const byCategory = {};

      filtered.forEach((t) => {
        byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
      });

      setReportData({
        month: selectedMonth,
        transactions: filtered,
        totalSpent,
        byCategory,
        transactionCount: filtered.length,
      });
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedMonth]);

  useEffect(() => {
    generateReport();
  }, [generateReport]);

  const handleExportPDF = () => {
    // Simple text-based export (PDF would require a library)
    const text = generateReportText();
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Financial-Report-${selectedMonth}.txt`;
    a.click();
  };

  const generateReportText = () => {
    if (!reportData) return "";

    const date = new Date(reportData.month + "-01");
    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    let text = `FINANCIAL REPORT - ${monthYear}\n`;
    text += `Generated: ${new Date().toLocaleString()}\n`;
    text += `\n${"=".repeat(50)}\n\n`;

    text += `SUMMARY\n`;
    text += `${"─".repeat(50)}\n`;
    text += `Total Expenses: $${reportData.totalSpent.toFixed(2)}\n`;
    text += `Transactions: ${reportData.transactionCount}\n`;
    text += `Average per Transaction: $${(
      reportData.totalSpent / reportData.transactionCount || 0
    ).toFixed(2)}\n\n`;

    text += `BREAKDOWN BY CATEGORY\n`;
    text += `${"─".repeat(50)}\n`;
    Object.entries(reportData.byCategory)
      .sort((a, b) => b[1] - a[1])
      .forEach(([category, amount]) => {
        const percentage = ((amount / reportData.totalSpent) * 100).toFixed(1);
        text += `${category.padEnd(20)} $${amount.toFixed(2).padStart(10)} (${percentage}%)\n`;
      });

    text += `\n${"=".repeat(50)}\n\n`;
    text += `TRANSACTIONS\n`;
    text += `${"─".repeat(50)}\n`;

    reportData.transactions.forEach((t) => {
      const date = new Date(t.date).toLocaleDateString();
      text += `${date} | ${t.description.padEnd(30)} | ${t.category.padEnd(15)} | $${t.amount.toFixed(2)}\n`;
    });

    return text;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-900 dark:to-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3">
            <FileText size={32} />
            <div>
              <h1 className="text-4xl font-bold">Financial Reports</h1>
              <p className="text-amber-100 mt-2">
                Generate and download detailed financial reports
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Month Selector */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 mb-8 border border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Calendar
              size={20}
              className="text-amber-600 dark:text-amber-400"
            />
            <label className="font-semibold text-gray-900 dark:text-white">
              Select Month:
            </label>
          </div>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
          />
          <Button
            onClick={handleExportPDF}
            disabled={!reportData}
            className="gap-2 ml-auto"
          >
            <Download size={18} />
            Export Report
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            Generating report...
          </div>
        ) : reportData ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 shadow-md">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Total Expenses
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${reportData.totalSpent.toFixed(2)}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 shadow-md">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Transactions
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {reportData.transactionCount}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 shadow-md">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Average Transaction
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  $
                  {(
                    reportData.totalSpent / reportData.transactionCount || 0
                  ).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Spending by Category
              </h3>

              <div className="space-y-4">
                {Object.entries(reportData.byCategory)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, amount]) => {
                    const percentage = (
                      (amount / reportData.totalSpent) *
                      100
                    ).toFixed(1);
                    return (
                      <div key={category}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {category}
                          </span>
                          <div className="text-right">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              ${amount.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                              ({percentage}%)
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Transaction Details
              </h3>

              {reportData.transactions.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  No transactions found for this month.
                </p>
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
                      {reportData.transactions.map((t) => (
                        <tr
                          key={t._id}
                          className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                            {new Date(t.date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                            {t.description}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100">
                              {t.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-900 dark:text-gray-100">
                            ${t.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            Select a month to generate a report.
          </div>
        )}
      </div>
    </div>
  );
}
