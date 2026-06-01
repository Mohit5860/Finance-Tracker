import { connectDB } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import Transaction from "@/models/Transaction";

export async function GET(request) {
  try {
    await connectDB();
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    const totalExpenses = transactions.reduce((acc, tx) => acc + tx.amount, 0);

    const categoryTotals = {};
    transactions.forEach((tx) => {
      if (!categoryTotals[tx.category]) categoryTotals[tx.category] = 0;
      categoryTotals[tx.category] += tx.amount;
    });

    const topCategory = Object.keys(categoryTotals).reduce(
      (a, b) => (categoryTotals[a] > categoryTotals[b] ? a : b),
      ""
    );

    const summary = {
      totalExpenses,
      topCategory,
      topCategoryAmount: categoryTotals[topCategory] || 0,
      recentTransactions: transactions.slice(0, 5),
    };

    return new Response(JSON.stringify(summary), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch summary" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
