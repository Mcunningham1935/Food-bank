import { connectToDatabase } from "../../../lib/db";
import Donation from "../../../models/Donation";

export async function GET() {
  try {
    await connectToDatabase();
    const donations = await Donation.find().sort({ createdAt: -1 });

    return Response.json({ success: true, donations });
  } catch (error) {
    console.error("❌ Error fetching donations:", error);
    return Response.json({ success: false, message: "Error fetching donations." });
  }
}

export async function POST(req) {
  try {
    const { foodItem, quantity, donorEmail } = await req.json();
    await connectToDatabase();
    const newDonation = new Donation({ foodItem, quantity, donorEmail });
    await newDonation.save();

    return Response.json({ success: true, message: "Donation added successfully!" });
  } catch (error) {
    console.error("❌ Error adding donation:", error);
    return Response.json({ success: false, message: "Error adding donation." });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await connectToDatabase();
    await Donation.findByIdAndDelete(id);

    return Response.json({ success: true, message: "Donation deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting donation:", error);
    return Response.json({ success: false, message: "Error deleting donation." });
  }
}

export async function PUT(req) {
  try {
    const { id, foodItem, quantity } = await req.json();
    await connectToDatabase();
    await Donation.findByIdAndUpdate(id, { foodItem, quantity });

    return Response.json({ success: true, message: "Donation updated successfully!" });
  } catch (error) {
    console.error("❌ Error updating donation:", error);
    return Response.json({ success: false, message: "Error updating donation." });
  }
}


