import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  foodItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  donorEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);

