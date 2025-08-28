import { BrowserRouter, Route, Routes } from "react-router-dom";
import MvdWelcomeScreen from "./screens/Welcome";
import HomeScreen from "./screens/HomeScreen";
import SidebarNavigation from "./screens/MenuBar";
import MomentsGiftsScreen from "./screens/MomentandGiftScreen";
import NotificationsScreen from "./screens/NotificationScreen";
import MobileChatInterface from "./screens/ChatbotScreen";
import StoriesUI from "./screens/MomentsDetailsScrren";
import OrderConfirmationScreen from "./screens/MakeItYoursScreen";
import ShoppingSwipeUI from "./screens/Swipescreen";
import ShoppingCart from "./screens/cartScreen";
import { Provider } from "react-redux";
import { store } from "./store/giftSlice";
import GiftsScreen from "./screens/GiftScreen";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MvdWelcomeScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/menu" element={<SidebarNavigation />} />
          <Route path="/moment" element={<MomentsGiftsScreen />} />
          <Route path="/chat" element={<MobileChatInterface />} />
          <Route path="/swipeui" element={<ShoppingSwipeUI />} />
          <Route path="/momentDetails" element={<StoriesUI />} />
          <Route path="/makeitYours" element={<OrderConfirmationScreen />} />
          <Route path="/notification" element={<NotificationsScreen />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/gifts" element={<GiftsScreen />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
