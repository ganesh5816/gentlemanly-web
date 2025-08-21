import { useState } from "react";
import { ChevronLeft, Play } from "lucide-react";

const MomentsGallery = () => {
  const [currentMoment, setCurrentMoment] = useState(0);

  const moments = [
    {
      id: 1,
      title: "Mold & Memories",
      subtitle: "Shape love with clay",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=800&fit=crop&crop=faces",
    },
    {
      id: 2,
      title: "Clay & Connection",
      subtitle: "Create magic together",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=800&fit=crop&crop=faces",
    },
    {
      id: 3,
      title: "Wheel of Wonder",
      subtitle: "Spin your dreams into reality",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=800&fit=crop&crop=faces",
    },
    {
      id: 4,
      title: "Pottery Paradise",
      subtitle: "Where hearts meet clay",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=800&fit=crop&crop=faces",
    },
    {
      id: 5,
      title: "Creative Souls",
      subtitle: "Craft your story",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=800&fit=crop&crop=faces",
    },
  ];

  const nextMoment = () => {
    setCurrentMoment((prev) => (prev + 1) % moments.length);
  };

  const prevMoment = () => {
    setCurrentMoment((prev) => (prev - 1 + moments.length) % moments.length);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Status Bar Background - matching the image */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-black/20 backdrop-blur-sm z-40" />

      {/* Status Bar Content */}
      <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-6 text-white text-sm font-medium z-50"></div>

      {/* Main Slider Container */}
      <div className="relative w-full h-full flex">
        {moments.map((moment, index) => (
          <div
            key={moment.id}
            className={`absolute inset-0 transition-transform duration-500 ease-out ${
              index === currentMoment
                ? "translate-x-0"
                : index < currentMoment
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${moment.image})` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

            {/* Content Overlay */}
            <div className="relative h-full flex flex-col justify-between pt-16 pb-6 px-6 text-white">
              {/* Top Navigation */}
              <div className="flex justify-start">
                <button
                  onClick={prevMoment}
                  className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/60 transition-all duration-200"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>

              {/* Play Button - Centered */}
              <div className="flex-1 flex items-center justify-center">
                <button
                  onClick={nextMoment}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center hover:bg-white/30 hover:scale-105 transition-all duration-300"
                >
                  <Play size={24} className="text-white ml-0.5" fill="white" />
                </button>
              </div>

              {/* Bottom Content */}
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-1 tracking-wide">
                    {moment.title}
                  </h1>
                  <p className="text-base text-white/90 font-normal">
                    {moment.subtitle}
                  </p>
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center space-x-2">
                  {moments.map((_, index) => (
                    <button
                      key={index}
                      // onClick={() => goToMoment(index )}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentMoment
                          ? "bg-white"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Side Preview (Right) */}
      <div className="absolute top-0 right-0 w-20 h-full overflow-hidden">
        {moments.map((moment, index) => {
          const nextIndex = (currentMoment + 1) % moments.length;
          if (index === nextIndex) {
            return (
              <div
                key={moment.id}
                className="w-full h-full bg-cover bg-center opacity-40"
                style={{ backgroundImage: `url(${moment.image})` }}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default MomentsGallery;
