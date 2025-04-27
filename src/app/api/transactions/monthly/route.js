import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";

export async function GET() {
  try {
    await connectDB();

    const transactions = await Transaction.find();

    // Group transactions by month
    const monthlyTotals = {};

    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      if (!monthlyTotals[month]) monthlyTotals[month] = 0;
      monthlyTotals[month] += t.amount;
    });

    const result = Object.entries(monthlyTotals).map(([month, total]) => ({
      month,
      total,
    }));

    return Response.json(result);
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch monthly data" }),
      { status: 500 }
    );
  }
}
