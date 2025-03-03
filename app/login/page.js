"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result.error) {
      setError("Invalid credentials");
    } else {
      router.push("/messages");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Login</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block font-medium">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}

