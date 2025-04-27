"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyExpensesChart({ refreshTrigger }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMonthlyData();
  }, [refreshTrigger]);

  const fetchMonthlyData = async () => {
    try {
      const res = await fetch("/api/transactions/monthly");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch monthly expenses", err);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
