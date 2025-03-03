import { connectToDatabase } from "../../../lib/db";
import ContactMessage from "../../../models/ContactMessage";

export async function GET() {
  try {
    await connectToDatabase();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return Response.json({ success: true, messages });
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    return Response.json({ success: false, message: "Error fetching messages." });
  }
}

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    await connectToDatabase();
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    return Response.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending message:", error);
    return Response.json({ success: false, message: "Error sending message." });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await connectToDatabase();
    await ContactMessage.findByIdAndDelete(id);

    return Response.json({ success: true, message: "Message deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting message:", error);
    return Response.json({ success: false, message: "Error deleting message." });
  }
}

