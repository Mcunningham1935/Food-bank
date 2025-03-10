import { UsersIcon, HeartIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-5xl font-bold">Community Food Pantry Tracker</h1>
        <p className="mt-4 text-lg">
          Find local food pantries, check their needs, and contribute to the community.
        </p>
        <div className="mt-6">
          <a
            href="/donate"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold shadow-md hover:bg-gray-200 transition"
          >
            Donate Now
          </a>
          <a
            href="/dashboard"
            className="ml-4 bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-yellow-600 transition"
          >
            Find a Pantry
          </a>
        </div>
      </header>

      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-4xl font-bold text-blue-600">How It Works</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <UsersIcon className="w-10 h-10 text-blue-600 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Find Pantries</h3>
            <p className="mt-2 text-gray-600">
              See real-time inventory updates from local food pantries.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <HeartIcon className="w-10 h-10 text-red-500 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Donate Food</h3>
            <p className="mt-2 text-gray-600">
              Easily schedule donations and help fulfill urgent needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <CheckCircleIcon className="w-10 h-10 text-green-500 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Track Your Impact</h3>
            <p className="mt-2 text-gray-600">
              See how your donations are making a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Community Impact with Illustration */}
      <section className="bg-blue-50 py-12 text-center">
        <h2 className="text-4xl font-bold text-blue-600">Our Community Impact</h2>
        <p className="mt-4 text-lg text-gray-700">
          Together, we have provided over{" "}
          <span className="text-blue-600 font-bold">10,000 meals</span> to families in need.
        </p>
        <img
          src="https://undraw.co/illustrations/random-food"
          alt="Community Impact"
          className="w-1/2 mx-auto mt-6"
        />
      </section>
    </div>
  );
}
