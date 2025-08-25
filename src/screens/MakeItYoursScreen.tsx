/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

const OrderConfirmationScreen = () => {
  const [gifts, setGifts] = useState([]);

  // Create floating gift animations
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createGift = (id: any) => ({
      id,
      x: Math.random() * 300,
      y: Math.random() * 200,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
      animationDelay: Math.random() * 2,
      type: Math.random() > 0.5 ? "🎁" : "🎀",
    });

    // Create initial gifts
    const initialGifts = Array.from({ length: 6 }, (_, i) => createGift(i));
    setGifts(initialGifts as never);

    // Add new gifts periodically
    const interval = setInterval(() => {
      setGifts((prev) => {
        const newGifts = [...prev];
        // Remove old gifts and add new ones
        if (newGifts.length > 8) {
          newGifts.splice(0, 2);
        }
        return newGifts;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const GiftIcon = ({ gift, position }: any) => {
    return (
      <div
        className={`absolute text-4xl opacity-70 ${position}`}
        style={{
          left: `${gift.x}px`,
          top: `${gift.y}px`,
          transform: `rotate(${gift.rotation}deg) scale(${gift.scale})`,
          animation: `float 4s ease-in-out infinite ${gift.animationDelay}s, fadeInOut 6s ease-in-out infinite ${gift.animationDelay}s`,
        }}
      >
        {gift.type}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="relative max-w-sm mx-auto h-screen overflow-hidden">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 pt-3 pb-1"></div>

        {/* Floating Gifts - Top */}
        <div className="absolute top-16 left-0 right-0 h-32 pointer-events-none">
          {gifts.slice(0, 3).map((gift) => (
            <GiftIcon gift={gift} position="top-section" />
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center px-8 mt-32 mb-32">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-times font-normal text-black">
                Yay!
              </h1>
              <h2 className="text-2xl font-normal text-black leading-tight font-montserrat">
                Your Order is Placed
              </h2>
            </div>

            <p className="text-gray-600 text-base font-montserrat leading-relaxed max-w-xs mx-auto">
              Your special moment is on the way. Here's a sneak peek of the
              experience you'll share once the package arrives.
            </p>

            <div className="pt-6">
              <button className="w-full max-w-sm bg-transparent border border-gray-300 text-gray-700 py-4  rounded-lg font-medium text-base hover:bg-gray-100 transition-colors duration-200">
                Preview the Experience
              </button>
            </div>
          </div>
        </div>

        {/* Floating Gifts - Bottom */}
        <div className="absolute bottom-16 left-0 right-0 h-32 pointer-events-none">
          {gifts.slice(3, 6).map((gift) => (
            <GiftIcon gift={gift} position="bottom-section" />
          ))}
        </div>

        {/* CSS keyframes stay the same */}
      </div>
    </div>
  );
};

export default OrderConfirmationScreen;
