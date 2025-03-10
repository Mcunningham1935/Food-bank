import { FaHandsHelping, FaUtensils, FaChartLine } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 text-gray-900">
      
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20 text-center">
        <h1 className="text-5xl font-extrabold leading-tight">
          Community Food Pantry Tracker
        </h1>
        <p className="mt-6 text-xl max-w-2xl mx-auto">
          Help fight hunger by finding local pantries, viewing their needs, and making an impact.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <a
            href="/donate"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100"
          >
            Donate Now
          </a>
          <a
            href="/dashboard"
            className="bg-yellow-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-500"
          >
            Find a Pantry
          </a>
        </div>
      </header>

      {/* How It Works */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-extrabold text-blue-600">How It Works</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          Join our mission to ensure no one goes hungry in our community.
        </p>
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          
          <div className="p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition">
            <FaHandsHelping className="text-blue-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold">Find Pantries</h3>
            <p className="mt-2 text-gray-600">
              Search for nearby pantries and view their real-time inventory.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition">
            <FaUtensils className="text-green-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold">Donate Food</h3>
            <p className="mt-2 text-gray-600">
              View urgent needs and schedule donations with ease.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition">
            <FaChartLine className="text-purple-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold">Track Your Impact</h3>
            <p className="mt-2 text-gray-600">
              See how your contributions support the community.
            </p>
          </div>

        </div>
      </section>

      {/* Community Impact */}
      <section className="py-20 bg-gradient-to-r from-teal-100 to-blue-100 text-center">
        <h2 className="text-4xl font-extrabold text-teal-600">
          Our Community Impact
        </h2>
        <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto">
          Together we've provided over{" "}
          <span className="text-teal-700 font-extrabold">10,000 meals</span>{" "}
          to families in need. Join us in making a difference.
        </p>
        <a
          href="/register"
          className="mt-8 inline-block bg-teal-500 text-white px-10 py-3 rounded-full font-bold shadow-md hover:bg-teal-600"
        >
          Get Involved
        </a>
      </section>
    </div>
  );
}
