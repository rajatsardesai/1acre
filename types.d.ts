interface Post {
  id: number;
  land_media: { id: number; image: string }[];
  total_price: number;
  total_land_size: number;
  land_size: {
    total_land_size_in_acres: {
      acres: number | null;
      cents: number | null;
      guntas: number | null;
    };
  };
  land_price: {
    price_per_acre_crore: {
      lakh: number | null;
      crore: number | null;
    };
  };
  division_info: {
    name: string;
  }[];
}

interface LandMap extends Post {
  lat: number;
  long: number;
}
