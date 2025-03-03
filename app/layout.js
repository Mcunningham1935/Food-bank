"use client"; 
import { SessionProvider } from "next-auth/react";
import Header from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Community Food Pantry Tracker</title>
      </head>
      <body className="bg-gray-100 text-gray-900">
        <SessionProvider>
          <Header />
          <main className="container mx-auto p-6">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}

