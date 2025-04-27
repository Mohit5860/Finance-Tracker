import { connectDB } from "@/lib/db";
import Budget from "@/models/Budget";

export async function POST(request) {
  try {
    await connectDB();

    const { category, amount, month } = request.json();

    const budget = await Budget.create({ category, amount, month });

    return new Response(JSON.stringify(budget), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to add budget" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
