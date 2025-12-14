"use client";
import { useState, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const defaultCenter = {
  lat: 51.0447,
  lng: -114.0719,
};

export default function Map({ listings, onMapClick, selectedLocation }) {
  const [selectedListing, setSelectedListing] = useState(null);

  const handleMapClick = useCallback(
    (e) => {
      if (onMapClick && e.latLng) {
        onMapClick(e.latLng.lat(), e.latLng.lng());
      }
    },
    [onMapClick]
  );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={selectedLocation || defaultCenter}
      zoom={selectedLocation ? 15 : 12}
      onClick={handleMapClick}
    >
      {selectedLocation && (
        <Marker
          position={selectedLocation}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      )}

      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={listing.location}
          onClick={() => setSelectedListing(listing)}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          }}
        />
      ))}

      {selectedListing && (
        <InfoWindow
          position={selectedListing.location}
          onCloseClick={() => setSelectedListing(null)}
        >
          <div className="p-2">
            <h3 className="font-bold text-lg text-green-600">{selectedListing.foodName}</h3>
            <p className="text-sm text-gray-600">{selectedListing.description}</p>
            <p className="text-xs text-gray-500 mt-1">{selectedListing.address}</p>
            <p className="text-xs text-red-600 mt-1">by {selectedListing.userName}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}