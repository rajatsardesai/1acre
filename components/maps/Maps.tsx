import { GoogleMapsWrapper } from "@/components/maps/GoogleMapsWrapper";
import { GoogleMaps } from "@/components/maps/GoogleMaps";
import { fetchLandMaps } from "@/lib/apis";

const Maps = async () => {
  const res = await fetchLandMaps();

  const locations = res?.map((land) => ({
    id: land.id,
    lat: Number(land.lat),
    lng: Number(land.long),
    total_price: land.total_price,
    land_size: land.land_size,
    land_price: land.land_price,
  }));

  return (
    <GoogleMapsWrapper>
      <GoogleMaps locations={locations} />
    </GoogleMapsWrapper>
  );
};

export default Maps;
