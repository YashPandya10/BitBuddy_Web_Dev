"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Plus, Home } from "lucide-react";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            🍔 BiteBuddy
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <Home size={20} />
                  Home
                </Link>
                <Link
                  href="/add-listing"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <Plus size={20} />
                  Add Listing
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <User size={20} />
                  Profile
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}