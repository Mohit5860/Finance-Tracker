import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Helper to extract userId from auth state
export function getUserIdFromRequest(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.id;
  } catch (error) {
    console.error("Auth error in getUserIdFromRequest:", error.message);
    return null;
  }
}

// Helper to validate user ownership of data
export async function validateUserOwnership(userId, documentId, Model) {
  if (!userId || !documentId) return false;
  
  const doc = await Model.findOne({
    _id: documentId,
    userId: userId,
  });
  
  return !!doc;
}
