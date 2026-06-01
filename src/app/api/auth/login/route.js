import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { sign } from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: "Please provide email and password" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );

    if (!user) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const passwordMatch = await user.matchPassword(password);

    if (!passwordMatch) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const token = sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET || "your-secret-key-change-in-production",
      { expiresIn: "30d" },
    );

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return Response.json(
      {
        message: "Login successful",
        user: userResponse,
        token,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { error: error.message || "Login failed" },
      { status: 500 },
    );
  }
}
