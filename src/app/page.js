"use client";

import { useState } from "react";
import TransactionForm from "@/components/forms/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";
import MonthlyExpensesChart from "@/components/charts/MonthlyExpensesChart";
import SummaryCards from "@/components/dashboard/SummaryCards";
import CategoryPieChart from "@/components/charts/CategoryPieChart";

export default function HomePage() {
  const [refresh, setRefresh] = useState(false);

  const handleTransactionAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <MonthlyExpensesChart refreshTrigger={refresh} />
      <TransactionList refreshTrigger={refresh} />
      <SummaryCards refreshTrigger={refresh} />
      <CategoryPieChart refreshTrigger={refresh} />
    </div>
  );
}
