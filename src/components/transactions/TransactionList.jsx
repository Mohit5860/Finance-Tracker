"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

export default function TransactionList({ refreshTrigger }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [refreshTrigger]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/transactions/get");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    try {
      const res = await fetch(`/api/transactions/delete?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchTransactions();
      } else {
        console.error("Failed to delete");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (transactions.length === 0)
    return <div className="p-4">No transactions found.</div>;

  return (
    <div className="space-y-4 p-4">
      {transactions.map((tx) => (
        <Card key={tx._id} className="p-4 flex justify-between items-center">
          <div>
            <div className="font-semibold">{tx.description}</div>
            <div className="text-sm text-gray-500">
              {format(new Date(tx.date), "dd MMM yyyy")} — {tx.category}
            </div>
            <div className="text-green-600 font-bold mt-1">
              ${tx.amount.toFixed(2)}
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(tx._id)}
          >
            Delete
          </Button>
        </Card>
      ))}
    </div>
  );
}
