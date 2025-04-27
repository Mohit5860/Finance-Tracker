"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function SpendingInsights({ refreshTrigger }) {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetchInsights();
  }, [refreshTrigger]);

  const fetchInsights = async () => {
    try {
      const res = await fetch("/api/budgets/insights");
      const json = await res.json();
      setInsights(json);
    } catch (err) {
      console.error("Failed to fetch insights", err);
    }
  };

  if (insights.length === 0) {
    return (
      <Card className="p-4">
        <CardContent>No insights available yet.</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {insights.map((item, index) => (
        <Card
          key={index}
          className="p-4 border-l-4"
          style={{
            borderLeftColor: item.type === "over" ? "#f87171" : "#34d399", // red or green
          }}
        >
          <CardContent>
            <p className="font-medium">{item.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
