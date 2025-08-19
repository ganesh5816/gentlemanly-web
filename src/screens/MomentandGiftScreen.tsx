import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import momentbg from "../assets/momentsbackground.jpg";
import giftbg from "../assets/giftsbackground.jpg";

// Mock theme object - replace with your actual theme
const theme = {
  whiteColor: "#ffffff",
};

// Mock navigation prop
interface NavigationProp {
  goBack: () => void;
  navigate: (screen: string) => void;
}

interface Props {
  navigation?: NavigationProp;
}

// Custom Button Component
interface CustomButtonProps {
  onPress?: () => void;
  style?: string;
  variant?: "transparent";
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  style = "",
  variant,
  children,
}) => {
  const baseClasses =
    "px-8 py-4 rounded-lg border-2 transition-all duration-200 hover:bg-white hover:bg-opacity-10";
  const variantClasses =
    variant === "transparent"
      ? "border-white bg-transparent"
      : "border-white bg-white";

  return (
    <button
      onClick={onPress}
      className={`${baseClasses} ${variantClasses} ${style}`}
    >
      {children}
    </button>
  );
};

const MomentsGiftsScreen: React.FC<Props> = ({ navigation }) => {
  const [expandedSection, setExpandedSection] = useState<
    "moments" | "gifts" | null
  >(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      console.log("Go back");
    }
  };

  const handleMomentsPress = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (expandedSection === "moments") {
      // Collapse back to equal sections
      setExpandedSection(null);
    } else {
      // Expand moments section
      setExpandedSection("moments");
    }

    // Reset animation flag after animation duration
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleGiftsPress = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (expandedSection === "gifts") {
      // Collapse back to equal sections
      setExpandedSection(null);
    } else {
      // Expand gifts section
      setExpandedSection("gifts");
    }

    // Reset animation flag after animation duration
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Calculate heights based on expanded section
  const getMomentsHeight = () => {
    if (expandedSection === "moments") return "h-[80vh]";
    if (expandedSection === "gifts") return "h-[20vh]";
    return "h-[50vh]";
  };

  const getGiftsHeight = () => {
    if (expandedSection === "gifts") return "h-[80vh]";
    if (expandedSection === "moments") return "h-[20vh]";
    return "h-[50vh]";
  };

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      {/* Header with Back Button */}
      <div className="absolute top-5 left-4 right-0 z-50 px-5 pt-2.5">
        <button
          onClick={handleGoBack}
          className="w-10 h-10 rounded-full bg-black bg-opacity-30 border border-white flex items-center justify-center hover:bg-opacity-50 transition-all duration-200"
        >
          <ArrowLeft size={22} color="#FFFFFF" strokeWidth={2} />
        </button>
      </div>

      {/* MOMENTS Section */}
      <div
        className={`w-full transition-all duration-300 ease-in-out ${getMomentsHeight()}`}
      >
        <div
          className="w-full h-full block active:opacity-90 transition-opacity duration-150"
          onClick={handleMomentsPress}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${momentbg})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="flex-1 flex flex-col items-center justify-center px-10">
                <h1
                  className="text-2xl font-bold text-white tracking-[6px] text-center font-times mb-4"
                  style={{
                    textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                  }}
                >
                  MOMENTS
                </h1>
                <p className="text-base text-white text-center mb-8">
                  {expandedSection === "moments"
                    ? "Tap again to collapse"
                    : "Choose a moment first."}
                </p>
                {expandedSection === "moments" && (
                  <CustomButton
                    style="w-[341px] rounded-lg"
                    variant="transparent"
                  >
                    <span className="text-white font-medium font-montserrat">
                      Begin with Moments
                    </span>
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GIFTS Section */}
      <div
        className={`w-full transition-all duration-300 ease-in-out ${getGiftsHeight()}`}
      >
        <div
          className="w-full h-full block active:opacity-90 transition-opacity duration-150"
          onClick={handleGiftsPress}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${giftbg})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <div className="flex-1 flex flex-col items-center justify-center px-10">
                <h1
                  className="text-2xl font-bold text-white tracking-[6px] text-center font-times mb-4"
                  style={{
                    textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                  }}
                >
                  GIFTS
                </h1>
                <p className="text-base text-white text-center mb-8">
                  {expandedSection === "gifts"
                    ? "Tap again to collapse"
                    : "Select a gift first."}
                </p>
                {expandedSection === "gifts" && (
                  <CustomButton
                    style="w-[341px] rounded-lg"
                    variant="transparent"
                  >
                    <span className="text-white font-mediumfont-montserrat">
                      Begin with Gifts
                    </span>
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MomentsGiftsScreen;
