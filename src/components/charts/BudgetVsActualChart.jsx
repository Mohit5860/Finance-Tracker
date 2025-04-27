"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BudgetVsActualChart({ refreshTrigger }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchBudgetVsActual();
  }, [refreshTrigger]);

  const fetchBudgetVsActual = async () => {
    try {
      const res = await fetch("/api/budgets/compare");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch budget vs actual", err);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow bg-white">
      <h2 className="text-lg font-semibold mb-4">Budget vs Actual Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Budgeted" />
          <Bar dataKey="actual" fill="#82ca9d" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
