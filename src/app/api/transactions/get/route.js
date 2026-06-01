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

    return new Response(JSON.stringify(transactions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch transactions" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
