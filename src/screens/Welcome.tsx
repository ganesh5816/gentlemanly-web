import React from "react";
import background from "../assets/welcome2.jpg";
import { Link } from "react-router-dom";
// Mock navigation prop - replace with your actual navigation system
interface NavigationProp {
  navigate: (screen: string) => void;
}

interface Props {
  navigation?: NavigationProp;
}

// Custom Button Component
interface CustomButtonProps {
  onPress: () => void;
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

const MvdWelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleNavigate = () => {
    if (navigation) {
      navigation.navigate("/home");
    } else {
      // Fallback for demo purposes
      console.log("Navigate to HomeScreen");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col h-full">
        {/* Logo Container */}
        <div className="flex justify-center items-center pt-16 md:pt-20 pb-4">
          <h1 className="text-white text-lg font-semibold tracking-[3px]">
            LOGO
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-end px-6 md:px-9 pb-8 md:pb-12">
          {/* Title */}
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-normal leading-tight md:leading-[56px] mb-4 font-times">
            Let's
            <br />
            Create the
            <br />
            Perfect Moment
          </h2>

          {/* Subtitle */}
          <p className="text-white text-lg leading-6  mb-10 max-w-md font-montserrat">
            Everything you need to plan unforgettable moments, all in one place.
          </p>

          {/* Button */}
          <div className="w-full">
            <Link to="/home">
              <CustomButton variant="transparent" style="w-full">
                <span className="text-white font-medium font-sans">
                  Go To My Dashboard
                </span>
              </CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MvdWelcomeScreen;
