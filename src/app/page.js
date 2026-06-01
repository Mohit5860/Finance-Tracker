"use client";

import { useState } from "react";
import TransactionForm from "@/components/forms/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";
import BudgetForm from "@/components/forms/BudgetForm";
import BudgetVsActualChart from "@/components/charts/BudgetVsActualChart";
import SpendingInsights from "@/components/insights/SpendingInsights";
import MonthlyExpensesChart from "@/components/charts/MonthlyExpensesChart";
import CategoryPieChart from "@/components/charts/CategoryPieChart";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { ArrowRight, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold">Dashboard</h1>
              <p className="text-blue-100 mt-2">Welcome back! Manage your finances with ease</p>
            </div>
            <Link href="/analytics">
              <Button variant="secondary" className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30">
                View Analytics
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards - Key Metrics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <SummaryCards refreshTrigger={refresh} />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add Transaction Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <PlusCircle className="text-blue-600" size={24} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Transaction
                </h3>
              </div>
              <TransactionForm onTransactionAdded={handleRefresh} />
            </div>

            {/* Budget Form Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Set Budget
              </h3>
              <BudgetForm onBudgetAdded={handleRefresh} />
            </div>
          </div>

          {/* Right Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Charts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-slate-800">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4 uppercase tracking-wide">
                  Monthly Expenses
                </h4>
                <MonthlyExpensesChart refreshTrigger={refresh} />
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-slate-800">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4 uppercase tracking-wide">
                  By Category
                </h4>
                <CategoryPieChart refreshTrigger={refresh} />
              </div>
            </div>

            {/* Budget Comparison */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-slate-800">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4 uppercase tracking-wide">
                Budget vs Actual
              </h4>
              <BudgetVsActualChart refreshTrigger={refresh} />
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Insights</h2>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-slate-800">
            <SpendingInsights refreshTrigger={refresh} />
          </div>
        </div>

        {/* Transactions Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Transactions</h2>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-slate-800">
            <TransactionList refreshTrigger={refresh} />
          </div>
        </div>
      </div>
    </div>
  );
}
