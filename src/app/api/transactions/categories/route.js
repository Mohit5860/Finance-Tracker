import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";

export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find({});

    const categories = {};

    transactions.forEach((tx) => {
      if (!categories[tx.category]) categories[tx.category] = 0;
      categories[tx.category] += tx.amount;
    });

    const result = Object.keys(categories).map((category) => ({
      category,
      total: categories[category],
    }));

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch categories" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
