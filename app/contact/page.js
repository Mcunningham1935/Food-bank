"use client"; // Required for event handling in Next.js App Router
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const result = await response.json();

  if (result.success) {
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    setFormData({ name: "", email: "", message: "" });
  } else {
    alert("Error sending message. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Contact Us</h1>
      
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
          <label className="block font-medium">Your Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send Message
        </button>
      </form>
    </div>
  );
}

