import { ArrowLeft, Smile, Meh, Frown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FeedbackForm() {
  const [selectedAnswers, setSelectedAnswers] = useState({
    navigation_ease: "Easy",
    suggestions_match: "Somewhat",
    what_enjoy: "",
    improvement: "",
    rating: "5",
  });

  const handleAnswerSelect = (question: string, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [question]: answer,
    }));
  };

  const handleTextChange = (question: string, value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Format the answers as JSON
    const jsonOutput = {
      navigation_ease: selectedAnswers.navigation_ease,
      suggestions_match: selectedAnswers.suggestions_match,
      what_enjoy: selectedAnswers.what_enjoy,
      improvement: selectedAnswers.improvement,
      rating: selectedAnswers.rating,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://1co29r6tuk.execute-api.us-east-1.amazonaws.com/develop/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonOutput),
        }
      );

      if (response.ok) {
        alert("Feedback submitted successfully!");
        console.log("Feedback JSON:", JSON.stringify(jsonOutput, null, 2));
        navigate("/home");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // ✅ Tailwind-safe classes map
  const colorClasses: Record<
    string,
    { border: string; bg: string; text: string; textStrong: string }
  > = {
    green: {
      border: "border-green-500",
      bg: "bg-green-50",
      text: "text-green-500",
      textStrong: "text-green-600",
    },
    yellow: {
      border: "border-yellow-500",
      bg: "bg-yellow-50",
      text: "text-yellow-500",
      textStrong: "text-yellow-600",
    },
    red: {
      border: "border-red-500",
      bg: "bg-red-50",
      text: "text-red-500",
      textStrong: "text-red-600",
    },
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center border-b border-gray-100">
        <button
          onClick={() => navigate("/feedback")}
          className="relative flex p-2 border border-[#E7E7E7] rounded-full justify-center items-center"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-medium text-center font-times flex-1 mr-10">
          Feedback
        </h1>
      </div>

      {/* Form Content */}
      <div className="px-6 py-6 space-y-8">
        {/* Question 1 */}
        <div>
          <h2 className="text-lg font-semibold mb-2 font-montserrat">
            Question 1
          </h2>
          <p className="text-gray-700 mb-4 font-montserrat">
            How easy was it to navigate GiftHer and find what you were looking
            for?
          </p>
          <div className="flex space-x-4">
            {[
              { value: "Easy", label: "Easy", icon: Smile, color: "green" },
              { value: "Okay", label: "Okay", icon: Meh, color: "yellow" },
              {
                value: "Difficult",
                label: "Difficult",
                icon: Frown,
                color: "red",
              },
            ].map((option) => {
              const Icon = option.icon;
              const isSelected =
                selectedAnswers.navigation_ease === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() =>
                    handleAnswerSelect("navigation_ease", option.value)
                  }
                  className={`flex flex-col items-center h-[106px] w-[106px] p-4 rounded-lg border-2 transition-colors font-montserrat ${
                    isSelected
                      ? `${colorClasses[option.color].border} ${
                          colorClasses[option.color].bg
                        }`
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center ${
                      isSelected
                        ? colorClasses[option.color].text
                        : "text-gray-400"
                    }`}
                  >
                    <Icon className="w-10 h-10" />
                  </div>
                  <span
                    className={`text-sm ${
                      isSelected
                        ? `${colorClasses[option.color].textStrong} font-medium`
                        : "text-gray-600"
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 2 */}
        <div>
          <h2 className="text-lg font-semibold mb-2 font-montserrat">
            Question 2
          </h2>
          <p className="text-gray-700 mb-4 font-montserrat">
            Did GiftHer's suggestions match your needs?
          </p>
          <div className="flex space-x-4">
            {[
              { value: "Yes", label: "Yes", icon: Smile, color: "green" },
              {
                value: "Somewhat",
                label: "Somewhat",
                icon: Meh,
                color: "yellow",
              },
              {
                value: "Not at all",
                label: "Not at all",
                icon: Frown,
                color: "red",
              },
            ].map((option) => {
              const Icon = option.icon;
              const isSelected =
                selectedAnswers.suggestions_match === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() =>
                    handleAnswerSelect("suggestions_match", option.value)
                  }
                  className={`flex flex-col items-center h-[106px] w-[106px] p-4 rounded-lg border-2 transition-colors font-montserrat ${
                    isSelected
                      ? `${colorClasses[option.color].border} ${
                          colorClasses[option.color].bg
                        }`
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center ${
                      isSelected
                        ? colorClasses[option.color].text
                        : "text-gray-400"
                    }`}
                  >
                    <Icon className="w-10 h-10" />
                  </div>
                  <span
                    className={`text-sm ${
                      isSelected
                        ? `${colorClasses[option.color].textStrong} font-medium`
                        : "text-gray-600"
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 3 */}
        <div>
          <h2 className="text-lg font-semibold mb-2 font-montserrat">
            Question 3
          </h2>
          <p className="text-gray-700 mb-4 font-montserrat">
            What did you enjoy most about your experience with GiftHer?
          </p>
          <textarea
            placeholder="Enter Here"
            value={selectedAnswers.what_enjoy}
            onChange={(e) => handleTextChange("what_enjoy", e.target.value)}
            className="w-full h-24 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#E7BD79] focus:border-transparent font-montserrat"
          />
        </div>

        {/* Question 4 */}
        <div>
          <h2 className="text-lg font-semibold mb-2 font-montserrat">
            Question 4
          </h2>
          <p className="text-gray-700 mb-4 font-montserrat">
            What could we improve to make GiftHer more helpful or enjoyable for
            you?
          </p>
          <textarea
            placeholder="Enter Here"
            value={selectedAnswers.improvement}
            onChange={(e) => handleTextChange("improvement", e.target.value)}
            className="w-full h-24 font-montserrat p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#E7BD79] focus:border-transparent"
          />
        </div>

        {/* Question 5 */}
        <div>
          <h2 className="text-lg font-semibold mb-2 font-montserrat">
            Question 5
          </h2>
          <p className="text-gray-700 mb-4 font-montserrat">
            How likely are you to recommend GiftHer to a friend or family
            member?
          </p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleAnswerSelect("rating", num.toString())}
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-medium transition-colors font-montserrat ${
                    selectedAnswers.rating === num.toString()
                      ? "border-[#E7BD79] bg-[#E7BD79] text-white"
                      : "border-gray-200 bg-white text-gray-600"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 font-montserrat">
            <span>Not at all</span>
            <span>Extremely likely</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="w-full bg-[#E7BD79] text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 mt-8 font-montserrat"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
