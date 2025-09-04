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
import DefaultSwipeGiftsScreen from "./screens/DefaultSwipeScreen";
import PreviewMomentView from "./screens/previewMomwntScreen";
import FeedbackUI from "./screens/FeedbackUI";
import FeedbackForm from "./screens/FeedbackForm";
import WaitlistSignup from "./screens/waitListScreen";
import GiftMomentScreen from "./screens/GiftMomentScreen";
import ConcertMomentScreen from "./screens/concertScreen";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <SilentScreenTimeTracker /> */}
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
          <Route path="/defaultgifts" element={<DefaultSwipeGiftsScreen />} />
          <Route path="/preview" element={<PreviewMomentView />} />
          <Route path="/feedback" element={<FeedbackUI />} />
          <Route path="/form" element={<FeedbackForm />} />
          <Route path="/waitlist" element={<WaitlistSignup />} />
          <Route path="/giftmoment" element={<GiftMomentScreen />} />
          <Route path="/concert" element={<ConcertMomentScreen />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
