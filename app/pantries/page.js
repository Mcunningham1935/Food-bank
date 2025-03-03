export default function Pantries() {
  // Sample data for food pantries (Replace with actual data later)
  const pantries = [
    { id: 1, name: "Downtown Food Bank", address: "123 Main St, Cityville", open: "9AM - 5PM" },
    { id: 2, name: "Community Kitchen", address: "456 Elm St, Townsville", open: "10AM - 6PM" },
    { id: 3, name: "Helping Hands Pantry", address: "789 Oak St, Villagetown", open: "8AM - 4PM" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Nearby Food Pantries
      </h1>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {pantries.map((pantry) => (
          <div key={pantry.id} className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">{pantry.name}</h2>
            <p className="text-gray-600">{pantry.address}</p>
            <p className="text-green-600 font-semibold">Open: {pantry.open}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

