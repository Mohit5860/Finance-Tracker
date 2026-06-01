import { connectDB } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import Transaction from "@/models/Transaction";

export async function GET(request) {
  try {
    await connectDB();
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const transactions = await Transaction.find({ userId });

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
      { status: 500 },
    );
  }
}
