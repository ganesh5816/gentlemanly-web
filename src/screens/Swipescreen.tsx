import { useState } from "react";
import { X, Check, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ShoppingSwipeUI = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      <div className="flex absolute top-4 px-8  right-0 left-0 justify-between items-center gap-8 mt-6">
        <button className="w-12 h-12 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors">
          <ArrowLeft className="text-white" size={24} />
        </button>
        {/* Shopping Bag Button */}
        <button className="w-12 h-12 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors">
          <ShoppingBag className="text-white" size={24} />
        </button>
      </div>
      {/* Top Half Black */}
      <div className="flex-1 bg-black"></div>

      {/* Bottom Half White */}
      <div className="flex-1 bg-white"></div>

      {/* Centered Product Card (overlaps black + white halves) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-[402px] bg-white overflow-hidden text-center"
          >
            {/* Image */}
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-[420px] object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-bold">{currentProduct.name}</h2>
              <p className="text-blue-600 font-medium">
                {currentProduct.price}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Action Buttons */}
      <div className="flex absolute bottom-10 right-0 left-0 justify-center gap-8 mt-6">
        <button
          onClick={handlePrev}
          className="p-4 rounded-full bg-white shadow-md mr-20"
        >
          <X className="text-red-500" size={28} />
        </button>
        <button
          onClick={handleNext}
          className="p-4 rounded-full bg-white shadow-md"
        >
          <Check className="text-green-500" size={28} />
        </button>
      </div>
    </div>
  );
};

export default ShoppingSwipeUI;
