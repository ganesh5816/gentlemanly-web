import React from "react";
import justbecause1 from "../assets/just-because1.jpg";
import justbecause2 from "../assets/just-because2.jpg";

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

const JustBecauseScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="overflow-y-auto h-full">
        {/* Header Section */}
        <div className="px-6 pt-16 md:pt-20 pb-10 bg-gray-100 flex flex-col items-center">
          <h1 className="text-3xl font-normal text-black mb-2 font-serif text-center">
            Just Because
          </h1>
          <p className="text-base leading-6 text-black text-center font-sans font-normal px-5">
            Why wait for a reason? Surprise her with something special just
            because you want to
          </p>
        </div>

        {/* Moments Section */}
        <div className="h-[40vh] mb-0">
          <div
            className="relative h-full flex justify-center items-center bg-cover bg-center"
            style={{
              backgroundImage: `url('${justbecause1}')`,
            }}
          >
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />

            {/* Section Content */}
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-3xl font-medium text-white mb-8 tracking-[4px] font-serif text-center">
                MOMENTS
              </h2>
              <CustomButton style="w-[341px] rounded-lg" variant="transparent">
                <span className="text-white font-medium font-sans">
                  Begin with Moments
                </span>
              </CustomButton>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-2.5" />

        {/* Gifts Section */}
        <div className="h-[40vh] mb-0">
          <div
            className="relative h-full flex justify-center items-center bg-cover bg-center"
            style={{
              backgroundImage: `url('${justbecause2}')`,
            }}
          >
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />

            {/* Section Content */}
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-3xl font-medium text-white mb-8 tracking-[4px] font-serif text-center">
                GIFTS
              </h2>
              <CustomButton style="w-[341px] rounded-lg" variant="transparent">
                <span className="text-white font-medium font-sans">
                  Begin with Gifts
                </span>
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JustBecauseScreen;
