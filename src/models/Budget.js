import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
