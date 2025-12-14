"use client";
import { MapPin, User, Trash2, Edit } from "lucide-react";

export default function FoodListingCard({ listing, showActions = false, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={listing.imageUrl}
        alt={listing.foodName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-red-900 mb-2">{listing.foodName}</h3>
        <p className="text-gray-600 mb-3">{listing.description}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <MapPin size={16} />
          <span>{listing.address}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-green-600 mb-3">
          <User size={16} />
          <span>Shared by {listing.userName}</span>
        </div>

        <p className="text-xs text-gray-400">
          {new Date(listing.createdAt).toLocaleDateString()}
        </p>

        {showActions && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onEdit && onEdit(listing)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={() => onDelete && onDelete(listing.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}