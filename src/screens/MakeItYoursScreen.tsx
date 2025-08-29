import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";

const OrderConfirmationScreen = () => {
  return (
    <div className="relative min-h-screen w-full bg-gray-50 overflow-hidden">
      {/* Fullscreen Background Lottie Animation */}
      <div className="absolute  inset-0 z-0">
        <DotLottieReact
          src="/animation/my-animation.lottie"
          loop
          autoplay
          className="w-full h-full"
        />
      </div>

      {/* Centered Content (Foreground) */}
      <div className="relative z-10 max-w-sm mx-auto min-h-screen flex flex-col justify-center items-center px-8">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-times text-black">Congratulations!</h1>
            <h2 className="text-2xl font-normal text-black leading-tight font-montserrat">
              Your Order is Placed
            </h2>
          </div>

          <p className="text-gray-600 text-base font-montserrat leading-relaxed max-w-xs mx-auto">
            Your special moment is on the way. Here's a sneak peek of the
            experience you'll share once the package arrives.
          </p>

          <div className="pt-6">
            <Link to="/preview">
              <button className="w-full max-w-sm bg-transparent border font-montserrat border-gray-300 text-gray-700 py-3 rounded-lg font-medium text-base hover:bg-gray-100 transition-colors duration-200">
                Preview the Experience
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationScreen;
