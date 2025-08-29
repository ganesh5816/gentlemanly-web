import { useNavigate } from "react-router-dom";
import backgroundimg from "../assets/welcome1.jpg";

const RomanticCafeUI = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundimg})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Spacer to push button to bottom */}
        <div className="flex-1"></div>

        {/* Bottom Button */}
        <div className="px-6 pb-8">
          <button
            onClick={() => navigate("/home")}
            className="w-full bg-white/90 font-montserrat backdrop-blur-sm text-gray-700 py-4 rounded-2xl font-medium text-lg shadow-lg border border-white/20 hover:bg-white/95 transition-all duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default RomanticCafeUI;
