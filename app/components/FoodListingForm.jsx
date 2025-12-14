"use client";
import { useState } from "react";

const foodImages = [
  { name: "Pizza", url: "/pizza.jpg" },
  { name: "Burger", url: "/burger.jpg" },
  { name: "Salad", url: "/salad.jpg" },
  { name: "Pasta", url: "/pasta.jpg" },
  { name: "Sandwich", url: "/sandwich.jpg" },
];

export default function FoodListingForm({ onLocationSelect, selectedLocation, address, editListing }) {
  const [form, setForm] = useState({
    foodName: editListing?.foodName || "",
    description: editListing?.description || "",
    imageUrl: editListing?.imageUrl || foodImages[0].url,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (url) => {
    setForm({ ...form, imageUrl: url });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-900 font-semibold mb-2">Food Name</label>
        <input
          type="text"
          name="foodName"
          value={form.foodName}
          onChange={handleChange}
          placeholder="Enter food name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block text-gray-900 font-semibold mb-2">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the food"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block text-gray-900 font-semibold mb-2">Select Food Type</label>
        <div className="grid grid-cols-5 gap-4">
          {foodImages.map((img) => (
            <div
              key={img.url}
              onClick={() => handleImageSelect(img.url)}
              className={`cursor-pointer rounded-lg overflow-hidden border-4 transition ${
                form.imageUrl === img.url ? "border-green-500" : "border-gray-500"
              }`}
            >
              <img src={img.url} alt={img.name} className="w-full h-24 object-cover mx-auto" />
              <p className="text-center text-xs py-1 font-semibold text-gray-800">{img.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-900 font-semibold mb-2">Location</label>
        <button
          type="button"
          onClick={onLocationSelect}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {selectedLocation ? "Change Location on Map" : "Select Location on Map"}
        </button>
        {address && (
          <p className="mt-2 text-sm text-gray-600">Selected: {address}</p>
        )}
      </div>

      <input type="hidden" name="imageUrl" value={form.imageUrl} />
      <input type="hidden" name="foodName" value={form.foodName} />
      <input type="hidden" name="description" value={form.description} />
    </div>
  );
}