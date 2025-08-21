import React from "react";
import { ArrowLeft, Plus, Mic } from "lucide-react";
import { motion } from "framer-motion";

const MobileChatInterface: React.FC = () => {
  return (
    <motion.div
      className="max-w-sm mx-auto bg-gray-100 h-screen flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center shadow-sm">
        <ArrowLeft className="w-6 h-6 text-gray-600 mr-4" />
        <h1 className="text-lg font-semibold text-black">ChatBot Name Here</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4">
        {/* Bot Message 1 */}
        <div className="flex justify-start">
          <div className="bg-gray-800 text-white rounded-2xl px-4 py-3 max-w-xs">
            <p className="text-sm">
              Hey! 👋 You've got a gift idea? That's exciting!
            </p>
          </div>
        </div>

        {/* Bot Message 2 */}
        <div className="flex justify-start">
          <div className="bg-gray-800 text-white rounded-2xl px-4 py-3 max-w-xs">
            <p className="text-sm">What kind of gift are you thinking of?</p>
          </div>
        </div>

        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-white rounded-2xl px-4 py-3 max-w-xs shadow-sm">
            <p className="text-sm text-gray-800">Shoes</p>
          </div>
        </div>

        {/* Bot Message 3 */}
        <div className="flex justify-start">
          <div className="bg-gray-800 text-white rounded-2xl px-4 py-3 max-w-xs">
            <p className="text-sm">
              Great choice! 👠 We have some stunning picks just for her. Click
              below to explore.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-4">
          <button className="bg-white border border-gray-400 rounded-lg px-6 py-4 shadow-sm hover:bg-gray-50 transition-colors w-80">
            <span className="text-gray-800 font-normal text-base">
              Show Me Shoes
            </span>
          </button>
        </div>
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
    </motion.div>
  );
};

export default MobileChatInterface;
