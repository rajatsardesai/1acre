import Maps from "@/components/maps/Maps";
import InfinitePosts from "@/components/posts/InfinitePosts";
import { GoogleMapsWrapper } from "@/components/maps/GoogleMapsWrapper";

const Page = () => {
  return (
    <div className="root-container">
      <GoogleMapsWrapper>
        <Maps />
      </GoogleMapsWrapper>
      <InfinitePosts />
    </div>
  );
};
export default Page;
