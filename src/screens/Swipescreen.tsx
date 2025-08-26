/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { X, Check, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import shoes from "../assets/Frame283.png";
import whitedress from "../assets/dress.jpg";
import blackbag from "../assets/blackbag.jpg";

const ShoppingSwipeUI = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const constraintsRef = useRef(null);

  const products = [
    {
      id: 1,
      name: "Ankle-cuff heeled sandals",
      price: "$5,250.00",
      image: shoes,
      description:
        "Crafted from luxurious Taurillon leather, the Capucines MM blends timeless elegance with everyday versatility. Featuring the iconic LV initials, a structured silhouette, and a removable strap, it transitions effortlessly from day to night.",
    },
    {
      id: 2,
      name: "White A Line Dress",
      price: "$3,890.00",
      image: whitedress,
      description:
        "Crafted from luxurious Taurillon leather, the Capucines MM blends timeless elegance with everyday versatility. Featuring the iconic LV initials, a structured silhouette, and a removable strap, it transitions effortlessly from day to night.",
    },
    {
      id: 3,
      name: "Hermes Mini kelly",
      price: "$2,150.00",
      image: blackbag,
      description:
        "Crafted from luxurious Taurillon leather, the Capucines MM blends timeless elegance with everyday versatility. Featuring the iconic LV initials, a structured silhouette, and a removable strap, it transitions effortlessly from day to night.",
    },
  ];

  const handleImageClick = (product: any, e: any) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

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
  const swipePower = (offset: any, velocity: any) => {
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
    enter: (direction: any): any => {
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
    exit: (direction: any) => {
      return {
        zIndex: 0,
        x: direction < 0 ? -1000 : 1000,
        opacity: 0,
      };
    },
  };

  const getVisibleProducts = () => {
    return products.slice(currentIndex, currentIndex + 3);
  };

  return (
    <div
      className="min-h-screen w-full relative flex flex-col"
      ref={constraintsRef}
    >
      {/* Header */}
      <div className="flex absolute top-8 px-8 right-0 left-0 justify-between items-center gap-8 mt-6 z-10">
        <button className="w-10 h-10 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors">
          <ArrowLeft className="text-white" size={24} />
        </button>
        <button className="w-10 h-10 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors">
          <ShoppingBag className="text-white" size={24} />
        </button>
      </div>

      {/* Background */}
      <div className="flex-1 bg-black"></div>
      <div className="flex-1 bg-white"></div>

      {/* Product Cards */}
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="relative w-[402px] h-[420px]">
          {/* Background stacked cards */}
          {getVisibleProducts()
            .slice(1)
            .map((product, index) => (
              <motion.div
                key={`${product.id}-bg`}
                className="absolute w-full bg-white overflow-hidden text-center  shadow-lg"
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
                  className="w-full h-[320px] object-cover cursor-pointer"
                  onClick={(e) => handleImageClick(product, e)}
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{product.name}</h2>
                  <p className="text-[#3C5A72] font-medium">{product.price}</p>
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
              }}
            >
              <div
                className="w-full h-[320px] relative cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageClick(products[currentIndex], e);
                }}
              >
                <img
                  src={products[currentIndex].image}
                  alt={products[currentIndex].name}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold">
                  {products[currentIndex].name}
                </h2>
                <p className="text-[#3C5A72] font-medium">
                  {products[currentIndex].price}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex absolute bottom-8 right-0 left-0 justify-center gap-8 mt-6 z-10">
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

      {/* Full Screen Popup */}
      <AnimatePresence>
        {showPopup && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex flex-col"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b">
              <button
                onClick={closePopup}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-800" />
              </button>
              <h1 className="text-lg font-semibold text-center flex-1 mx-4 font-times">
                {selectedProduct.name}
              </h1>
              <div className="w-10 h-10"></div> {/* Spacer for centering */}
            </div>

            {/* Product Image */}
            <div className="flex-1 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full max-w-md"
              >
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-96 object-cover  shadow-md"
                />
              </motion.div>
            </div>

            {/* Product Details */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-t-3xl shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wide font-montserrat">
                  Price
                </span>
                <span className="text-md font-montserrat text-gray-900 ">
                  {selectedProduct.price}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed font-montserrat">
                  {selectedProduct.description}
                </p>
              </div>

              <button className="font-montserrat w-full bg-[#E7BD79] hover:bg-amber-500 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg">
                Order Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShoppingSwipeUI;
