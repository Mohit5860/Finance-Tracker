"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#4f46e5",
  "#6366f1",
  "#818cf8",
  "#a5b4fc",
  "#c7d2fe",
  "#e0e7ff",
  "#d1d5db",
  "#9ca3af",
];

export default function CategoryPieChart({ refreshTrigger }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCategoryData();
  }, [refreshTrigger]);

  const fetchCategoryData = async () => {
    try {
      const res = await fetch("/api/transactions/categories");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch category data", err);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
