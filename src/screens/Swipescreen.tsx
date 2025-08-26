/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { X, Check, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ShoppingSwipeUI = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState(0);
  const constraintsRef = useRef(null);

  const products = [
    {
      id: 1,
      name: "Ankle-cuff heeled sandals",
      price: "$5,250.00",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Classic leather boots",
      price: "$3,890.00",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 3,
      name: "Designer sneakers",
      price: "$2,150.00",
      image:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 4,
      name: "Elegant pumps",
      price: "$4,200.00",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop&crop=center",
    },
  ];

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      setExitDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setExitDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (_event: any, { offset, velocity }: any) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (
      swipe > swipeConfidenceThreshold &&
      currentIndex < products.length - 1
    ) {
      setExitDirection(-1);
      setCurrentIndex(currentIndex + 1);
    } else if (swipe < -swipeConfidenceThreshold && currentIndex > 0) {
      setExitDirection(1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? -1000 : 1000,
        opacity: 0,
      };
    },
  };

  // Get visible products (current + next 2 for stacking effect)
  const getVisibleProducts = () => {
    return products.slice(currentIndex, currentIndex + 3);
  };

  return (
    <div
      className="min-h-screen w-full relative flex flex-col"
      ref={constraintsRef}
    >
      <div className="flex absolute top-2 px-8 right-0 left-0 justify-between items-center gap-8 mt-6 z-10">
        <button className="w-12 h-12 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors">
          <ArrowLeft className="text-white" size={24} />
        </button>
        <button className="w-12 h-12 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors">
          <ShoppingBag className="text-white" size={24} />
        </button>
      </div>

      {/* Top Half Black */}
      <div className="flex-1 bg-black"></div>

      {/* Bottom Half White */}
      <div className="flex-1 bg-white"></div>

      {/* Stacked Product Cards */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[402px] h-[500px]">
          {/* Background stacked cards */}
          {getVisibleProducts()
            .slice(1)
            .map((product, index) => (
              <motion.div
                key={`${product.id}-bg`}
                className="absolute w-full bg-white overflow-hidden text-center shadow-lg"
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
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[420px] object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{product.name}</h2>
                  <p className="text-blue-600 font-medium">{product.price}</p>
                </div>
              </motion.div>
            ))}

          {/* Main interactive card */}
          <AnimatePresence initial={false} custom={exitDirection}>
            <motion.div
              key={products[currentIndex].id}
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
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <img
                src={products[currentIndex].image}
                alt={products[currentIndex].name}
                className="w-full h-[420px] object-cover pointer-events-none"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">
                  {products[currentIndex].name}
                </h2>
                <p className="text-blue-600 font-medium">
                  {products[currentIndex].price}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex absolute bottom-10 right-0 left-0 justify-center gap-8 mt-6 z-10">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`p-4 rounded-full bg-white shadow-md mr-20 transition-opacity ${
            currentIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-lg"
          }`}
        >
          <X className="text-red-500" size={28} />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === products.length - 1}
          className={`p-4 rounded-full bg-white shadow-md transition-opacity ${
            currentIndex === products.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-lg"
          }`}
        >
          <Check className="text-green-500" size={28} />
        </button>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {products.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ShoppingSwipeUI;
