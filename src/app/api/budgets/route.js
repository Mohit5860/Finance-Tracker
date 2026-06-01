import { connectDB } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import Budget from "@/models/Budget";

export async function POST(request) {
  try {
    await connectDB();
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { category, amount, month } = await request.json();

    if (!month) {
      return new Response(JSON.stringify({ error: "Month is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existing = await Budget.findOne({ category, month, userId });

    if (existing) {
      existing.amount = amount;
      await existing.save();
      return new Response(JSON.stringify(existing), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const budget = await Budget.create({ category, amount, month, userId });
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

    const budgets = await Budget.find({ userId });
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

export async function DELETE(request) {
  try {
    await connectDB();
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing budget ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await Budget.deleteOne({ _id: id, userId });
    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Budget not found or unauthorized" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ message: "Deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to delete budget" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
