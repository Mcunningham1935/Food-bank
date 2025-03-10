import mongoose from "mongoose";
import dotenv from "dotenv";
import Donation from "../src/app/models/Donation.js";

dotenv.config();

async function seedDonations() {
  await mongoose.connect(process.env.MONGODB_URI);

  const sampleDonations = [
    { foodItem: "Canned Beans", quantity: 20 },
    { foodItem: "Rice Bags", quantity: 50 },
    { foodItem: "Peanut Butter", quantity: 15 },
    { foodItem: "Pasta", quantity: 30 },
    { foodItem: "Cereal Boxes", quantity: 25 },
  ];

  await Donation.insertMany(sampleDonations);
  console.log("✅ Sample donations added!");
  process.exit();
}

seedDonations();

