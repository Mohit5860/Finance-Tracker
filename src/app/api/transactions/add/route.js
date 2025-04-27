import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";

export async function POST(request) {
  try {
    await connectDB();

    const { amount, date, description, category } = await request.json();

    const transaction = await Transaction.create({
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
