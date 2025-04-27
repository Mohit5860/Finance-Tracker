"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

const categories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Shopping",
  "Others",
];

export default function TransactionForm({ onTransactionAdded }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date || !description || !category) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/transactions/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          date,
          description,
          category,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onTransactionAdded(data);
        setAmount("");
        setDate(format(new Date(), "yyyy-MM-dd"));
        setDescription("");
        setCategory(categories[0]);
        setSuccess(true);
      } else {
        console.error("Failed to add transaction");
        setError("Failed to add transaction. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 border rounded-xl shadow-lg bg-white"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add Transaction</h2>

      {error && (
        <div className="text-red-500 text-sm font-semibold">{error}</div>
      )}

      {success && (
        <div className="text-green-500 text-sm font-semibold">
          Transaction added successfully!
        </div>
      )}

      <div>
        <Label>Amount</Label>
        <Input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
          className="w-full"
        />
      </div>

      <div>
        <Label>Date</Label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full"
        />
      </div>

      <div>
        <Label>Description</Label>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
          className="w-full"
        />
      </div>

      <div>
        <Label>Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={loading} className="mt-4">
        {loading ? "Adding..." : "Add Transaction"}
      </Button>
    </form>
  );
}
