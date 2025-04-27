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

export default function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-10">
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Personal Finance Tracker
        </h1>

        {/* Transaction Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TransactionForm onTransactionAdded={handleRefresh} />
        </div>

        {/* Transaction List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TransactionList refreshTrigger={refresh} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <SummaryCards refreshTrigger={refresh} />
        </div>

        {/* Budget Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BudgetForm onBudgetAdded={handleRefresh} />
        </div>
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MonthlyExpensesChart refreshTrigger={refresh} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CategoryPieChart refreshTrigger={refresh} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BudgetVsActualChart refreshTrigger={refresh} />
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <SpendingInsights refreshTrigger={refresh} />
      </div>
    </div>
  );
}
