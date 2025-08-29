/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { X, Check, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ShoppingSwipeUI = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [likedProducts, setLikedProducts] = useState<any[]>([]);
  const [removedProducts, setRemovedProducts] = useState<Set<string>>(
    new Set()
  ); // Track removed products
  const constraintsRef = useRef(null);

  // Load moment-specific products on component mount
  useEffect(() => {
    const storedMomentData = localStorage.getItem("selectedMomentProducts");
    if (storedMomentData) {
      try {
        const parsedData = JSON.parse(storedMomentData);
        setProducts(parsedData.products || []);
      } catch (error) {
        console.error("Error parsing stored moment data:", error);
        // Fallback to default products if there's an error
      }
    } else {
      // Fallback to default products if no stored data
    }
  }, []);

  // Update localStorage whenever likedProducts changes
  useEffect(() => {
    if (likedProducts.length > 0) {
      const cartData = {
        products: likedProducts,
        momentTitle: "My Selected Items",
        timestamp: Date.now(),
      };
      localStorage.setItem("selectedMomentProducts", JSON.stringify(cartData));
    } else {
      localStorage.removeItem("selectedMomentProducts");
    }
  }, [likedProducts]);

  const handleImageClick = (product: any, e: any) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  const addToLikedProducts = (product: any) => {
    const isAlreadyLiked = likedProducts.some(
      (likedProduct) => likedProduct.id === product.id
    );
    if (!isAlreadyLiked) {
      setLikedProducts((prev) => [...prev, product]);
    }
  };

  // Get filtered products (excluding removed ones)
  const getFilteredProducts = () => {
    return products.filter((product) => !removedProducts.has(product.id));
  };

  // Function for liking a product (right swipe/check button)
  const handleLikeProduct = () => {
    const filteredProducts = getFilteredProducts();
    if (filteredProducts[currentIndex]) {
      addToLikedProducts(filteredProducts[currentIndex]);
    }
    moveToNextProduct(1);
  };

  // Function for disliking a product (left swipe/X button)
  const handleDislikeProduct = () => {
    const filteredProducts = getFilteredProducts();
    if (filteredProducts[currentIndex]) {
      // Add product to removed set
      setRemovedProducts(
        (prev) => new Set([...prev, filteredProducts[currentIndex].id])
      );
    }
    moveToNextProduct(-1);
  };

  // Helper function to move to next available product
  const moveToNextProduct = (direction: number) => {
    setExitDirection(direction);
    const filteredProducts = getFilteredProducts();

    // If we're at the last product, stay at the end
    if (currentIndex >= filteredProducts.length - 1) {
      setCurrentIndex(filteredProducts.length);
    } else {
      // Check if the next product exists after filtering
      const nextIndex = currentIndex + 1;
      const nextFilteredProducts = products.filter(
        (product) => !removedProducts.has(product.id)
      );

      if (nextIndex < nextFilteredProducts.length) {
        setCurrentIndex(nextIndex);
      } else {
        // If no more products after filtering, go to end
        setCurrentIndex(nextFilteredProducts.length);
      }
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: any, velocity: any) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (_event: any, { offset, velocity }: any) => {
    const swipe = swipePower(offset.x, velocity.x);
    const filteredProducts = getFilteredProducts();

    if (
      swipe > swipeConfidenceThreshold &&
      currentIndex < filteredProducts.length
    ) {
      // Right swipe (like) - add to liked products
      if (filteredProducts[currentIndex]) {
        addToLikedProducts(filteredProducts[currentIndex]);
      }
      moveToNextProduct(1);
    } else if (swipe < -swipeConfidenceThreshold) {
      // Left swipe (dislike) - remove from UI
      if (filteredProducts[currentIndex]) {
        setRemovedProducts(
          (prev) => new Set([...prev, filteredProducts[currentIndex].id])
        );
      }
      moveToNextProduct(-1);
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
    const filteredProducts = getFilteredProducts();
    return filteredProducts.slice(currentIndex, currentIndex + 3);
  };

  // Check if we're at the end (showing the gift selection screen)
  const filteredProducts = getFilteredProducts();
  const isAtEnd = currentIndex >= filteredProducts.length;

  // Don't render anything if products haven't loaded yet
  if (products.length === 0) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black">
        <div className="text-white text-lg">Loading products...</div>
      </div>
    );
  }

  // If all products are removed, show end screen
  if (filteredProducts.length === 0) {
    return (
      <div className="min-h-screen w-full relative flex flex-col">
        {/* Header */}
        <div className="flex absolute top-8 px-8 right-0 left-0 justify-between items-center gap-8 mt-6 z-10">
          <Link
            to="/momentDetails"
            className="w-10 h-10 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="text-white" size={24} />
          </Link>

          <div className="relative">
            <button className="w-10 h-10 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors">
              <Link to="/cart">
                <ShoppingBag className="text-white" size={24} />
              </Link>
            </button>
            {likedProducts.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {likedProducts.length}
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
                No more products to show!
              </h1>

              <p className="text-md font-montserrat mb-8 text-gray-300">
                You've gone through all the products. Want to start over or
                create your moment?
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setRemovedProducts(new Set());
                    setCurrentIndex(0);
                  }}
                  className="w-full bg-gray-200 mb-4 hover:bg-gray-300 text-[#79756C] font-[14px] py-3 px-4 rounded-lg text-sm transition-colors duration-200 font-montserrat"
                >
                  Start Over
                </button>

                <Link to="/makeitYours">
                  <button className="w-full border-2 border-white hover:bg-white hover:text-gray-900 text-white font-[14px] py-2 px-4 rounded-lg text-sm transition-colors duration-200 font-montserrat">
                    Create my Moment
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full relative flex flex-col"
      ref={constraintsRef}
    >
      {/* Header */}
      <div className="flex absolute top-8 px-8 right-0 left-0 justify-between items-center gap-8 mt-6 z-10">
        <Link
          to="/stories"
          className="w-10 h-10 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="text-white" size={24} />
        </Link>

        <div className="relative">
          <button className="w-10 h-10 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-800 transition-colors">
            <Link to="/cart">
              <ShoppingBag className="text-white" size={24} />
            </Link>
          </button>
          {likedProducts.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {likedProducts.length}
            </div>
          )}
        </div>
      </div>

      {/* Background */}
      <div className="flex-1 bg-black"></div>
      <div className="flex-1 bg-white"></div>

      {/* Product Cards or End Screen */}
      <div className="absolute inset-0 flex items-center justify-center p-3">
        {!isAtEnd ? (
          <div className="relative w-[402px] h-[420px]">
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
                    className="w-full h-[320px] object-fill cursor-pointer"
                    onClick={(e) => handleImageClick(product, e)}
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p className="text-[#3C5A72] font-medium">
                      {product.price}
                    </p>
                  </div>
                </motion.div>
              ))}

            {/* Main interactive card */}
            <AnimatePresence initial={false} custom={exitDirection}>
              {filteredProducts[currentIndex] && (
                <motion.div
                  key={filteredProducts[currentIndex].id}
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
                      handleImageClick(filteredProducts[currentIndex], e);
                    }}
                  >
                    <img
                      src={filteredProducts[currentIndex].image}
                      alt={filteredProducts[currentIndex].name}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold">
                      {filteredProducts[currentIndex].name}
                    </h2>
                    <p className="text-[#3C5A72] font-medium">
                      {filteredProducts[currentIndex].price}
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
                All done shopping, or still searching for the perfect gift?
              </h1>

              <p className="text-md font-montserrat mb-8 text-gray-300">
                Keep browsing or craft your perfect moment using the buttons
                below.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setRemovedProducts(new Set());
                    setCurrentIndex(0);
                  }}
                  className="w-full bg-gray-200 mb-4 hover:bg-gray-300 text-[#79756C] font-[14px] py-3 px-4 rounded-md text-sm transition-colors duration-200 font-montserrat"
                >
                  Continue Shopping
                </button>

                <Link to="/makeitYours">
                  <button className="w-full border-2 border-white hover:bg-white hover:text-gray-900 text-white font-[14px] py-2 px-4 rounded-md text-sm transition-colors duration-200 font-montserrat">
                    Create my Moment
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      {!isAtEnd && (
        <div className="flex absolute bottom-8 right-0 left-0 justify-center gap-8 mt-6 z-10">
          <button
            onClick={handleDislikeProduct}
            disabled={currentIndex >= filteredProducts.length}
            className={`p-4 rounded-full bg-white shadow-[0px_0px_12px_0px_#0000000F] mr-20 transition-opacity ${
              currentIndex >= filteredProducts.length
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg"
            }`}
          >
            <X strokeWidth={4} className="text-red-500" size={28} />
          </button>

          <button
            onClick={handleLikeProduct}
            disabled={currentIndex >= filteredProducts.length}
            className={`p-4 rounded-full bg-white shadow-[0px_0px_12px_0px_#0000000F] transition-opacity ${
              currentIndex >= filteredProducts.length
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg"
            }`}
          >
            <Check strokeWidth={4} className="text-green-500" size={28} />
          </button>
        </div>
      )}

      {/* Progress indicator */}
      {!isAtEnd && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {filteredProducts.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {showPopup && selectedProduct && (
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

            {/* Popup Container - Full Screen */}
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
              className="absolute inset-0 flex flex-col bg-white shadow-2xl overflow-hidden"
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
                  {selectedProduct.name}
                </h1>
                <div className="w-10 h-10"></div> {/* Spacer for centering */}
              </motion.div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Product Image */}
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
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
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
                    <span className="text-sm text-gray-900">
                      {selectedProduct.price}
                    </span>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed font-montserrat text-base">
                      {selectedProduct.description}
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
                    addToLikedProducts(selectedProduct);
                    closePopup();
                  }}
                  className="w-full bg-[#E7BD79] font-montserrat text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg transform hover:scale-105 active:scale-95"
                >
                  Add to Cart
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShoppingSwipeUI;
