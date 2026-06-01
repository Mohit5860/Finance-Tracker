import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    category: { type: String, default: "saving" },
  },
  { timestamps: true }
);

export default mongoose.models.Goal || mongoose.model("Goal", GoalSchema);
