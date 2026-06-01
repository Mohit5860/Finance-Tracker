import mongoose from "mongoose";
import { connectDB } from "@/lib/db";

let Goal;

async function initGoalModel() {
  if (Goal) return;

  const goalSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      targetAmount: { type: Number, required: true },
      currentAmount: { type: Number, default: 0 },
      deadline: { type: Date, required: true },
      category: { type: String, default: "saving" },
    },
    { timestamps: true }
  );

  Goal =
    mongoose.models.Goal || mongoose.model("Goal", goalSchema);
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    await connectDB();
    await initGoalModel();

    const goal = await Goal.findByIdAndUpdate(
      id,
      { currentAmount: body.currentAmount },
      { new: true }
    );

    return Response.json({ goal }, { status: 200 });
  } catch (error) {
    console.error("Error updating goal:", error);
    return Response.json(
      { error: "Failed to update goal", details: error.message },
      { status: 500 }
    );
  }
}
