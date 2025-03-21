interface Post {
  id: number;
  land_media: { id: number; image: string }[];
  total_price?: number;
  price_per_acre?: number;
  total_land_size?: number;
  land_size: {
    total_land_size_in_acres: {
      acres: number | null;
      cents: number | null;
      guntas: number | null;
    };
  };
  division_info: {
    name: string;
  }[];
}
