import { useState } from "react";
import img from "../assets/welcome1.jpg";

export default function WaitlistSignup() {
  const [email, setEmail] = useState("");

  const benefits = [
    "1 Year of Free Premium Membership",
    "50% discount on first Moment Bundle Purchase",
    "50% discount on first Gift(s) purchase + Free GiftHer Signature Box upgrade",
  ];

  return (
    <div className="min-h-screen relative bg-white">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0">
        <img src={img} alt="Background" className="h-1/2 w-full object-cover" />
      </div>

      {/* Status Bar */}
      <div className="relative z-10 flex justify-between items-center px-6 py-3"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen pb-8">
        <div className="bg-white p-6 pt-8 pb-6 absolute bottom-8 right-3 left-3">
          {/* Heading */}
          <h1 className="text-2xl font-light text-gray-900 mb-6 font-times leading-tight">
            Turn Every Gift Into a<br />
            Moment She'll Never Forget
          </h1>

          {/* Description */}
          <p className="text-gray-700 mb-8 leading-relaxed font-montserrat">
            Join the exclusive GiftHer waitlist and as a founding member you'll
            receive:
          </p>

          {/* Benefits List */}
          <div className="space-y-4 mb-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center  rounded-lg p-4 bg-[#F7F7F7]"
              >
                <p className="text-yellow-600 font-bold font-times flex-1">
                  {benefit}
                </p>
                <div className="w-6 h-6 bg-[#E7BD79] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 border border-gray-200 rounded-lg mb-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E7BD79] focus:border-transparent"
          />

          {/* Join Button */}
          <button className="w-full bg-[#E7BD79] text-white hover:bg-yellow-500  font-montserrat font-medium py-3 px-6 rounded-lg transition-colors duration-200 mb-4">
            Join the Waitlist
          </button>

          {/* Limited Members Text */}
          <p className="text-center text-gray-700 text-sm mb-2 font-montserrat">
            Limited to the first 1,000 members
          </p>

          {/* Skip Link */}
          <button className="w-full text-gray-400 text-sm underline font-montserrat">
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
