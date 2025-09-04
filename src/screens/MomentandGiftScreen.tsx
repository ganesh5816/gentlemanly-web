import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import momentbg from "../assets/momentsbackground.jpg";
import giftbg from "../assets/giftsbackground.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedEvent } from "../store/giftSlice"; // Import the action

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
    "px-8 py-3 rounded-lg border-2 transition-all duration-200 hover:bg-white hover:bg-opacity-10";
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

const MomentsGiftsScreen: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<
    "moments" | "gifts" | null
  >(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get event data passed from HomeScreen
  const { eventKey, eventName, gifts } = location.state || {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { eventGifts, selectedEvent } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.gifts
  );

  // Use gifts from navigation state or fallback to Redux store
  const availableGifts = gifts || eventGifts[eventKey] || [];

  // Dispatch event data to Redux when component mounts
  useEffect(() => {
    if (eventKey && eventName) {
      dispatch(
        setSelectedEvent({
          key: eventKey,
          name: eventName,
        })
      );

      // Also store in localStorage for persistence
      localStorage.setItem("currentEventKey", eventKey);
      localStorage.setItem("currentEventName", eventName);
    }
  }, [eventKey, eventName, dispatch]);

  const handleMomentsPress = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (expandedSection === "moments") {
      setExpandedSection(null);
    } else {
      setExpandedSection("moments");
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleGiftsPress = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (expandedSection === "gifts") {
      setExpandedSection(null);
    } else {
      setExpandedSection("gifts");
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleBeginWithMoments = () => {
    // Get current event from Redux store
    const currentEventKey = selectedEvent?.key || eventKey;
    const currentEventName = selectedEvent?.name || eventName;
    const currentGifts = eventGifts[currentEventKey] || availableGifts;

    // Navigate to moments/moment details screen
    navigate("/momentDetails", {
      state: {
        eventKey: currentEventKey,
        eventName: currentEventName,
        gifts: currentGifts,
        preserveCart: true,
      },
    });
  };

  const handleBeginWithGifts = () => {
    // Get current event and gifts from Redux store
    const currentEventKey = selectedEvent?.key || eventKey;
    const currentEventName = selectedEvent?.name || eventName;
    const currentGifts = eventGifts[currentEventKey] || availableGifts;

    console.log("Navigating with Redux data:", {
      eventKey: currentEventKey,
      eventName: currentEventName,
      gifts: currentGifts,
      fromRedux: !!selectedEvent,
    });

    // Navigate to gifts screen with specific gifts for this event from Redux
    navigate("/gifts", {
      state: {
        eventKey: currentEventKey,
        eventName: currentEventName,
        gifts: currentGifts,
        preserveCart: true,
      },
    });
  };

  // Calculate heights based on expanded section
  const getMomentsHeight = () => {
    if (expandedSection === "moments") return "h-[85vh]";
    if (expandedSection === "gifts") return "h-[15vh]";
    return "h-[50vh]";
  };

  const getGiftsHeight = () => {
    if (expandedSection === "gifts") return "h-[85vh]";
    if (expandedSection === "moments") return "h-[15vh]";
    return "h-[50vh]";
  };

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      {/* Header with Back Button */}
      <div className="absolute top-5 left-4 right-0 z-50 px-5 pt-2.5">
        <Link
          to="/home"
          className="w-10 h-10 rounded-full bg-black bg-opacity-30 border border-white flex items-center justify-center hover:bg-opacity-50 transition-all duration-200"
        >
          <ArrowLeft size={22} color="#FFFFFF" strokeWidth={2} />
        </Link>
      </div>

      {/* MOMENTS Section */}
      <div
        className={`w-full transition-all duration-300 ease-in-out ${getMomentsHeight()}`}
      >
        <div
          className="w-full h-full block active:opacity-90 transition-opacity duration-150 cursor-pointer"
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
                <p className="text-base text-white text-center mb-8 font-montserrat">
                  {expandedSection === "moments" &&
                    "Choose a moment first we will help you to find perfect gift match."}
                </p>
                {expandedSection === "moments" && (
                  <CustomButton
                    onPress={handleBeginWithMoments}
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
          className="w-full h-full block active:opacity-90 transition-opacity duration-150 cursor-pointer"
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
                <p className="text-base text-white text-center mb-8 font-montserrat">
                  {expandedSection === "gifts" &&
                    "Choose a gift first we will help you to create meaningful moment around it."}
                </p>
                {expandedSection === "gifts" && (
                  <CustomButton
                    onPress={handleBeginWithGifts}
                    style="w-[341px] rounded-lg"
                    variant="transparent"
                  >
                    <span className="text-white font-medium font-montserrat">
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
