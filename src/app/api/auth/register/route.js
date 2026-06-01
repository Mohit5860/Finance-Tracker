import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return Response.json(
        { error: "Please provide all required fields" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return Response.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return Response.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
    });

    await user.save();

    // Return user without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return Response.json(
      { message: "User registered successfully", user: userResponse },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return Response.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    return Response.json(
      { error: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}
