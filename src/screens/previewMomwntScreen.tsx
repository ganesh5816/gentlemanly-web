import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/20998315-1401-40a5-8484-58394ab58f15.mp4"; // your video file

const RomanticCafeUI = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        onLoadedMetadata={(e) => {
          e.currentTarget.currentTime = 1; // skip first 2 seconds
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Spacer to push button to bottom */}
        <div className="flex-1"></div>

        {/* Bottom Button */}
        <div className="px-6 pb-8">
          <button
            onClick={() => navigate("/waitlist")}
            className="w-full bg-white/90 font-montserrat backdrop-blur-sm text-gray-700 py-3 rounded-2xl font-medium text-lg shadow-lg border border-white/20 hover:bg-white/95 transition-all duration-200"
          >
            Join our waitlist{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RomanticCafeUI;
