import { BrowserRouter, Route, Routes } from "react-router-dom";
import MvdWelcomeScreen from "./screens/Welcome";
import HomeScreen from "./screens/HomeScreen";
import SidebarNavigation from "./screens/MenuBar";
import MomentsGiftsScreen from "./screens/MomentandGiftScreen";
import NotificationsScreen from "./screens/NotificationScreen";
import MobileChatInterface from "./screens/ChatbotScreen";
import StoriesUI from "./screens/MomentsDetailsScrren";
import OrderConfirmationScreen from "./screens/MakeItYoursScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MvdWelcomeScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/menu" element={<SidebarNavigation />} />
        <Route path="/moment" element={<MomentsGiftsScreen />} />
        <Route path="/chat" element={<MobileChatInterface />} />
        <Route path="/momentDetails" element={<StoriesUI />} />
        <Route path="/makeitYours" element={<OrderConfirmationScreen />} />

        <Route path="/notification" element={<NotificationsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
