import React from "react";
import {
  X,
  Home,
  ShoppingCart,
  MessageCircle,
  User,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarNavigationProps {
  onClose?: () => void;
  onNavigate?: (screen: string) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  onClose,
  onNavigate,
}) => {
  const handleItemClick = (screen: string) => {
    if (onNavigate) {
      onNavigate(screen);
    }
    console.log(`Navigate to ${screen}`);
  };

  const menuItems = [
    { icon: Home, label: "Home", screen: "Home", screens: "/home" },
    { icon: ShoppingCart, label: "Cart", screen: "Cart", screens: "/cart" },
    {
      icon: MessageCircle,
      label: "ChatBot",
      screen: "ChatBot",
      screens: "/chat",
    },
    { icon: User, label: "Profile", screen: "Profile", screens: "/home" },
    { icon: HelpCircle, label: "Help", screen: "Help", screens: "/home" },
    { icon: Settings, label: "Setting", screen: "Setting", screens: "/home" },
  ];

  return (
    <div className="fixed inset-0 h-screen w-screen bg-[#30363C] text-white flex flex-col z-50">
      {/* Header with User Info */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">B</span>
          </div>
          <div>
            <h2 className="text-white font-medium">Brian Joseph</h2>
            <p className="text-gray-400 text-sm">brianjoseph@gmail.com</p>
          </div>
        </div>
        <Link
          to="/home"
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-6 py-6">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.screens}
                onClick={() => handleItemClick(item.screen)}
                className="w-full flex items-center space-x-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <item.icon size={20} />
                <span className="text-base">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Log out */}
      <div className="px-6 pb-8">
        <button
          onClick={() => handleItemClick("Logout")}
          className="w-full flex items-center space-x-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="text-base">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarNavigation;
