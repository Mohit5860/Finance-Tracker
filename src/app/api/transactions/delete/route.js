import { connectDB } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import Transaction from "@/models/Transaction";

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
      return new Response(JSON.stringify({ error: "Missing transaction ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await Transaction.deleteOne({ _id: id, userId });
    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Transaction not found or unauthorized" }),
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
    return new Response(
      JSON.stringify({ error: "Failed to delete transaction" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
