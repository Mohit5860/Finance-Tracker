import { connectDB } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import Budget from "@/models/Budget";

export async function POST(request) {
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

    const { category, amount, month } = await request.json();

    const budget = await Budget.create({ category, amount, month, userId });

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
