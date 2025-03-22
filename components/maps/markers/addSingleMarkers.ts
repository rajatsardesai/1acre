import { createMarkerIcon } from "@/lib/utils";

export const addSingleMarkers = async ({
  locations,
  map,
  onMarkerClick,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  map: google.maps.Map | null | undefined;
  onMarkerClick: (location: any) => void;
}) => {
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker",
  )) as google.maps.MarkerLibrary;

  locations.forEach((position, index) => {
    if (!map) return;

    // Create a new marker for each location
    const marker = new AdvancedMarkerElement({
      position,
      map,
      content: createMarkerIcon(index), // Determine the marker color based on the index
      gmpClickable: true,
    });

    // Add a click listener to trigger the onMarkerClick callback
    marker.addListener("gmp-click", () => {
      onMarkerClick(position);
    });
  });
};
