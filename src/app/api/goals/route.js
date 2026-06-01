import mongoose from "mongoose";
import { connectDB } from "@/lib/db";

// Create a Goal model if it doesn't exist
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    await connectDB();
    await initGoalModel();

    if (id) {
      const goal = await Goal.findById(id);
      return Response.json({ goal }, { status: 200 });
    }

    const goals = await Goal.find({}).sort({ createdAt: -1 });
    return Response.json({ goals }, { status: 200 });
  } catch (error) {
    console.error("Error fetching goals:", error);
    return Response.json(
      { error: "Failed to fetch goals", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();
    await initGoalModel();

    const goal = new Goal({
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
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        { error: "Goal ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    await initGoalModel();

    await Goal.findByIdAndDelete(id);
    return Response.json(
      { message: "Goal deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting goal:", error);
    return Response.json(
      { error: "Failed to delete goal", details: error.message },
      { status: 500 }
    );
  }
}
