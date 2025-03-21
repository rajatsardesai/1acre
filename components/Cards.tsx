import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ActionIcons from "@/components/ActionIcons";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface Props {
  posts: Post[];
}

const Cards = ({ posts }: Props) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts?.map((post) => {
        const {
          id,
          land_media,
          total_price,
          land_size: {
            total_land_size_in_acres: { acres, cents },
          },
          price_per_acre,
          total_land_size,
          division_info,
        } = post;

        const displayPrice =
          acres !== null
            ? formatPrice(price_per_acre)
            : formatPrice(total_price);

        const unit =
          acres !== null
            ? "/acre"
            : cents !== null
              ? "/cents"
              : " for full property";

        return (
          <Card
            key={id}
            className="p-0 gap-0 border-0 shadow-lg group cursor-pointer"
          >
            <CardHeader className="p-0">
              <Carousel className="w-full max-w-full">
                <ActionIcons />

                <CarouselContent>
                  {land_media.map((media) => (
                    <CarouselItem key={media.id}>
                      <Image
                        src={media.image}
                        alt="land image"
                        width={372}
                        height={189}
                        className="rounded-t-lg object-cover w-full h-[189px]"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden group-hover:flex top-40 left-5 rounded-sm bg-white opacity-70 border-none cursor-pointer" />
                <CarouselNext className="hidden group-hover:flex top-40 right-5 rounded-sm bg-white opacity-70 border-none cursor-pointer" />
              </Carousel>
            </CardHeader>
            <CardContent className="p-3">
              <span className="font-semibold">
                Rs {displayPrice} {unit} .{" "}
                {Number((total_land_size ?? 0).toFixed(2))} Acres
              </span>
              <p className="text-sm mt-1">
                {division_info[2].name}, {division_info[1].name} (dt){" "}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
export default Cards;
