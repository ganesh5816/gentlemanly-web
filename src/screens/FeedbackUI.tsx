import { useNavigate } from "react-router-dom";

export default function FeedbackUI() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-3 bg-white"></div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 pb-20">
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-times font-light text-gray-900 mb-6 leading-tight">
            We'd Love Your Feedback
          </h1>

          <p className="text-gray-600 text-base leading-relaxed mb-12 font-montserrat">
            It only takes a minute, and your feedback ensures GiftHer keeps
            delivering the perfect gifts and moments.
          </p>

          <button
            onClick={() => navigate("/form")}
            className="w-full bg-[#E7BD79]  text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 font-montserrat"
          >
            Review the Experience
          </button>
        </div>
      </div>
    </div>
  );
}
