"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import FoodListingForm from "../components/FoodListingForm";
import Map from "../components/Map";
import { useAuth } from "../context/AuthContext";
import { addFoodListing } from "../lib/firestore";

export default function AddListingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleMapClick = async (lat, lng) => {
  setSelectedLocation({ lat, lng });
  
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();
  
  if (data.results && data.results[0]) {
    setAddress(data.results[0].formatted_address);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedLocation || !user) {
      alert("Please select a location on the map");
      return;
    }

    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const listing = {
      userId: user.uid,
      userName: user.displayName || "Anonymous",
      userEmail: user.email || "",
      foodName: formData.get("foodName"),
      description: formData.get("description"),
      imageUrl: formData.get("imageUrl"),
      location: selectedLocation,
      address: address,
      createdAt: Date.now(),
    };

    await addFoodListing(listing);
    setSubmitting(false);
    router.push("/");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Add Food Listing</h1>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit}>
              <FoodListingForm
                onLocationSelect={() => setShowMap(!showMap)}
                selectedLocation={selectedLocation}
                address={address}
              />

              {showMap && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Click on map to select location</h3>
                  <Map
                    listings={[]}
                    onMapClick={handleMapClick}
                    selectedLocation={selectedLocation}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedLocation || submitting}
                className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
              >
                {submitting ? "Adding Listing..." : "Add Listing"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}