// import { ArrowLeft } from "lucide-react";
// import { useState } from "react";

// export default function FeedbackForm() {
//   const [selectedAnswers, setSelectedAnswers] = useState({
//     q1: "Easy",
//     q2: "Somewhat",
//     q3: "",
//     q4: "",
//     q5: "5",
//   });

//   const handleAnswerSelect = (question, answer) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [question]: answer,
//     }));
//   };

//   const handleTextChange = (question, value) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [question]: value,
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Status Bar */}
//       {/* Header */}
//       <div className="bg-white px-6 py-4 flex items-center border-b border-gray-100">
//         <div className="relative flex  p-2 border border-[#E7E7E7] rounded-full justify-center items-center">
//           <ArrowLeft className="w-6 h-6 text-gray-700" />
//         </div>
//         <h1 className="text-xl font-medium text-center font-times flex-1 mr-10">
//           Feedback
//         </h1>
//       </div>

//       {/* Form Content */}
//       <div className="px-6 py-6 space-y-8">
//         {/* Question 1 */}
//         <div>
//           <h2 className="text-lg font-semibold mb-2 font-montserrat">
//             Question 1
//           </h2>
//           <p className="text-gray-700 mb-4 font-montserrat">
//             How easy was it to navigate GiftHer and find what you were looking
//             for?
//           </p>
//           <div className="flex space-x-4">
//             {[
//               { value: "Easy", label: "Easy", selected: true },
//               { value: "Okay", label: "Okay", selected: false },
//               { value: "Difficult", label: "Difficult", selected: false },
//             ].map((option) => (
//               <button
//                 key={option.value}
//                 onClick={() => handleAnswerSelect("q1", option.value)}
//                 className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors font-montserrat ${
//                   selectedAnswers.q1 === option.value
//                     ? "border-[#2ECC71] bg-green-50"
//                     : "border-gray-200 bg-white"
//                 }`}
//               >
//                 <div className="w-12 h-12 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
//                   <img
//                     src="/api/placeholder/24/24"
//                     alt="emoji"
//                     className="w-6 h-6"
//                   />
//                 </div>
//                 <span
//                   className={`text-sm ${
//                     selectedAnswers.q1 === option.value
//                       ? "text-green-600 font-medium"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   {option.label}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Question 2 */}
//         <div>
//           <h2 className="text-lg font-semibold mb-2 font-montserrat">
//             Question 2
//           </h2>
//           <p className="text-gray-700 mb-4 font-montserrat">
//             Did GiftHer's suggestions match your needs?
//           </p>
//           <div className="flex space-x-4">
//             {[
//               { value: "Yes", label: "Yes", selected: false },
//               { value: "Somewhat", label: "Somewhat", selected: true },
//               { value: "Not at all", label: "Not at all", selected: false },
//             ].map((option) => (
//               <button
//                 key={option.value}
//                 onClick={() => handleAnswerSelect("q2", option.value)}
//                 className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors font-montserrat  ${
//                   selectedAnswers.q2 === option.value
//                     ? "border-[#E7BD79] bg-yellow-50"
//                     : "border-gray-200 bg-white"
//                 }`}
//               >
//                 <div className="w-12 h-12 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
//                   <img
//                     src="/api/placeholder/24/24"
//                     alt="emoji"
//                     className="w-6 h-6"
//                   />
//                 </div>
//                 <span
//                   className={`text-sm ${
//                     selectedAnswers.q2 === option.value
//                       ? "text-yellow-600 font-medium"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   {option.label}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Question 3 */}
//         <div>
//           <h2 className="text-lg font-semibold mb-2 font-montserrat">
//             Question 3
//           </h2>
//           <p className="text-gray-700 mb-4">
//             What did you enjoy most about your experience with GiftHer?
//           </p>
//           <textarea
//             placeholder="Enter Here"
//             value={selectedAnswers.q3}
//             onChange={(e) => handleTextChange("q3", e.target.value)}
//             className="w-full h-24 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#E7BD79] focus:border-transparent font-montserrat"
//           />
//         </div>

//         {/* Question 4 */}
//         <div>
//           <h2 className="text-lg font-semibold mb-2 font-montserrat">
//             Question 4
//           </h2>
//           <p className="text-gray-700 mb-4 font-montserrat">
//             What could we improve to make GiftHer more helpful or enjoyable for
//             you?
//           </p>
//           <textarea
//             placeholder="Enter Here"
//             value={selectedAnswers.q4}
//             onChange={(e) => handleTextChange("q4", e.target.value)}
//             className="w-full h-24 font-montserrat p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#E7BD79] focus:border-transparent"
//           />
//         </div>

//         {/* Question 5 */}
//         <div>
//           <h2 className="text-lg font-semibold mb-2 font-montserrat">
//             Question 5
//           </h2>
//           <p className="text-gray-700 mb-4 font-montserrat">
//             How likely are you to recommend GiftHer to a friend or family
//             member?
//           </p>
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex space-x-2">
//               {[1, 2, 3, 4, 5].map((num) => (
//                 <button
//                   key={num}
//                   onClick={() => handleAnswerSelect("q5", num.toString())}
//                   className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-medium transition-colors font-montserrat ${
//                     selectedAnswers.q5 === num.toString()
//                       ? "border-[#E7BD79] bg-[#E7BD79] text-white"
//                       : "border-gray-200 bg-white text-gray-600"
//                   }`}
//                 >
//                   {num}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="flex justify-between text-sm text-gray-500 font-montserrat">
//             <span>Not at all</span>
//             <span>Extremely likely</span>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button className="w-full bg-[#E7BD79]  text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 mt-8 font-montserrat">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }
