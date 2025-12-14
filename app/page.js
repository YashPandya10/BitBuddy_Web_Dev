"use client";
import { useState, useEffect } from "react";
import Map from "./components/Map";
import FoodListingCard from "./components/FoodListingCard";
import { getAllFoodListings } from "./lib/firestore";

export default function HomePage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const data = await getAllFoodListings();
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading food listings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Discover Food Near You
          </h1>
          <p className="text-gray-600">
            Browse available food shared by your community members
          </p>
        </div>

        <div className="mb-8">
          <Map listings={listings} />
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Available Food Listings</h2>
          <p className="text-gray-600">
            {listings.length} {listings.length === 1 ? "item" : "items"} available
          </p>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-black-500">
              No food listings available yet. Be the first to share!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <FoodListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}