/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Gift interface
interface Gift {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
  category?: string;
}

const SwipeGiftsScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get event data passed from previous screen
  const { eventKey, eventName, gifts } = location.state || {};

  // Default gifts if none provided
  const giftsList: Gift[] = gifts || [];
  console.log(giftsList);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedGifts, setLikedGifts] = useState<Gift[]>([]);
  const [removedGifts, setRemovedGifts] = useState<Set<string>>(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [exitDirection, setExitDirection] = useState(0);

  // Load existing liked gifts from localStorage on component mount
  useEffect(() => {
    const storedMomentData = localStorage.getItem("selectedMomentProducts");
    if (storedMomentData) {
      try {
        const parsedData = JSON.parse(storedMomentData);
        const existingProducts = parsedData.products || [];

        // Convert existing products back to Gift format
        const existingGifts: Gift[] = existingProducts.map((product: any) => ({
          id: product.id.toString(),
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          category: product.category,
        }));

        setLikedGifts(existingGifts);
      } catch (error) {
        console.error("Error loading existing moment data:", error);
      }
    }
  }, []);

  // Save to localStorage whenever likedGifts changes
  useEffect(() => {
    if (likedGifts.length > 0) {
      const cartData = {
        products: likedGifts,
        momentTitle: eventName || "My Selected Items",
        timestamp: Date.now(),
      };
      localStorage.setItem("selectedMomentProducts", JSON.stringify(cartData));
    } else {
      // If no liked gifts, remove from localStorage
      localStorage.removeItem("selectedMomentProducts");
    }
  }, [likedGifts, eventName]);

  const filteredGifts = giftsList.filter((gift) => !removedGifts.has(gift.id));
  const isAtEnd = currentIndex >= filteredGifts.length;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const handleLikeGift = () => {
    if (currentIndex < filteredGifts.length) {
      const currentGift = filteredGifts[currentIndex];
      setLikedGifts((prev) => {
        // Check if gift is already liked to avoid duplicates
        if (!prev.find((g) => g.id === currentGift.id)) {
          return [...prev, currentGift];
        }
        return prev;
      });
      setExitDirection(-1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleDislikeGift = () => {
    if (currentIndex < filteredGifts.length) {
      const currentGift = filteredGifts[currentIndex];
      setRemovedGifts((prev) => new Set([...prev, currentGift.id]));
      setExitDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      handleLikeGift();
    } else if (info.offset.x < -threshold) {
      handleDislikeGift();
    }
  };

  const handleImageClick = (gift: Gift, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGift(gift);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedGift(null);
  };

  const addToLikedGifts = (gift: Gift) => {
    setLikedGifts((prev) => {
      if (!prev.find((g) => g.id === gift.id)) {
        return [...prev, gift];
      }
      return prev;
    });
  };

  const getVisibleGifts = () => {
    return filteredGifts.slice(currentIndex, currentIndex + 3);
  };

  const goBack = () => {
    navigate(-1); // Navigate back to previous screen
  };

  const goToCart = () => {
    // Navigate to cart/checkout screen with selected gifts
    navigate("/cart", {
      state: {
        selectedGifts: likedGifts,
        eventKey,
        eventName,
      },
    });
  };

  const handleCreateMoment = () => {
    navigate("/concert");
  };

  const handleContinueBrowsing = () => {
    setRemovedGifts(new Set());
    setCurrentIndex(0);
  };

  // Show message if no gifts provided
  if (!giftsList || giftsList.length === 0) {
    return (
      <div className="min-h-screen w-full relative flex flex-col">
        {/* Header */}
        <div className="flex absolute top-8 px-8 right-0 left-0 justify-between items-center gap-8 mt-6 z-10">
          <button
            onClick={goBack}
            className="w-10 h-10 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>

          <div className="relative">
            <button
              onClick={goToCart}
              className="w-10 h-10 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag className="text-white" size={24} />
            </button>
            {likedGifts.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {likedGifts.length}
              </div>
            )}
          </div>
        </div>

        {/* Background */}
        <div className="flex-1 bg-black"></div>
        <div className="flex-1 bg-white"></div>

        {/* No Gifts Message */}
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto px-8 text-center"
          >
            <div className="bg-gray-900 rounded-lg p-8 text-white">
              <h1 className="text-[22px] font-times font-semibold mb-4 leading-tight">
                No gifts available
              </h1>

              <p className="text-md font-montserrat mb-8 text-gray-300">
                Sorry, there are no gifts to display for{" "}
                {eventName || "this event"}.
              </p>

              <button
                onClick={goBack}
                className="w-full bg-gray-200 hover:bg-gray-300 text-[#79756C] font-[14px] py-3 px-4 rounded-lg text-sm transition-colors duration-200 font-montserrat"
              >
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // End screen when no more gifts
  if (filteredGifts.length === 0) {
    return (
      <div className="min-h-screen w-full relative flex flex-col">
        {/* Header */}
        <div className="flex absolute top-8 px-8 right-0 left-0 justify-between items-center gap-8 mt-6 z-10">
          <button
            onClick={goBack}
            className="w-10 h-10 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>

          <div className="relative">
            <button
              onClick={goToCart}
              className="w-10 h-10 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag className="text-white" size={24} />
            </button>
            {likedGifts.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {likedGifts.length}
              </div>
            )}
          </div>
        </div>

        {/* Background */}
        <div className="flex-1 bg-black"></div>
        <div className="flex-1 bg-white"></div>

        {/* End Screen */}
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto px-8 text-center"
          >
            <div className="bg-gray-900 rounded-lg p-8 text-white">
              <h1 className="text-[22px] font-times font-semibold mb-4 leading-tight">
                No more gifts to show!
              </h1>

              <p className="text-md font-montserrat mb-8 text-gray-300">
                You've gone through all the gifts for{" "}
                {eventName || "this event"}. Want to start over or create your
                moment?
              </p>

              <div>
                <button
                  onClick={handleContinueBrowsing}
                  className="w-full bg-gray-200 mb-4 hover:bg-gray-300 text-[#79756C] font-[14px] py-2 px-4 rounded-lg text-sm transition-colors duration-200 font-montserrat"
                >
                  Start Over
                </button>

                <button
                  onClick={handleCreateMoment}
                  className="w-full border-2 border-white hover:bg-white hover:text-gray-900 text-white font-[14px] py-2 px-4 rounded-lg text-sm transition-colors duration-200 font-montserrat"
                >
                  Create my moment
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      {/* Header */}
      <div className="flex absolute top-8 px-8 right-0 left-0 justify-between items-center gap-8 mt-6 z-10">
        <button
          onClick={goBack}
          className="w-10 h-10 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="text-white" size={24} />
        </button>

        <div className="relative">
          <button
            onClick={goToCart}
            className="w-10 h-10 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <ShoppingBag className="text-white" size={24} />
          </button>
          {likedGifts.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {likedGifts.length}
            </div>
          )}
        </div>
      </div>

      {/* Background */}
      <div className="flex-1 bg-black"></div>
      <div className="flex-1 bg-white"></div>

      {/* Gift Cards */}
      <div className="absolute inset-0 flex items-center justify-center p-3">
        {!isAtEnd ? (
          <div className="relative w-[402px] h-[420px]">
            {/* Background stacked cards */}
            {getVisibleGifts()
              .slice(1)
              .map((gift, index) => (
                <motion.div
                  key={`${gift.id}-bg`}
                  className="absolute w-full bg-white overflow-hidden text-center"
                  style={{
                    zIndex: -index - 1,
                    transform: `scale(${0.95 - index * 0.05}) translateY(${
                      (index + 1) * 8
                    }px)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 - index * 0.2 }}
                >
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-[320px] object-cover cursor-pointer"
                    onClick={(e) => handleImageClick(gift, e)}
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold font-times">
                      {gift.name}
                    </h2>
                    <p className="text-[#3C5A72] font-medium font-montserrat">
                      {gift.price}
                    </p>
                  </div>
                </motion.div>
              ))}

            {/* Main interactive card */}
            <AnimatePresence initial={false} custom={exitDirection}>
              {filteredGifts[currentIndex] && (
                <motion.div
                  key={filteredGifts[currentIndex].id}
                  custom={exitDirection}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={handleDragEnd}
                  className="absolute w-full bg-white overflow-hidden text-center shadow-lg cursor-grab active:cursor-grabbing"
                  whileTap={{ cursor: "grabbing" }}
                  whileDrag={{
                    rotate: 10,
                    scale: 1.05,
                  }}
                >
                  <div
                    className="w-full h-[320px] relative cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageClick(filteredGifts[currentIndex], e);
                    }}
                  >
                    <img
                      src={filteredGifts[currentIndex].image}
                      alt={filteredGifts[currentIndex].name}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold font-times">
                      {filteredGifts[currentIndex].name}
                    </h2>
                    <p className="text-[#3C5A72] font-medium font-montserrat">
                      {filteredGifts[currentIndex].price}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Gift Selection End Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto px-8 text-center"
          >
            <div className="bg-gray-900 rounded-lg p-8 text-white">
              <h1 className="text-[22px] font-times font-semibold mb-4 leading-tight">
                All done selecting gifts, or still searching for the perfect
                one?
              </h1>

              <p className="text-md font-montserrat mb-8 text-gray-300">
                Keep browsing or craft your perfect moment using the buttons
                below.
              </p>

              <div>
                <button
                  onClick={handleContinueBrowsing}
                  className="w-full bg-gray-200 mb-4 hover:bg-gray-300 text-[#79756C] font-[14px] py-3 px-4 rounded-lg text-sm transition-colors duration-200 font-montserrat"
                >
                  Continue Browsing
                </button>

                <button
                  onClick={handleCreateMoment}
                  className="w-full border-2 border-white hover:bg-white hover:text-gray-900 text-white font-[14px] py-2 px-4 rounded-lg text-sm transition-colors duration-200 font-montserrat"
                >
                  Create my moment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      {!isAtEnd && (
        <div className="flex absolute bottom-8 right-0 left-0 justify-center gap-8 mt-6 z-10">
          <button
            onClick={handleDislikeGift}
            disabled={currentIndex >= filteredGifts.length}
            className={`p-4 rounded-full bg-white mr-20 transition-opacity ${
              currentIndex >= filteredGifts.length
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg"
            }`}
          >
            <X strokeWidth={3} className="text-red-500" size={28} />
          </button>
          <button
            onClick={handleLikeGift}
            disabled={currentIndex >= filteredGifts.length}
            className={`p-4 rounded-full bg-white transition-opacity ${
              currentIndex >= filteredGifts.length
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg"
            }`}
          >
            <Check strokeWidth={3} className="text-green-500" size={28} />
          </button>
        </div>
      )}

      {/* Progress indicator */}
      {!isAtEnd && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {filteredGifts.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}

      {/* Gift Detail Popup */}
      <AnimatePresence>
        {showPopup && selectedGift && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={closePopup}
            />

            {/* Popup Container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{
                y: 0,
                transition: {
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  mass: 0.8,
                },
              }}
              exit={{
                y: "100%",
                transition: {
                  type: "spring",
                  damping: 30,
                  stiffness: 400,
                  mass: 0.8,
                },
              }}
              className="absolute inset-0 flex flex-col bg-white  overflow-hidden"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.1, duration: 0.4 },
                }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-between p-4 bg-white border-b flex-shrink-0"
              >
                <button
                  onClick={closePopup}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-800" />
                </button>
                <h1 className="text-lg font-semibold text-center flex-1 mx-4 font-times">
                  {selectedGift.name}
                </h1>
                <div className="w-10 h-10"></div>
              </motion.div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Gift Image */}
                <div className="flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { delay: 0.2, duration: 0.4 },
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-md"
                  >
                    <img
                      src={selectedGift.image}
                      alt={selectedGift.name}
                      className="w-full h-96 object-cover"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.3, duration: 0.4 },
                  }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-6 rounded-t-3xl mx-4 mb-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Price
                    </span>
                    <span className="text-sm text-gray-900 font-montserrat">
                      {selectedGift.price}
                    </span>
                  </div>

                  {selectedGift.category && (
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Category
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {selectedGift.category}
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed font-montserrat text-base">
                      {selectedGift.description}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Fixed Bottom Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.4, duration: 0.4 },
                }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white border-t p-4 flex-shrink-0"
              >
                <button
                  onClick={() => {
                    addToLikedGifts(selectedGift);
                    closePopup();
                  }}
                  className="w-full bg-[#E7BD79] font-montserrat text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg transform hover:scale-105 active:scale-95"
                >
                  Add to Selection
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SwipeGiftsScreen;
