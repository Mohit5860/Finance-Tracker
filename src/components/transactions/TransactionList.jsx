"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

export default function TransactionList({ refreshTrigger }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [refreshTrigger]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state
      const res = await fetch("/api/transactions/get");
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
      setError("An error occurred while fetching transactions.");
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
        setDeleteSuccess(true);
        fetchTransactions();
      } else {
        console.error("Failed to delete");
        setDeleteSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setDeleteSuccess(false);
    }
  };

  if (loading) return <div className="p-4">Loading transactions...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (transactions.length === 0)
    return <div className="p-4 text-gray-500">No transactions found.</div>;

  return (
    <div className="space-y-4 p-4">
      {deleteSuccess && (
        <div className="text-green-600 font-semibold">
          Transaction deleted successfully!
        </div>
      )}
      {transactions.map((tx) => (
        <Card key={tx._id} className="p-4 border">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold">{tx.description}</div>
              <div className="text-sm text-gray-500">
                {format(new Date(tx.date), "dd MMM yyyy")} — {tx.category}
              </div>
              <div className="text-green-600 font-bold mt-1">
                ₹{tx.amount.toFixed(2)}
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(tx._id)}
              className="ml-4 w-20"
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
