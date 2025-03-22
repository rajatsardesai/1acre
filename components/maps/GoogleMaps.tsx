"use client";

import React, { useEffect, useRef, useState } from "react";
import { addSingleMarkers } from "@/components/maps/markers/addSingleMarkers";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const DEFAULT_CENTER = { lat: 28.4595, lng: 77.0266 };
const DEFAULT_ZOOM = 9;

export const GoogleMaps = ({
  locations,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LandMap | null>(
    null,
  );

  // Destructure selected location values
  const {
    land_price: { price_per_acre_crore: { lakh = 0, crore = 0 } = {} } = {},
    land_size: {
      total_land_size_in_acres: { acres = 0, cents = 0, guntas = 0 } = {},
    } = {},
    total_price = 0,
  } = selectedLocation || {};

  // Format price based on available data
  const displayPrice =
    acres !== null ? formatPrice(lakh, crore) : formatPrice(total_price);

  // Determine the pricing unit dynamically
  const unit =
    acres !== null ? "/acre" : cents !== null ? "/cents" : " for full property";

  // Initialize Google Map and add markers
  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        mapTypeId: "hybrid",
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      });

      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((location, index) => {
        bounds.extend(location);
      });

      map.fitBounds(bounds);

      // Add markers and handle marker click to show popover
      addSingleMarkers({
        locations,
        map,
        onMarkerClick: (loc) => setSelectedLocation(loc),
      });
    }
  }, [locations]);

  return (
    <div className="relative">
      <div ref={ref} className="w-full h-[300px] rounded-lg mt-5 mb-10" />

      {selectedLocation && (
        <div className="absolute top-2/5 right-1/2 rounded shadow">
          <Popover open={!!selectedLocation}>
            <PopoverTrigger className="bg-white w-full" asChild>
              <div
                className="opacity-0 cursor-pointer bg-white w-full"
                onClick={() => setSelectedLocation(null)}
              >
                Close
              </div>
            </PopoverTrigger>
            <PopoverContent className="bg-white w-auto space-y-3 border-0">
              <div
                className="cursor-pointer bg-white w-full self-end
"
                onClick={() => setSelectedLocation(null)}
              >
                <X className="ml-auto" />
              </div>
              <p className="font-medium">
                {acres} Acres {(guntas ?? 0 > 0) ? `${guntas} Guntas` : ""} - ₹{" "}
                {displayPrice}
                {unit}
              </p>
              <div className="text-end">
                <Button className="bg-amber-300 border-0 font-medium">
                  View Details
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};
