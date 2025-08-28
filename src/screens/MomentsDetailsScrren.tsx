/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Plus,
  ArrowLeft,
  Minus,
} from "lucide-react";
import moment1video from "../assets/mold.mp4";
import moment2video from "../assets/picnic.mp4";
import { Link, useNavigate } from "react-router-dom";
import moment1 from "../assets/pottery.jpg";
import moment2 from "../assets/picnic.jpg";
// import dress from "../assets/dress.jpg";
// import shoesframe from "../assets/Frame283.png";
import datenight from "../assets/datenight.jpg";
import secondshoes from "../assets/2nddress.jpg";
import picnicdress from "../assets/shirt.jpg";
import skirt from "../assets/skirt.jpg";
import roses from "../assets/roses.jpg";
import sunhat from "../assets/sunhat.jpg";
import snacks from "../assets/snacks.jpg";
import floral from "../assets/floral.jpg";
import blackshoes from "../assets/blackshoe.jpg";
import dinner from "../assets/dinner.jpg";
import limo from "../assets/limo.jpg";
import redrose from "../assets/redrose.jpg";
import wine from "../assets/wine.jpg";
import dressred from "../assets/dressred.jpg";

const stories = [
  {
    id: 23,
    title: "POETTRY DATE GIFT",
    subtitle: "Shape love with clay",
    tagline: "Get your hands messy and your hearts full",
    description:
      "Spin the wheel, shape something real, and create more than just pottery, create memories. Whether you're beginners or pros, it's about the laughs, the smudges, and the moments in between",
    whatsIncluded: [
      "Pottery session for two",
      "All materials and tools provided",
      "Guided support from a local artisan",
      "Take home your own handmade pieces",
      "Refreshments during the session",
      "Gift: A Pleated White Shirt",
      "Gift: Dark Blue Denim Skirt",
      "Gift: Shoes",
    ],
    whyYoullLove: [
      "Creates a glamorous",
      "intimate atmosphere that makes her feel special while giving thoughtful gifts to enhance the experience",
    ],
    duration: "4–5 hours",
    location: "Local Pottery Studio",
    priceRange: "2050.00",
    image: moment1,
    detailImage: moment1video,
    products: [
      {
        id: 1,
        name: "Ankle-cuff Heeled Sandals",
        price: "$5,250.00",
        image: secondshoes,
        description:
          "Luxurious designer heeled sandals perfect for elegant evening occasions. Crafted with premium materials for ultimate sophistication.",
      },
      {
        id: 2,
        name: "White A-line Dress",
        price: "$450.00",
        image: picnicdress,
        description:
          "An elegant white A-line dress designed for sophisticated evening events. Perfect for starlit dinners and romantic occasions.",
      },
      {
        id: 30,
        name: "Designer Handbag",
        price: "$3,400.00",
        image: skirt,
        description:
          "A luxury designer handbag that complements any elegant evening look. Crafted from premium leather with impeccable attention to detail.",
      },
    ],
  },
  {
    id: 2,
    title: "SUNSET PICNIC",
    subtitle: "A Blissful Day Under the Open Sky",
    tagline: "A Blissful Day Under the Open Sky",
    description:
      "Relax together outdoors with a thoughtfully curated picnic experience, paired with accessories and outfits for the perfect vibe.",
    whatsIncluded: [
      " Picnic setup with blanket & cushions",
      "Gourmet snacks & drinks",
      "Fresh flower bouquet",
      "Soft background music",
      "Gift: Floral dress for her",
      "Gift: Matching sunhat or scarf",
    ],
    whyYoullLove: [
      "   Perfect for connecting, enjoying nature, and making memories in a cozy, romantic setting.",
    ],
    duration: "2 - 3 hours",
    location: "Scenic overlook points",
    priceRange: "$450.00",
    image: moment2,
    detailImage: moment2video,
    products: [
      {
        id: 1,
        name: "Ankle-cuff heeled sandals",
        price: "$89.00",
        image: roses,
        description:
          "Comfortable yet elegant heeled sandals perfect for outdoor picnics. The ankle-cuff design provides stability on uneven ground while maintaining style.",
      },
      {
        id: 2,
        name: "Woven Sun Hat",
        price: "$45.00",
        image: sunhat,
        description:
          "A stylish woven sun hat that provides perfect protection during golden hour picnics while adding a chic bohemian touch to your look.",
      },
      {
        id: 3,
        name: "Snacks",
        price: "$125.00",
        image: snacks,
        description:
          "A luxurious mini Kelly bag that's perfect for carrying your essentials during a romantic picnic. Compact yet sophisticated.",
      },
      {
        id: 124,
        name: "Floral dress",
        price: "Call for pricing",
        image: floral,
        description:
          "Complete your perfect day with a dinner reservation at a scenic restaurant. The perfect ending to your golden hour picnic experience.",
      },
      {
        id: 4,
        name: "Dinner Reservation",
        price: "Call for pricing",
        image: dinner,
        description:
          "Complete your perfect day with a dinner reservation at a scenic restaurant. The perfect ending to your golden hour picnic experience.",
      },
    ],
  },
  {
    id: 3,
    title: "Dinner Date",
    subtitle: "An Evening of Romance & Elegance",
    tagline: "A Blissful Day Under the Open Sky",
    description:
      "Dress up for a night of fine dining, enchanting music, and unforgettable moments, complete with stylish gifts for the evening.",
    whatsIncluded: [
      "Candle-lit dinner reservation",
      "Bottle of wine or champagne",
      "Private car service (optional)",
      "Gift: Elegant dress or outfit for her",
      "Gift: High end Bag",
      "Gift: Luxury Brand Shoes",
    ],
    whyYoullLove: [
      "Creates a glamorous, intimate atmosphere that makes her feel special while giving thoughtful gifts to enhance the experience.",
    ],
    duration: "2 - 3 hours",
    location: "Scenic overlook points",
    priceRange: "$450.00",
    image: datenight,
    detailImage: moment2video,
    products: [
      {
        id: 1,
        name: "Ankle-cuff heeled sandals",
        price: "$89.00",
        image: redrose,
        description:
          "Comfortable yet elegant heeled sandals perfect for outdoor picnics. The ankle-cuff design provides stability on uneven ground while maintaining style.",
      },
      {
        id: 2,
        name: "Woven Sun Hat",
        price: "$45.00",
        image: blackshoes,
        description:
          "A stylish woven sun hat that provides perfect protection during golden hour picnics while adding a chic bohemian touch to your look.",
      },

      {
        id: 14,
        name: "Limo",
        price: "Call for pricing",
        image: limo,
        description:
          "Complete your perfect day with a dinner reservation at a scenic restaurant. The perfect ending to your golden hour picnic experience.",
      },
      {
        id: 4,
        name: "Dinner Reservation",
        price: "Call for pricing",
        image: dinner,
        description:
          "Complete your perfect day with a dinner reservation at a scenic restaurant. The perfect ending to your golden hour picnic experience.",
      },
      {
        id: 40,
        name: "Dinner Reservation",
        price: "$ 400",
        image: wine,
        description:
          "Complete your perfect day with a dinner reservation at a scenic restaurant. The perfect ending to your golden hour picnic experience.",
      },

      {
        id: 48,
        name: "Red Dress",
        price: "$ 400",
        image: dressred,
        description:
          "Complete your perfect day with a dinner reservation at a scenic restaurant. The perfect ending to your golden hour picnic experience.",
      },
    ],
  },
];

const DotNav = ({ stories, currentIndex, onSelect }: any) => {
  return (
    <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 z-20">
      {stories.map((_: any, idx: React.Key | null | undefined) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`h-2 rounded-full transition-all duration-300 ${
            idx === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50"
          }`}
        />
      ))}
    </div>
  );
};

const ProductSlider = ({ products }: any) => {
  console.log("Products received:", products);
  const scrollRef = useRef(null);

  return (
    <div className="relative">
      {" "}
      {/* Removed mt-4 that might cause issues */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {products?.map((product: any, index: any) => (
          <div key={product.id || index} className="flex-shrink-0 w-44">
            {" "}
            {/* Removed mt-4 */}
            <div className="bg-gray-50 overflow-hidden mb-3 aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-sm font-times font-medium text-gray-900 mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 font-montserrat font-semibold">
              {product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const StoriesUI = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showDetailScreen, setShowDetailScreen] = useState(false);
  const [showSecondScreen, setShowSecondScreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isWhatsIncludedExpanded, setIsWhatsIncludedExpanded] = useState(false);

  const navigate = useNavigate();
  const progressInterval = useRef<any>(null);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const scrollRef = useRef<any>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Navigation function to pass moment data WITHOUT adding to cart
  const navigateToSwipeUI = (momentId: number) => {
    const selectedMoment = stories.find((story) => story.id === momentId);
    if (selectedMoment) {
      // Clear any existing cart data to ensure fresh start
      localStorage.removeItem("cartItems");

      // Store ONLY the moment data for the swipe UI to use
      localStorage.setItem(
        "selectedMomentProducts",
        JSON.stringify({
          momentId: selectedMoment.id,
          momentTitle: selectedMoment.title,
          products: selectedMoment.products,
          // Add flag to indicate this is for swiping, not for cart
          isForSwiping: true,
        })
      );
      navigate("/swipeui");
    }
  };

  // Function for "Make this Moment Yours" - this could add the moment itself but NOT products
  const handleMakeItYours = () => {
    const currentStory = stories[currentSlide];

    // Store only the moment/experience, not the individual products
    const momentData = {
      id: currentStory.id,
      title: currentStory.title,
      subtitle: currentStory.subtitle,
      description: currentStory.description,
      duration: currentStory.duration,
      location: currentStory.location,
      priceRange: currentStory.priceRange,
      type: "moment", // Flag to distinguish from products
    };

    // Get existing cart or create new one
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // Check if moment already exists in cart
    const momentExists = existingCart.some(
      (item: any) => item.type === "moment" && item.id === currentStory.id
    );

    if (!momentExists) {
      existingCart.push(momentData);
      localStorage.setItem("cartItems", JSON.stringify(existingCart));
    }

    // Navigate to make it yours page
    navigate("/makeitYours");
  };

  useEffect(() => {
    if (showSecondScreen && isPlaying && !showDetailScreen) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 0.5;
        });
      }, 50);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [showSecondScreen, isPlaying, currentSlide, showDetailScreen]);

  useEffect(() => {
    scrollToStory(currentStoryIndex);
  }, [currentStoryIndex]);

  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const video = videoRefs.current[key];
      if (video) {
        if (parseInt(key) === currentStoryIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [currentStoryIndex]);

  const scrollToStory = (index: number) => {
    if (scrollRef.current) {
      const slideWidth = window.innerWidth * 0.85;
      scrollRef.current.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const slideWidth = window.innerWidth * 0.85;
      const scrollPosition = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / slideWidth);
      if (
        newIndex !== currentStoryIndex &&
        newIndex >= 0 &&
        newIndex < stories.length
      ) {
        setCurrentStoryIndex(newIndex);
      }
    }
  };

  const handleNext = () => {
    if (currentSlide < stories.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setProgress(0);
    } else {
      setCurrentSlide(0);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setProgress(0);
    }
  };

  const handleTouchStart = (e: any) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: any) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;

    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && !showDetailScreen) {
      handleNext();
    }
    if (isRightSwipe && !showDetailScreen) {
      handlePrev();
    }
  };

  const handleScreenClick = (e: { clientX: any }) => {
    if (showDetailScreen) return;

    const screenWidth = window.innerWidth;
    const clickX = e.clientX;

    if (!showSecondScreen) {
      setShowSecondScreen(true);
      setIsPlaying(true);
      return;
    }

    if (clickX < screenWidth * 0.3) {
      handlePrev();
    } else if (clickX > screenWidth * 0.7) {
      handleNext();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const DetailScreen = () => {
    const story = stories[currentSlide];
    const detailVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (detailVideoRef.current) {
        detailVideoRef.current.play().catch(() => {});
      }
    }, []);

    return (
      <div className="fixed inset-0 bg-white z-30 overflow-y-auto">
        <div className="relative">
          <video
            ref={detailVideoRef}
            autoPlay
            muted
            loop
            playsInline
            src={story.detailImage}
            className="w-full h-64 object-cover"
          />

          {/* Back button overlay on video */}
          <div className="absolute top-4 left-4 z-40">
            <button
              onClick={() => setShowDetailScreen(false)}
              className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/50 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-5   px-6">
          <p className="text-lg font-montserrat  text-gray-500">price</p>
          <p className="text-lg font-montserrat  text-gray-500">
            {story.priceRange}
          </p>
        </div>

        <div className="px-6  py-3 space-y-2">
          {/* Updated button to use handleMakeItYours */}
          <button
            onClick={handleMakeItYours}
            className="w-full mt-4 bg-[#E7BD79] text-white mb-4 py-3 text-[16px] rounded-lg font-medium font-montserrat"
          >
            Make this Moment Yours
          </button>

          <div>
            <h2 className="text-[18px] font-semibold mb-3 font-times">
              {story.tagline}
            </h2>
            <p className="text-gray-600 leading-relaxed font-montserrat">
              {story.description}
            </p>
          </div>
          <div className="border-t pt-6">
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-lg font-montserrat">What's Included</span>
              <button
                className={`p-1 rounded-full border border-gray-300 transition-transform duration-200`}
                onClick={() =>
                  setIsWhatsIncludedExpanded(!isWhatsIncludedExpanded)
                }
              >
                {isWhatsIncludedExpanded ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isWhatsIncludedExpanded
                  ? "max-h-[2000px] opacity-100" // Increased max-height significantly
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-2 pb-4">
                <ul className="space-y-3 mb-6">
                  {story.whatsIncluded.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-gray-600 flex items-start font-montserrat"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className=" pt-4">
                  <ProductSlider products={story.products} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t py-6">
            <h3 className="text-[18px] font-semibold mb-4 font-times">
              Why You'll Love It
            </h3>
            <ul className="space-y-3">
              {story.whyYoullLove.map((item, idx) => (
                <li
                  key={idx}
                  className="text-gray-600 font-[14px] font-montserrat"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t pt-6 space-y-4">
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-500 text-[14px] font-montserrat">
                Duration
              </span>
              <p className="font-medium text-[14px] font-montserrat text-gray-500">
                {story.duration}
              </p>
            </div>

            <div className="flex justify-between items-center w-full border-t pt-4">
              <span className="text-gray-500 text-[14px] font-montserrat">
                Location
              </span>
              <p className="font-medium font-montserrat text-[14px] text-gray-500">
                {story.location}
              </p>
            </div>
          </div>

          <button
            style={{ marginTop: "30px" }}
            onClick={() => navigateToSwipeUI(story.id)}
            className="w-full bg-[#E7BD79] text-white font-montserrat text-[16px] py-3 rounded-lg text-lg"
          >
            Choose this Moment
          </button>
        </div>
      </div>
    );
  };

  const StoryComponent = ({ story, index }: any) => (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0">
        <img src={story.image} className="w-full h-full object-cover" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center border border-white hover:bg-white/35 transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide(index);
            setShowDetailScreen(true);
          }}
        >
          <Play className="w-4 h-4 text-white ml-1" />
        </button>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center px-4">
        <h2 className="text-white font-times text-xl font-bold tracking-wide mb-2">
          {story.title}
        </h2>
        <p className="text-white/90 text-base font-medium font-montserrat">
          {story.subtitle}
        </p>
      </div>
    </div>
  );

  const SecondScreen = () => {
    const secondScreenVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (secondScreenVideoRef.current) {
        secondScreenVideoRef.current.play().catch(() => {});
      }
    }, [currentSlide]);

    return (
      <div
        className="fixed inset-0 z-40 w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleScreenClick}
      >
        <div className="absolute inset-0">
          <video
            ref={secondScreenVideoRef}
            src={stories[currentSlide].image}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
          {stories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-white transition-all duration-100 ${
                  index < currentSlide
                    ? "w-full"
                    : index === currentSlide
                    ? ""
                    : "w-0"
                }`}
                style={{
                  width: index === currentSlide ? `${progress}%` : undefined,
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute top-12 left-4 right-4 z-20 flex items-center justify-between">
          <button
            className="p-2 rounded-full bg-black/30 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowSecondScreen(false);
              setIsPlaying(false);
              setProgress(0);
            }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            className="p-2 rounded-full bg-black/30 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            className={`w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-opacity ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </button>
        </div>

        <div className="absolute bottom-20 left-0 right-0 px-8">
          <h2 className="text-white text-3xl font-bold tracking-wide uppercase">
            {stories[currentSlide].title}
          </h2>
          <p className="text-white/90 text-lg mt-2">
            {stories[currentSlide].subtitle}
          </p>
        </div>

        <div className="absolute bottom-8 left-0 right-0">
          <div className="flex justify-center gap-2">
            {stories.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 bg-white" : "w-1 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen overflow-hidden relative flex items-center justify-center bg-black">
      {!showDetailScreen && !showSecondScreen && (
        <img
          src={stories[currentStoryIndex]?.image}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}

      <div className="absolute top-5 left-1 w-full flex items-center justify-between px-4 py-3 z-20">
        <Link to="/moment">
          <button className="w-10 h-10 rounded-full bg-black border border-white flex items-center justify-center hover:bg-opacity-50 transition-all duration-200">
            <ArrowLeft size={22} color="#FFFFFF" strokeWidth={2} />
          </button>
        </Link>
      </div>

      {showDetailScreen && <DetailScreen />}
      {showSecondScreen && <SecondScreen />}

      {!showDetailScreen && !showSecondScreen && (
        <>
          <div className="relative z-10 w-full px-4">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              onScroll={handleScroll}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  className="flex-shrink-0 snap-start px-2"
                  style={{
                    width: "85vw",
                    maxWidth: "375px",
                    height: "70vh",
                    maxHeight: "637px",
                  }}
                >
                  <StoryComponent story={story} index={index} />
                </div>
              ))}
            </div>
          </div>
          <DotNav
            stories={stories}
            currentIndex={currentStoryIndex}
            onSelect={(idx: any) => setCurrentStoryIndex(idx)}
          />
        </>
      )}
    </div>
  );
};

export default StoriesUI;
