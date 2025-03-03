"use client";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Messages() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // Default: Newest First
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      async function fetchMessages() {
        const res = await fetch(`/api/messages?page=${page}&search=${search}&sort=${sortOrder}`);
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages);
          setTotalPages(data.totalPages);
        }
        setLoading(false);
      }
      fetchMessages();
    }
  }, [status, page, search, sortOrder]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      const res = await fetch("/api/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        setMessages(messages.filter((msg) => msg._id !== id));
        setDeleteMessage("Message deleted successfully!");
        setTimeout(() => setDeleteMessage(null), 3000);
      } else {
        alert("Error deleting message.");
      }
    }
  };

  if (status === "loading") return <p className="text-center">Checking authentication...</p>;
  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Admin Messages</h1>

      <button onClick={() => signOut()} className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded">Logout</button>

      {deleteMessage && <p className="text-center text-green-600">{deleteMessage}</p>}

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-4">
        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Sorting Dropdown */}
      <div className="max-w-md mx-auto mb-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center">No messages found.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-semibold">{msg.name}</h2>
              <p className="text-gray-600">{msg.email}</p>
              <p className="mt-2">{msg.message}</p>
              <p className="text-sm text-gray-400 mt-2">Received on: {new Date(msg.createdAt).toLocaleString()}</p>
              <button 
                onClick={() => handleDelete(msg._id)}
                className="mt-3 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${page === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

