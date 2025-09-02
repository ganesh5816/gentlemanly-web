/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bell } from "lucide-react";
import birthday from "../assets/birthday.jpg";
import aniversery from "../assets/anniversarytwo.jpg";
import justbecause1 from "../assets/just-because1.jpg";
import justbecause2 from "../assets/just-because-2.jpg";
import mothersday from "../assets/mothersday.jpg";
import apology from "../assets/apology.jpg";
import datenight from "../assets/datenight.jpg";
import vector from "../assets/Vector.png";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/GiftHer.png";
import { setSelectedEvent } from "../store/giftSlice";

// Mock theme object - replace with your actual theme
const theme = {
  whiteColor: "#ffffff",
  blackSecondary: "#666666",
};

// Updated events data with event keys that match your Redux store
const upcomimgEvents = [
  {
    image: birthday,
    eventName: "Her Birthday",
    date: "September 30",
    eventKey: "birthday", // This key matches your Redux store
  },
  {
    image: aniversery,
    eventName: "Anniversary",
    date: "October 15",
    eventKey: "anniversary",
  },
  {
    image: mothersday,
    eventName: "Mother's Day",
    date: "September 30th",
    eventKey: "mothersday",
  },
  {
    image: apology,
    eventName: "Apology",
    eventKey: "apology",
  },
  {
    image: datenight,
    eventName: "Date Night",
    eventKey: "datenight",
  },
];

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
    "px-8 py-3 rounded-lg border-2 transition-all duration-200 hover:bg-white hover:bg-opacity-10 ";
  const variantClasses =
    variant === "transparent"
      ? "border-white bg-transparent text-white "
      : "border-white bg-white text-black";

  return (
    <button
      onClick={onPress}
      className={`${baseClasses} ${variantClasses} ${style}`}
    >
      {children}
    </button>
  );
};

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get gifts data from Redux store
  const { eventGifts } = useSelector((state: any) => state.gifts);

  const handleEventClick = (eventKey: string, eventName: string) => {
    // Set the selected event in Redux store
    dispatch(setSelectedEvent({ key: eventKey, name: eventName }));

    // Navigate to moments/gifts screen with the selected event
    navigate("/moment", {
      state: {
        eventKey,
        eventName,
        gifts: eventGifts[eventKey] || [],
      },
    });
  };

  const handleNavigate = (screen: string) => {
    console.log(`Navigate to ${screen}`);
    // Add your navigation logic here
  };

  return (
    <div className="flex-1 bg-white min-h-screen">
      {/* Header */}
      <div className="h-17 px-6 py-4 flex justify-between items-center">
        <Link to="/menu" className="p-2">
          <img width={25} height={25} src={vector} />
        </Link>
        <img height={19} width={107} src={Logo} />
        <Link to="/notification" className="p-2">
          <Bell color={theme.blackSecondary} size={24} />
        </Link>
      </div>

      {/* Main Scroll View */}
      <div className="flex-1 overflow-y-auto">
        {/* Upcoming Events Section - Takes full viewport height */}
        <div className=" bg-white flex flex-col justify-center pt-4">
          <h1 className="text-2xl font-bold text-center mb-5 text-gray-800 font-times">
            Upcoming Events
          </h1>

          {/* Slider Container */}
          <div className="flex">
            <div className="flex-1 overflow-x-auto">
              <div className="flex space-x-4 px-4">
                {upcomimgEvents.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 cursor-pointer"
                    onClick={() =>
                      handleEventClick(item.eventKey, item.eventName)
                    }
                  >
                    <div
                      className="relative w-[calc(100vw-30px)] max-w-[370px] h-[600px] bg bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden flex items-center justify-center"
                      style={{
                        backgroundImage: `url('${item.image}')`,
                      }}
                    >
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-20" />

                      {/* Centered Text Container */}
                      <div className="absolute inset-0 flex items-center justify-center px-5">
                        <div className="text-center">
                          <h2 className="text-2xl font-bold text-white text-center mb-2 font-times">
                            {item.eventName}
                          </h2>
                          <p className="text-base text-white text-center font-montserrat">
                            {item.date}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Button Container */}
                      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center px-8">
                        <CustomButton
                          onPress={() =>
                            handleEventClick(item.eventKey, item.eventName)
                          }
                          style="w-full max-w-[341px] rounded-lg "
                          variant="transparent"
                        >
                          <p className="font-montserrat">Plan an Event</p>
                        </CustomButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Just Because Section - Starts below viewport */}
        <div className="min-h-screen bg-white mt-24">
          <div className="overflow-y-auto h-full">
            {/* Header Section */}
            <div className="px-6 pt-16 md:pt-20 pb-10 bg-gray-100 flex flex-col items-center">
              <h1 className="text-3xl font-bold text-center mb-5 text-gray-800 font-times">
                Just Because
              </h1>
              <p className="text-base leading-6 text-black text-center font-normal px-5 font-montserrat">
                Why wait for a reason? Surprise her with something special just
                because you want to.
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
                  <h2 className="text-3xl font-medium text-white mb-8 tracking-[4px] font-times text-center">
                    MOMENTS
                  </h2>
                  <CustomButton
                    onPress={() => {
                      dispatch(
                        setSelectedEvent({
                          key: "justbecause",
                          name: "Just Because",
                        })
                      );
                      navigate("/moment", {
                        state: {
                          eventKey: "justbecause",
                          eventName: "Just Because",
                          gifts: eventGifts["justbecause"] || [],
                        },
                      });
                    }}
                    style="w-[341px] rounded-lg"
                    variant="transparent"
                  >
                    <span className="text-white font-medium font-montserrat">
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
                  <h2 className="text-3xl font-medium text-white mb-8 tracking-[4px] font-times text-center">
                    GIFTS
                  </h2>
                  <CustomButton
                    onPress={() => navigate("/chat")}
                    style="w-[341px] rounded-lg"
                    variant="transparent"
                  >
                    <span className="text-white font-medium font-montserrat">
                      Begin with Gifts
                    </span>
                  </CustomButton>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="flex-1">
              <div className="flex-1 flex flex-col justify-center items-center px-5 py-10">
                <h2 className="text-3xl font-normal text-gray-800 text-center leading-10 mb-10 font-times">
                  Already Know The Gifts
                  <br />
                  You Want To Buy?
                </h2>

                <p className="text-base text-black text-center leading-6 font-montserrat mb-7 font-normal">
                  Speak to our chatbot to let her know which gifts you want so
                  she can help you find them and then let GiftHer create a
                  beautiful moment around your selected gifts
                </p>
                <Link
                  className="flex justify-center items-center text-center w-full px-8 py-3 rounded-lg border-2 transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                  to="/chat"
                >
                  <button
                    className="flex justify-center items-center text-center"
                    onClick={() => handleNavigate("ChatScreen")}
                  >
                    <span className="text-black font-sans">Chat Now</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
