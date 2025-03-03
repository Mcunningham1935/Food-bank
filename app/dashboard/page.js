"use client";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [donations, setDonations] = useState([]);
  const [pantryNeeds, setPantryNeeds] = useState([]);
  const [pantries, setPantries] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapCenter = { lat: 37.7749, lng: -122.4194 }; // Default: San Francisco

  useEffect(() => {
    if (status === "authenticated") {
      fetchDonations();
      fetchPantryNeeds();
      fetchPantries();
    }
  }, [status]);

  const fetchDonations = async () => {
    const res = await fetch("/api/donations");
    const data = await res.json();
    if (data.success) {
      setDonations(data.donations);
    }
    setLoading(false);
  };

  const fetchPantryNeeds = async () => {
    const res = await fetch("/api/pantries");
    const data = await res.json();
    if (data.success) {
      setPantryNeeds(data.pantries);
    }
  };

  const fetchPantries = async () => {
    const res = await fetch("/api/pantries");
    const data = await res.json();
    if (data.success) {
      setPantries(data.pantries.map((pantry) => ({
        id: pantry._id,
        name: pantry.name,
        lat: pantry.lat,
        lng: pantry.lng,
        neededItems: pantry.neededItems,
        location: pantry.location,
      })));
    }
  };

  if (status === "loading") return <p className="text-center">Checking authentication...</p>;
  if (status === "unauthenticated") return <p className="text-center">Please log in to access the dashboard.</p>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">User Dashboard</h1>
      <button onClick={() => signOut()} className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded">Logout</button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donations Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Your Donations</h2>
          {loading ? <p>Loading donations...</p> : (
            donations.length > 0 ? (
              donations.map((donation) => (
                <div key={donation._id} className="p-3 border-b">
                  <p><strong>Food Item:</strong> {donation.foodItem}</p>
                  <p><strong>Quantity:</strong> {donation.quantity}</p>
                  <p><strong>Date:</strong> {new Date(donation.createdAt).toLocaleString()}</p>
                </div>
              ))
            ) : <p>No donations yet.</p>
          )}
        </div>

        {/* Pantry Needs Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Local Pantry Needs</h2>
          {loading ? <p>Loading pantry needs...</p> : (
            pantryNeeds.length > 0 ? (
              pantryNeeds.map((pantry) => (
                <div key={pantry._id} className="p-3 border-b">
                  <p><strong>Pantry:</strong> {pantry.name}</p>
                  <p><strong>Needed Items:</strong> {pantry.neededItems.join(", ")}</p>
                  <p><strong>Location:</strong> {pantry.location}</p>
                </div>
              ))
            ) : <p>No urgent needs reported.</p>
          )}
        </div>
      </div>

      {/* Google Map */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Nearby Food Pantries</h2>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={mapCenter}
            zoom={12}
          >
            {pantries.map((pantry) => (
              <Marker 
                key={pantry.id}
                position={{ lat: pantry.lat, lng: pantry.lng }}
                title={pantry.name}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

