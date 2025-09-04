import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const RomanticCafeUI = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [momentData, setMomentData] = useState<any>(null);

  useEffect(() => {
    // Get moment data from localStorage
    const selectedMomentData = localStorage.getItem("selectedMomentProducts");
    if (selectedMomentData) {
      try {
        const parsedData = JSON.parse(selectedMomentData);
        setMomentData(parsedData);
      } catch (error) {
        console.error("Error parsing moment data:", error);
      }
    }
  }, []);
  console.log(momentData);

  return (
    <div className="relative min-h-screen">
      {/* Background Video - Show moment video if available, otherwise default */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={momentData?.momentvideo}
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
            Join our waitlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default RomanticCafeUI;
