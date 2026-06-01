import { connectDB } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import Goal from "@/models/Goal";

export async function GET(request) {
  try {
    await connectDB();
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const goal = await Goal.findOne({ _id: id, userId });
      if (!goal) {
        return Response.json(
          { error: "Goal not found or unauthorized" },
          { status: 403 },
        );
      }
      return Response.json({ goal }, { status: 200 });
    }

    const goals = await Goal.find({ userId }).sort({ createdAt: -1 });
    return Response.json({ goals }, { status: 200 });
  } catch (error) {
    console.error("Error fetching goals:", error);
    return Response.json(
      { error: "Failed to fetch goals", details: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const goal = new Goal({
      userId,
      name: body.name,
      targetAmount: body.targetAmount,
      currentAmount: body.currentAmount || 0,
      deadline: new Date(body.deadline),
      category: body.category,
    });

    await goal.save();
    return Response.json({ goal }, { status: 201 });
  } catch (error) {
    console.error("Error creating goal:", error);
    return Response.json(
      { error: "Failed to create goal", details: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Goal ID is required" }, { status: 400 });
    }

    const result = await Goal.deleteOne({ _id: id, userId });
    if (result.deletedCount === 0) {
      return Response.json(
        { error: "Goal not found or unauthorized" },
        { status: 403 },
      );
    }

    return Response.json(
      { message: "Goal deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting goal:", error);
    return Response.json(
      { error: "Failed to delete goal", details: error.message },
      { status: 500 },
    );
  }
}
