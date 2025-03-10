"use client";
import { useEffect, useState } from "react";
import { GiftIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      const res = await fetch("/api/donations");
      const data = await res.json();
      if (data.success) {
        setDonations(data.donations);
      }
      setLoading(false);
    };
    fetchDonations();
  }, []);

  const filteredDonations = donations.filter((donation) =>
    donation.foodItem.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">Your Donations</h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search donations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading donations...</p>
      ) : filteredDonations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <GiftIcon className="w-10 h-10 text-yellow-500 mx-auto" />
              <h2 className="text-2xl font-bold text-blue-600 text-center">
                {donation.foodItem}
              </h2>
              <p className="mt-2 text-gray-700 text-center">
                Quantity: <span className="font-medium">{donation.quantity}</span>
              </p>
              <p className="mt-1 text-gray-500 text-center">
                Date:{" "}
                {new Date(donation.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No donations found.</p>
      )}
    </div>
  );
}
