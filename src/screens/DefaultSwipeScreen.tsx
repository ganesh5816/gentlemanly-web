/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

// Initial state with gift data
const initialState = {
  eventGifts: {
    birthday: [
      {
        id: "1",
        name: "Louis Vuitton: Capucines MM",
        price: "$5,250.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/blackbag.jpg",
        description:
          "A timeless Louis Vuitton handbag, crafted from premium leather. The perfect luxury statement piece for her birthday.",
        category: "Birthday",
      },
      {
        id: "2",
        name: "Chanel Black Heels",
        price: "$3,850.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/f98abc388d6c2ba1b82b3cfbc3515a28.jpg",
        description:
          "Elegant Chanel black heels designed for sophistication and style—ideal for making her birthday celebration glamorous.",
        category: "Birthday",
      },
      {
        id: "3",
        name: "Tulip Bouquet",
        price: "$2,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/3522bd8b89cae736baefe8d6ba7ad121.jpg",
        description:
          "A fresh bouquet of tulips symbolizing love, joy, and new beginnings—an unforgettable birthday surprise.",
        category: "Birthday",
      },
      {
        id: "47",
        name: "Diamond Baguette Necklace",
        price: "$2,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/f7ed98f4aeec55b1c5d78ebaee58ae55.jpg",
        description:
          "An exquisite diamond baguette necklace that sparkles with elegance—perfect for a birthday gift she'll treasure forever.",
        category: "Birthday",
      },
      {
        id: "14",
        name: "Pink Dress",
        price: "$2,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/pinkdress.jpg",
        description:
          "A chic and elegant pink dress, crafted to make her feel radiant and special on her birthday.",
        category: "Birthday",
      },
    ],
    anniversary: [
      {
        id: "4",
        name: "White Roses",
        price: "$8,500.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/roses.jpg",
        description:
          "A luxurious arrangement of white roses symbolizing pure love—an anniversary gift that speaks from the heart.",
        category: "Anniversary",
      },
      {
        id: "5",
        name: "Diamond Set",
        price: "$450.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/ee20f951c9f8c884e1ecb047970c2749.jpg",
        description:
          "A sparkling diamond jewelry set that represents eternal love—an anniversary gift to cherish forever.",
        category: "Anniversary",
      },
      {
        id: "6",
        name: "Strathberry Bag",
        price: "$1,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/b9e087b293155a73fe0dd2e35e0917c7.jpg",
        description:
          "A modern yet timeless Strathberry handbag, handcrafted to perfection—an elegant anniversary surprise.",
        category: "Anniversary",
      },
      {
        id: "70",
        name: "Pearl & Bow Heels",
        price: "$1,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/ca7c4a0a1a6049d66a27a3af7abe0d10.jpg",
        description:
          "Chic pearl-embellished heels with a delicate bow—graceful and romantic, perfect for an anniversary night out.",
        category: "Anniversary",
      },
    ],
    mothersday: [
      {
        id: "7",
        name: "Rhode Skincare Kit",
        price: "$320.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/3ef124f6b3cf71f8488b4968c306e580.jpg",
        description:
          "A complete Rhode skincare kit for glowing, healthy skin—because mom deserves pampering every day.",
        category: "Mother's Day",
      },
      {
        id: "8",
        name: "Daniel Wellington Watch",
        price: "$680.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/beb342a2cce2901895c98b70f297956b.jpg",
        description:
          "A sleek and timeless Daniel Wellington watch—an elegant accessory that shows your appreciation on Mother's Day.",
        category: "Mother's Day",
      },
      {
        id: "83",
        name: "VS Pajama Set",
        price: "$680.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/2817c3170be4a8f30a066c250b5b8fe2.jpg",
        description:
          "A soft and stylish Victoria's Secret pajama set—perfect for mom to relax in comfort and style.",
        category: "Mother's Day",
      },
      {
        id: "28",
        name: "Mini Flower Basket",
        price: "$680.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/f851e9acdcc005350360fe728690f485.jpg",
        description:
          "A charming basket of fresh flowers—a sweet and thoughtful way to brighten mom's Mother's Day.",
        category: "Mother's Day",
      },
      {
        id: "228",
        name: "Chance Chanel Perfume",
        price: "$680.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/2692d472227a48127205354de013ff62.jpg",
        description:
          "The iconic Chance by Chanel fragrance—an unforgettable scent that's as elegant and timeless as mom herself.",
        category: "Mother's Day",
      },
    ],
    // apology: [
    //   {
    //     id: "9",
    //     name: "Pearl Set",
    //     price: "$150.00",
    //     image:
    //       "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/pearlset.jpg",
    //     description:
    //       "A classic pearl jewelry set symbolizing sincerity and elegance—perfect for a heartfelt apology.",
    //     category: "Apology",
    //   },
    //   {
    //     id: "10",
    //     name: "Black Chanel Bag",
    //     price: "$85.00",
    //     image:
    //       "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/91043a2d6f77b0f18a9b23c54257558a.jpg",
    //     description:
    //       "A chic Chanel-inspired black handbag—an elegant peace offering to show you truly care.",
    //     category: "Apology",
    //   },
    //   {
    //     id: "102",
    //     name: "White Coat",
    //     price: "$85.00",
    //     image:
    //       "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/88a6c4cc5e01d7d520d926c780692a2e.jpg",
    //     description:
    //       "A stylish white coat that blends elegance with comfort—a thoughtful gift to mend hearts.",
    //     category: "Apology",
    //   },
    //   {
    //     id: "103",
    //     name: "LV Black Heels",
    //     price: "$85.00",
    //     image:
    //       "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/dcf95caed2209c87620cfb348e2e0f5e.jpg",
    //     description:
    //       "Elegant Louis Vuitton-inspired black heels—an unforgettable way to step back into her good graces.",
    //     category: "Apology",
    //   },
    //   {
    //     id: "104",
    //     name: "Pink Flowers",
    //     price: "$85.00",
    //     image:
    //       "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/797dcb2cb823bc1d8ee40eea8b2b440d.jpg",
    //     description:
    //       "A bright and beautiful pink flower bouquet—simple, heartfelt, and perfect for saying 'I'm sorry.'",
    //     category: "Apology",
    //   },
    // ],
    // datenight: [
    //   {
    //     id: "11",
    //     name: "LV Black Heels",
    //     price: "$250.00",
    //     image:
    //       "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/blackshoe.jpg",
    //     description:
    //       "Sophisticated black Louis Vuitton heels—elevate her style for a romantic date night.",
    //     category: "Date Night",
    //   },
    //   {
    //     id: "12",
    //     name: "Red Dress",
    //     price: "$180.00",
    //     image:
    //       "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/dressred.jpg",
    //     description:
    //       "A stunning red evening dress designed to turn heads—perfect for a passionate night out.",
    //     category: "Date Night",
    //   },
    //   {
    //     id: "122",
    //     name: "Birkin Kelly",
    //     price: "$180.00",
    //     image:
    //       "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/0e6b825617352f18b8dac2443142025d.jpg",
    //     description:
    //       "An iconic Birkin Kelly handbag—a luxurious companion for an unforgettable date night.",
    //     category: "Date Night",
    //   },
    //   {
    //     id: "112",
    //     name: "Diamond Ring",
    //     price: "$180.00",
    //     image:
    //       "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/anniring.jpg",
    //     description:
    //       "A dazzling diamond ring—romantic, timeless, and the ultimate symbol of love on date night.",
    //     category: "Date Night",
    //   },
    //   {
    //     id: "192",
    //     name: "Red Roses",
    //     price: "$180.00",
    //     image:
    //       "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/redrose.jpg",
    //     description:
    //       "A bouquet of classic red roses—the ultimate expression of romance for your evening together.",
    //     category: "Date Night",
    //   },
    // ],
  },
  selectedEvent: null,
  selectedGifts: [],
};

const DefaultSwipeGiftsScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get eventKey from location.state or default to showing all gifts
  const { eventKey, eventName } = location.state || {
    eventKey: "all",
    eventName: "All Gifts",
  };

  // Get all gifts from all categories instead of just one category
  const getAllGifts = (): Gift[] => {
    const allGifts: Gift[] = [];

    Object.entries(initialState.eventGifts).forEach(([, gifts]) => {
      allGifts.push(...gifts);
    });

    return allGifts;
  };

  // Use all gifts if eventKey is "all", otherwise use specific category
  const giftsList: Gift[] =
    eventKey === "all"
      ? getAllGifts()
      : initialState.eventGifts[
          eventKey as keyof typeof initialState.eventGifts
        ] || [];

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

  const handleContinueBrowsing = () => {
    setRemovedGifts(new Set());
    setCurrentIndex(0);
  };
  const goBack = () => {
    // Navigate to the previous page if available, otherwise go to /home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/home");
    }
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

              <button className="w-full bg-gray-200 hover:bg-gray-300 text-[#79756C] font-[14px] py-3 px-4 rounded-lg text-sm transition-colors duration-200 font-montserrat">
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

              <div className="">
                <button
                  onClick={handleContinueBrowsing}
                  className="w-full bg-gray-200 mb-4 hover:bg-gray-300 text-[#79756C] font-[14px] py-3 px-4 rounded-lg text-sm transition-colors duration-200 font-montserrat"
                >
                  Start Over
                </button>

                <button className="w-full border-2 border-white hover:bg-white hover:text-gray-900 text-white font-[14px] py-2 px-4 rounded-lg text-sm transition-colors duration-200 font-montserrat">
                  <Link to="/preview">Create my Moment</Link>
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

              <div className="space-y-4">
                <button
                  onClick={handleContinueBrowsing}
                  className="w-full bg-gray-200 mb-4 hover:bg-gray-300 text-[#79756C] font-[14px] py-3 px-4 rounded-lg text-sm transition-colors duration-200 font-montserrat"
                >
                  Continue Browsing
                </button>

                <button
                  onClick={() => navigate("/preview")}
                  className="w-full border-2 border-white hover:bg-white hover:text-gray-900 text-white font-[14px] py-2 px-4 rounded-lg text-sm transition-colors duration-200 font-montserrat"
                >
                  Create my Moment
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
              className="absolute inset-0 flex flex-col bg-white overflow-hidden"
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

export default DefaultSwipeGiftsScreen;
