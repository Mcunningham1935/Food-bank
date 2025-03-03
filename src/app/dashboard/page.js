"use client";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const mapCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco as default

  useEffect(() => {
    if (status === "authenticated") {
      fetchDonations();
    }
  }, [status, searchTerm]);

  const fetchDonations = async () => {
    const res = await fetch("/api/donations");
    const data = await res.json();
    if (data.success) {
      let filteredDonations = data.donations;
      if (searchTerm) {
        filteredDonations = filteredDonations.filter((donation) =>
          donation.foodItem.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setDonations(filteredDonations);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">User Dashboard</h1>
      <button onClick={() => signOut()} className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded">Logout</button>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <input
          type="text"
          placeholder="Search donations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Donations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Your Donations</h2>
          {loading ? <p>Loading donations...</p> : (
            donations.length > 0 ? (
              donations.map((donation) => (
                <div key={donation._id} className="p-3 border-b flex justify-between items-center">
                  <div>
                    <p><strong>Food Item:</strong> {donation.foodItem}</p>
                    <p><strong>Quantity:</strong> {donation.quantity}</p>
                  </div>
                </div>
              ))
            ) : <p>No donations found.</p>
          )}
        </div>

        {/* Google Maps */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Nearby Food Pantries</h2>
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={mapCenter}
              zoom={12}
            >
              {/* Markers would be added dynamically */}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}

