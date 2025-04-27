"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const predefinedCategories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Shopping",
  "Others",
];

export default function BudgetForm({ onBudgetAdded }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState(
    new Date().toLocaleString("default", { month: "short", year: "numeric" })
  );
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!category || !amount || !month) {
      setError("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, amount: parseFloat(amount), month }),
      });

      if (!res.ok) throw new Error("Failed to add budget");

      setCategory("");
      setAmount("");
      setMonth(
        new Date().toLocaleString("default", {
          month: "short",
          year: "numeric",
        })
      );
      onBudgetAdded();
    } catch (error) {
      console.error(error);
      setError("Error adding budget. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 border rounded-xl shadow-lg bg-white"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        Set Monthly Budget
      </h2>

      {error && (
        <div className="text-red-500 text-sm font-semibold">{error}</div>
      )}

      <div>
        <Label>Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {predefinedCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Month</Label>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger>
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value={new Date().toLocaleString("default", {
                month: "short",
                year: "numeric",
              })}
            >
              {new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Budget Amount (₹)</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="0"
          step="any"
        />
      </div>

      <Button type="submit" className="mt-4" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Budget"}
      </Button>
    </form>
  );
}
