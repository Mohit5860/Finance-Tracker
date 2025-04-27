import { connectDB } from "@/lib/db";
import Budget from "@/models/Budget";
import Transaction from "@/models/Transaction";

export async function GET() {
  try {
    await connectDB();

    const budgets = await Budget.find({});
    const transactions = await Transaction.find({});

    const actuals = {};
    transactions.forEach((tx) => {
      if (!actuals[tx.category]) actuals[tx.category] = 0;
      actuals[tx.category] += tx.amount;
    });

    const result = budgets.map((budget) => ({
      category: budget.category,
      budget: budget.amount,
      actual: actuals[budget.category] || 0,
    }));

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to compare budgets" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
