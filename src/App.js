import React from "react";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      rm -rf app
      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mt-10">Welcome to the Community Food Pantry Tracker</h2>
        <p className="text-center text-gray-600 mt-4">
          Find local food pantries, check their needs, and contribute to the community.
        </p>
      </main>
    </div>
  );
}

  
