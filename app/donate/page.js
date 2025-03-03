"use client"; // Required for event handling in Next.js App Router
import { useState } from "react";

export default function Donate() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    item: "",
    quantity: 1,
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your donation of ${formData.quantity} ${formData.item}(s) is scheduled.`);
    setFormData({ name: "", email: "", item: "", quantity: 1, date: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Schedule a Donation</h1>
      
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Your Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Food Item</label>
          <select name="item" value={formData.item} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select an item</option>
            <option value="Canned Beans">Canned Beans</option>
            <option value="Rice">Rice</option>
            <option value="Pasta">Pasta</option>
            <option value="Vegetables">Vegetables</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Donation Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Schedule Donation
        </button>
      </form>
    </div>
  );
}

