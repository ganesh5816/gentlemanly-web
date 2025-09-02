import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import backgroundVideo from "../assets/mold.mp4";
import backgroundVideo1 from "../assets/picnic.mp4";
import backgroundVideo2 from "../assets/moment3.mp4";

const GiftMomentScreen = () => {
  const navigate = useNavigate();

  // Store videos in an array
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const videos = [backgroundVideo, backgroundVideo1, backgroundVideo2];

  // Pick a random video only once per mount
  const randomVideo = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  }, [videos]);

  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={randomVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Bottom Button */}
        <div className="px-6 pb-8">
          <button
            onClick={() => navigate("/home")}
            className="w-full bg-white/90 font-montserrat backdrop-blur-sm text-gray-700 py-3 rounded-2xl font-medium text-lg shadow-lg border border-white/20 hover:bg-white/95 transition-all duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftMomentScreen;
