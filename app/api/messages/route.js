import { connectToDatabase } from "@/app/lib/db";
import ContactMessage from "@/app/models/ContactMessage";

export async function GET(req) {
  try {
    await connectToDatabase();
    
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const search = url.searchParams.get("search") || "";
    const sortOrder = url.searchParams.get("sort") || "desc"; // Default: Newest First

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { message: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const totalMessages = await ContactMessage.countDocuments(query);
    const messages = await ContactMessage.find(query)
      .sort({ createdAt: sortOrder === "asc" ? 1 : -1 }) // Ascending or Descending
      .skip(skip)
      .limit(limit);

    return Response.json({
      success: true,
      messages,
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("❌ Database Error:", error);
    return Response.json({ success: false, message: "Error fetching messages." });
  }
}

