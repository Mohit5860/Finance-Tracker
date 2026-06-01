import { connectDB } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import Goal from "@/models/Goal";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    await connectDB();
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const goal = await Goal.findOneAndUpdate(
      { _id: id, userId },
      { currentAmount: body.currentAmount },
      { new: true },
    );

    if (!goal) {
      return Response.json(
        { error: "Goal not found or unauthorized" },
        { status: 403 },
      );
    }

    return Response.json({ goal }, { status: 200 });
  } catch (error) {
    console.error("Error updating goal:", error);
    return Response.json(
      { error: "Failed to update goal", details: error.message },
      { status: 500 },
    );
  }
}
