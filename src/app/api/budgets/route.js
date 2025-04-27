import { connectDB } from "@/lib/db";
import Budget from "@/models/Budget";

export async function POST(request) {
  try {
    await connectDB();

    const { category, amount, month } = await request.json();

    // Ensure month is provided for budget creation
    if (!month) {
      return new Response(JSON.stringify({ error: "Month is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existing = await Budget.findOne({ category, month });

    if (existing) {
      // Update existing budget for the category and month
      existing.amount = amount;
      await existing.save();
      return new Response(JSON.stringify(existing), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a new budget if it doesn't exist for the given category and month
    const budget = await Budget.create({ category, amount, month });
    return new Response(JSON.stringify(budget), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to save budget" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    await connectDB();

    const budgets = await Budget.find({});
    return new Response(JSON.stringify(budgets), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch budgets" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
