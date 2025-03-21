import { Heart, Share2 } from "lucide-react";

const ActionIcons = () => {
  const icons = [<Heart key="heart" />, <Share2 key="share" />];

  return (
    <div className="absolute top-5 right-5 flex items-center gap-3 z-10">
      {icons.map((Icon, index) => (
        <div
          key={index}
          className="bg-white rounded-full p-2 opacity-85 transition hover:scale-110"
        >
          {Icon}
        </div>
      ))}
    </div>
  );
};

export default ActionIcons;
