/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import backgroundVideo from "../assets/mold.mp4";
import backgroundVideo1 from "../assets/picnic.mp4";
import backgroundVideo6 from "../assets/550135dc-48ab-45c0-89d9-9137789cbb86.mp4";

const GiftMomentScreen = () => {
  const navigate = useNavigate();
  const [momentTitle, setMomentTitle] = useState("");

  useEffect(() => {
    // ONLY read the plain string - NO JSON parsing anywhere
    const storedMomentTitle = localStorage.getItem("currentMomentTitle");

    if (storedMomentTitle) {
      setMomentTitle(storedMomentTitle);
      console.log("Retrieved moment title:", storedMomentTitle);
    } else {
      setMomentTitle("Default Moment");
      console.log("No moment title found, using default");
    }

    // Clear any corrupted data that might be causing issues
    const corruptedData = localStorage.getItem("selectedMomentProducts");
    if (corruptedData && !corruptedData.startsWith("{")) {
      console.log("Found corrupted data, clearing it:", corruptedData);
      localStorage.removeItem("selectedMomentProducts");
    }
  }, []);

  console.log("Current moment title:", momentTitle);

  const selectedVideo = useMemo(() => {
    if (momentTitle === "Date Night with Concert") {
      return backgroundVideo6;
    } else if (momentTitle === "POETTRY DATE GIFT") {
      return backgroundVideo;
    } else {
      return backgroundVideo1;
    }
  }, [momentTitle]);

  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={selectedVideo}
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
