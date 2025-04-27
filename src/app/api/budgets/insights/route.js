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

    const insights = [];

    budgets.forEach((budget) => {
      const spent = actuals[budget.category] || 0;
      if (spent > budget.amount) {
        insights.push({
          type: "over",
          message: `You're over budget in ${budget.category} by ₹${(
            spent - budget.amount
          ).toFixed(2)}.`,
        });
      } else if (spent > 0) {
        const percent = ((spent / budget.amount) * 100).toFixed(0);
        insights.push({
          type: "good",
          message: `You spent ${percent}% of your ${budget.category} budget.`,
        });
      }
    });

    return new Response(JSON.stringify(insights), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to generate insights" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
