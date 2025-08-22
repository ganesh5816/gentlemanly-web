/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Plus,
  Clock,
  MapPin,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import moment1video from "../assets/mold.mp4";
import moment2video from "../assets/picnic.mp4";
import moment3video from "../assets/moment3.mp4";

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
    image: moment1video,
    detailImage: moment1video,
  },
  {
    id: 2,
    title: "SUNSET PICNIC",
    subtitle: "Golden hour moments",
    tagline: "Chase the sunset with your favorite person.",
    description:
      "Pack a basket, find the perfect spot, and watch the sky paint itself in shades of gold. It's not about the food, it's about the moment when time seems to stop.",
    whatsIncluded: [
      "Curated picnic basket with local delicacies",
      "Cozy blanket and cushions",
      "Sunset viewing guide to best spots",
    ],
    whyYoullLove: [
      "Intimate moments in nature's best light",
      "Instagram-worthy golden hour photos",
      "Quality time away from distractions",
    ],
    duration: "2 - 3 hours",
    location: "Scenic overlook points",
    priceRange: "$120.00 - $450.00",
    image: moment2video,
    detailImage: moment2video,
  },
  {
    id: 3,
    title: "STARLIT CAMPING",
    subtitle: "Adventure under stars",
    tagline: "Disconnect to reconnect under the stars.",
    description:
      "Leave the city lights behind and find yourselves under a blanket of stars. Share stories by the campfire, make s'mores, and fall asleep to nature's soundtrack.",
    whatsIncluded: [
      "Premium camping gear setup",
      "Stargazing equipment and guide",
      "Campfire cooking experience",
    ],
    whyYoullLove: [
      "Escape from the digital world",
      "Bonding over campfire stories",
      "Wake up to stunning sunrise views",
    ],
    duration: "Overnight",
    location: "Mountain camping sites",
    priceRange: "$250.00 - $600.00",
    image: moment3video,
    detailImage: moment3video,
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

          <div className="absolute bottom-4 left-6 right-6">
            <h1 className="text-white text-3xl font-bold tracking-wide">
              {story.title}
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3">{story.tagline}</h2>
            <p className="text-gray-600 leading-relaxed">{story.description}</p>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-semibold">What's Included</span>
              <button className="p-1 rounded-full border border-gray-300">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Why You'll Love It</h3>
            <ul className="space-y-3">
              {story.whyYoullLove.map((item, idx) => (
                <li key={idx} className="text-gray-600">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <span className="text-gray-500 text-sm">Duration</span>
                <p className="font-medium">{story.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <span className="text-gray-500 text-sm">Location</span>
                <p className="font-medium">{story.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <span className="text-gray-500 text-sm">Price Range</span>
                <p className="font-medium">{story.priceRange}</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-lg font-medium text-lg">
            Choose this Moment
          </button>
        </div>
      </div>
    );
  };

  const StoryComponent = ({ story, index }: any) => (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* Background Video - Optimized */}
      <div className="absolute inset-0">
        <video
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          src={story.image}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          autoPlay={index === currentStoryIndex}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      </div>

      {/* Central Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="w-16 h-16 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/35 transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide(index);
            setShowDetailScreen(true);
          }}
        >
          <Play className="w-7 h-7 text-white ml-1" fill="white" />
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
        <video
          src={stories[currentStoryIndex]?.image}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      <div className="absolute top-5 left-1 w-full flex items-center justify-between px-4 py-3 z-20">
        <button className="w-10 h-10 rounded-full bg-black bg-opacity-30 border border-white flex items-center justify-center hover:bg-opacity-50 transition-all duration-200">
          <ArrowLeft size={22} color="#FFFFFF" strokeWidth={2} />
        </button>
      </div>

      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

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
