import { connectDB } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import Transaction from "@/models/Transaction";

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

    const { amount, date, description, category } = await request.json();

    const transaction = await Transaction.create({
      userId,
      amount,
      date,
      description,
      category,
    });

    return new Response(JSON.stringify(transaction), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to add transaction" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
