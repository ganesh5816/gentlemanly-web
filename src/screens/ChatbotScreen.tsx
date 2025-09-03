import React from "react";
import { ArrowLeft, Plus, Mic } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MobileChatInterface: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-screen flex flex-col bg-white" // full width now
    >
      {/* Header */}
      <div className="relative flex items-center justify-center bg-[#fff] px-4 py-3 shadow-sm border- border-[#E7E7E7]">
        <ArrowLeft
          onClick={() => navigate("/home")}
          className="absolute left-4 w-6 h-6 text-gray-600"
        />
        <h1 className="text-lg font-semibold text-black font-times">
          ChatBot Name Here
        </h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4">
        {/* Bot Message 1 */}
        <div className="flex justify-start">
          <div className="bg-[#A0C2CD33] text-white rounded-tr-md rounded-tl-md rounded-br-md px-4 py-3 max-w-xs">
            <p className="text-sm text-[#5E8C9B]">
              Hey! 👋 You've got a gift idea? That's exciting!
            </p>
          </div>
        </div>

        {/* Bot Message 2 */}
        <div className="flex justify-start">
          <div className=" text-white rounded-tr-md rounded-tl-md rounded-br-md px-4 py-3 max-w-xs">
            <p className="text-sm text-[#5E8C9B]">
              What kind of gift are you thinking of?
            </p>
          </div>
        </div>

        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-[#E7BD794D] rounded-tr-md rounded-tl-md rounded-bl-md px-4 py-3 max-w-xs shadow-sm">
            <p className="text-sm text-[#C99D55]">
              Elegant dress, luxury brand shoes and a high end bag.
            </p>
          </div>
        </div>

        {/* Bot Message 3 */}
        <div className="flex justify-start">
          <div className="bg-[#A0C2CD33] text-white rounded-tr-md rounded-tl-md rounded-br-md px-4 py-3 max-w-xs">
            <p className="text-sm text-[#5E8C9B]">
              Great choice! 👠 We have some stunning picks just for her. Click
              below to explore.
            </p>
          </div>
        </div>

        {/* Button */}
        <button className="w-full bg-[#E7BD79]  rounded-lg py-3 shadow-sm hover:bg-gray-50 transition-colors">
          <Link to="/defaultgifts" className="block w-full text-center">
            <span className="text-white font-montserrat text-base">
              Show Me Gifts
            </span>
          </Link>
        </button>
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 flex items-center space-x-3 border-t border-gray-200">
        <button className="bg-gray-800 rounded-full p-3 hover:bg-gray-700 transition-colors">
          <Plus className="w-5 h-5 text-white" />
        </button>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full bg-gray-100 rounded-full px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <button className="bg-gray-800 rounded-full p-3 hover:bg-gray-700 transition-colors">
          <Mic className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default MobileChatInterface;
