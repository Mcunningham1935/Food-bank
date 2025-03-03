"use client"; // Required for Next.js App Router when using event handlers

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">
          <Link href="/">Community Food Pantry</Link>
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <ul className={`md:flex space-x-4 ${isOpen ? "block" : "hidden"} md:block`}>
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/pantries" className="hover:underline">Pantries</Link></li>
          <li><Link href="/donate" className="hover:underline">Donate</Link></li>
          <li><Link href="/contact" className="hover:underline">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}

