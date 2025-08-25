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
import moment3video from "../assets/moment3.mp4";
import { Link } from "react-router-dom";
import moment1 from "../assets/pottery.jpg";
import moment2 from "../assets/picnic.jpg";
import moment3 from "../assets/datenight.jpg";
import dress from "../assets/dress.jpg";
import bag from "../assets/brownbag.jpg";
import shoesframe from "../assets/Frame283.png";
import blackBag from "../assets/blackbag.jpg";
import dinner from "../assets/dinner.jpg";

const stories = [
  {
    id: 1,
    title: "MOLD & MEMORIES",
    subtitle: "Shape love with clay",
    tagline: "Get your hands messy and your hearts full.",
    description:
      "Spin the wheel, shape something real, and create more than just pottery, create memories. Whether you're beginners or pros, it's about the laughs, the smudges, and the moments in between.",
    whatsIncluded: [
      "All pottery materials and tools provided",
      "Professional instruction and guidance",
      "Your finished pieces fired and glazed",
    ],
    whyYoullLove: [
      "Perfect for slow, meaningful connection",
      "Great for fun and creativity",
      "You leave with handmade souvenirs of your time together",
    ],
    duration: "1.5 - 2 hours",
    location: "Local pottery studio",
    priceRange: "$150.00 - $800.00",
    image: moment1,
    detailImage: moment1video,
    products: [
      {
        id: 1,
        name: "Ankle-cuff heeled sandals",
        price: "$45.00",
        image: shoesframe,
      },
      {
        id: 2,
        name: "White A-line Dress",
        price: "$25.00",
        image: dress,
      },
    ],
  },
  {
    id: 2,
    title: "SUNSET PICNIC",
    subtitle: "Golden hour moments",
    tagline: "A Blissful Day Under the Open Sky",
    description:
      "Relax together outdoors with a thoughtfully curated picnic experience, paired with accessories and outfits for the perfect vibe.",
    whatsIncluded: [
      "Picnic setup with blanket & cushions",
      "Gourmet snacks & drinks",
      "Fresh flower bouquet",
      // "Soft background music",
      // "Gift: Floral dress for her",
      // "Gift: Matching sunhat or scarf",
    ],
    whyYoullLove: [
      "Intimate moments in nature's best light",
      "Instagram-worthy golden hour photos",
      "Quality time away from distractions",
    ],
    duration: "2 - 3 hours",
    location: "Scenic overlook points",
    priceRange: "$120.00 - $450.00",
    image: moment2,
    detailImage: moment2video,
    products: [
      {
        id: 1,
        name: "Ankle-cuff heeled sandals",
        price: "$89.00",
        image: shoesframe,
      },
      {
        id: 2,
        name: "Woven Sun Hat",
        price: "$45.00",
        image: dress,
      },
      {
        id: 3,
        name: "Hermes Mini Kelly",
        price: "$125.00",
        image: blackBag,
      },
      {
        id: 4,
        name: "Dinner Reserveation",
        image: dinner,
      },
    ],
  },
  {
    id: 3,
    title: "STARLIT CAMPING",
    subtitle: "An Evening of Romance & Elegance",
    tagline: "Disconnect to reconnect under the stars.",
    description:
      "Dress up for a night of fine dining, enchanting music, and unforgettable moments, complete with stylish gifts for the evening.",
    whatsIncluded: [
      "Candle-lit dinner reservation",
      "Bottle of wine or champagne",
      "Private car service (optional)",
      // "Gift: Elegant dress or outfit for her",
      // "Gift: High end Bag",
      // "Gift: Luxury Brand Shoes",
    ],
    whyYoullLove: [
      " Creates a glamorous",
      "intimate atmosphere that makes her feel special while giving thoughtful gifts to enhance the experience",
    ],
    duration: "4–5 hours",
    location: "Upscale restaurant or rooftop venue",
    priceRange: "$250.00 - $600.00",
    image: moment3,
    detailImage: moment3video,
    products: [
      {
        id: 1,
        name: "Ankle-cuff Heeled Sandals",
        price: "$5,250.00",
        image:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop&crop=center",
      },
      {
        id: 2,
        name: "White A-line Dress",
        price: "$450.00",
        image:
          "https://images.unsplash.com/photo-1566479179817-f8ec83218f9e?w=400&h=400&fit=crop&crop=center",
      },
      {
        id: 3,
        name: "Designer Handbag",
        price: "$3,400.00",
        image:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&crop=center",
      },
      {
        id: 4,
        name: "Diamond Necklace",
        price: "$2,100.00",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
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
  console.log("Products received:", products); // Add this line for debugging

  const scrollRef = useRef(null);

  return (
    <div className="relative mt-4">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {products?.map(
          (
            product: any,
            index: any // Add optional chaining
          ) => (
            <div key={product.id || index} className="flex-shrink-0 w-44 mt-4">
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
              <p className="text-sm text-gray-600 font-montserrat font-semibold">
                {product.price}
              </p>
            </div>
          )
        )}
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
  const progressInterval = useRef<any>(null);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const scrollRef = useRef<any>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

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

  // Handle video playback optimization
  useEffect(() => {
    // Play only the current video, pause others
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
  const [isWhatsIncludedExpanded, setIsWhatsIncludedExpanded] = useState(false);
  const scrollToStory = (index: number) => {
    if (scrollRef.current) {
      const slideWidth = window.innerWidth * 0.85; // Responsive width based on viewport
      scrollRef.current.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const slideWidth = window.innerWidth * 0.85; // Responsive width
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
        </div>

        <div className="p-6 space-y-6">
          <Link to="/makeitYours">
            <button className="w-full mt-4 bg-black text-white py-3 text-[16px]  rounded-lg font-medium text-lg font-montserrat">
              Make this Moment Yours
            </button>
          </Link>
          <div>
            <h2 className="text-2xl font-semibold mb-3 font-times">
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
                className={`p-1 rounded-full border border-gray-300 transition-transform duration-200 
                }`}
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

            {/* Expandable content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isWhatsIncludedExpanded
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-3 pt-2">
                {story.whatsIncluded.map((item, idx) => (
                  <li key={idx} className="text-gray-600 flex items-start  ">
                    {item}
                  </li>
                ))}
                <ProductSlider products={story.products} />
              </ul>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 font-times">
              Why You'll Love It
            </h3>
            <ul className="space-y-3">
              {story.whyYoullLove.map((item, idx) => (
                <li key={idx} className="text-gray-600 font-montserrat">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex w-full">
              <div className="flex justify-between items-center w-full">
                <span className="text-gray-500 text-sm font-montserrat">
                  Duration
                </span>
                <p className="font-medium font-montserrat">{story.duration}</p>
              </div>
            </div>

            <div className="flex w-full">
              <div className="flex justify-between items-center w-full">
                <span className="text-gray-500 text-sm font-montserrat">
                  Location
                </span>
                <p className="font-medium font-montserrat">{story.location}</p>
              </div>
            </div>

            <div className="flex w-full">
              <div className="flex justify-between items-center w-full">
                <span className="text-gray-500 text-sm font-montserrat">
                  Duration
                </span>
                <p className="font-medium font-montserrat">
                  {story.priceRange}
                </p>
              </div>
            </div>
          </div>

          <button className="w-full bg-black text-white text-[16px] py-3 rounded-lg  text-lg">
            Choose this Moment
          </button>
        </div>
      </div>
    );
  };

  const StoryComponent = ({ story, index }: any) => (
    <div className="relative w-full h-full overflow-hidden l">
      {/* Background Video - Optimized */}
      <div className="absolute inset-0">
        <img src={story.image} className="w-full h-full object-cover" />

        {/* Overlay gradient */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" /> */}
      </div>

      {/* Central Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-white hover:bg-white/35 transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide(index);
            setShowDetailScreen(true);
          }}
        >
          <Play className="w-7 h-7 text-white ml-1" />
        </button>
      </div>

      {/* Bottom Content */}
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

        {/* Progress bars at top */}
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
      {/* Background video - Only play current video */}
      {!showDetailScreen && !showSecondScreen && (
        <img
          src={stories[currentStoryIndex]?.image}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}

      <div className="absolute top-5 left-1 w-full flex items-center justify-between px-4 py-3 z-20">
        <Link to="/moment">
          <button className="w-10 h-10 rounded-full bg-black  border border-white flex items-center justify-center hover:bg-opacity-50 transition-all duration-200">
            <ArrowLeft size={22} color="#FFFFFF" strokeWidth={2} />
          </button>
        </Link>
      </div>

      {/* Background overlay */}

      {showDetailScreen && <DetailScreen />}
      {showSecondScreen && <SecondScreen />}

      {!showDetailScreen && !showSecondScreen && (
        <>
          {/* Responsive Slider Container */}
          <div className="relative z-10 w-full px-4">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              onScroll={handleScroll}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
              }}
            >
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  className="flex-shrink-0 snap-start px-2"
                  style={{
                    width: "85vw", // Responsive width based on viewport
                    maxWidth: "375px", // Maximum width for larger screens
                    height: "70vh", // Responsive height
                    maxHeight: "637px", // Maximum height
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
