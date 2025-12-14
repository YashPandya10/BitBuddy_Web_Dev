"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import FoodListingCard from "../components/FoodListingCard";
import Map from "../components/Map";
import FoodListingForm from "../components/FoodListingForm";
import { useAuth } from "../context/AuthContext";
import { getUserFoodListings, deleteFoodListing, updateFoodListing } from "../lib/firestore";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingListing, setEditingListing] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchUserListings = async () => {
      if (user) {
        const data = await getUserFoodListings(user.uid);
        setListings(data);
      }
      setLoading(false);
    };
    fetchUserListings();
  }, [user]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      await deleteFoodListing(id);
      setListings(listings.filter((l) => l.id !== id));
    }
  };

  const handleEdit = (listing) => {
    setEditingListing(listing);
    setSelectedLocation(listing.location);
    setAddress(listing.address);
    setShowMap(true);
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!editingListing || !selectedLocation) return;

    const formData = new FormData(e.currentTarget);
    const updatedData = {
      foodName: formData.get("foodName"),
      description: formData.get("description"),
      imageUrl: formData.get("imageUrl"),
      location: selectedLocation,
      address: address,
    };

    await updateFoodListing(editingListing.id, updatedData);
    
    setListings(
      listings.map((l) =>
        l.id === editingListing.id ? { ...l, ...updatedData } : l
      )
    );
    
    setEditingListing(null);
    setShowMap(false);
  };

  const handleCancelEdit = () => {
    setEditingListing(null);
    setShowMap(false);
    setSelectedLocation(null);
    setAddress("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading your listings...</div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              {user?.photoURL && (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{user?.displayName}</h1>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-green-600 font-semibold mt-2">
                  {listings.length} {listings.length === 1 ? "listing" : "listings"}
                </p>
              </div>
            </div>
          </div>

          {editingListing ? (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Listing</h2>
              <form onSubmit={handleUpdate}>
                <FoodListingForm
                  onLocationSelect={() => setShowMap(!showMap)}
                  selectedLocation={selectedLocation}
                  address={address}
                  editListing={editingListing}
                />

                {showMap && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Click on map to change location</h3>
                    <Map
                      listings={[]}
                      onMapClick={handleMapClick}
                      selectedLocation={selectedLocation}
                    />
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Update Listing
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Food Listings</h2>

              {listings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <p className="text-xl text-gray-500 mb-4">
                    You haven&apos;t shared any food yet
                  </p>
                  <button
                    onClick={() => router.push("/add-listing")}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Share Your First Food
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map((listing) => (
                    <FoodListingCard
                      key={listing.id}
                      listing={listing}
                      showActions={true}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}