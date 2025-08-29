import {
  ArrowLeft,
  Gift,
  Heart,
  Package,
  CheckCircle,
  Calendar,
  Crown,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function NotificationsScreen() {
  const notifications = [
    {
      id: 1,
      icon: Gift,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      title: "Surprise Her Just Because",
      emoji: "💕",
      description:
        'Want to make an ordinary day special? Explore gift ideas for a "Just Because" moment.',
      time: "2 mins ago",
    },
    {
      id: 2,
      icon: Heart,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      title: "Share Your Thoughts",
      emoji: "💭",
      description:
        "How was your last moment? Leave a quick review and let us know.",
      time: "1 hour ago",
    },
    {
      id: 3,
      icon: Package,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      title: "Your Order Has Shipped",
      emoji: "📦",
      description: "Order #2031 is on the way!",
      time: "1 day ago",
      hasLink: true,
    },
    {
      id: 4,
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Order Confirmed",
      emoji: "✅",
      description:
        "Your gift has been placed successfully and is getting ready for delivery.",
      time: "1 day ago",
    },
    {
      id: 5,
      icon: Calendar,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Birthday Countdown",
      emoji: "🎂",
      description:
        "Her birthday is coming up in 20 days — don't wait to plan the perfect surprise!",
      time: "1 day ago",
    },
    {
      id: 6,
      icon: Crown,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      title: "Upgrade to Premium",
      description: "",
      time: "1 day ago",
      isPremium: true,
    },
    {
      id: 66,
      icon: Calendar,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Birthday Countdown",
      emoji: "🎂",
      description:
        "Her birthday is coming up in 20 days — don't wait to plan the perfect surprise!",
      time: "1 day ago",
    },
    {
      id: 9,
      icon: Crown,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      title: "Upgrade to Premium",
      description: "",
      time: "1 day ago",
      isPremium: true,
    },
  ];

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      <div className="relative flex items-center justify-center px-4 py-4 border-b border-gray-100">
        <Link to={"/home"} className="absolute left-4">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-times font-semibold text-black">
          Notifications
        </h1>
      </div>

      {/* Recent Section */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-montserrat text-black">Recent</h2>
          <button className="text-sm text-gray-500">Mark all as read</button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;

            return (
              <div
                key={notification.id}
                className="flex items-start space-x-3 py-2"
              >
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-full ${notification.iconBg} flex items-center justify-center flex-shrink-0`}
                >
                  <IconComponent
                    className={`w-5 h-5 ${notification.iconColor}`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-semibold text-black truncate font-times">
                        {notification.title}
                      </h3>
                      {notification.emoji && (
                        <span className="text-sm">{notification.emoji}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2 font-montserrat">
                      {notification.time}
                    </span>
                  </div>

                  {notification.description && (
                    <p className="text-sm text-gray-600 leading-relaxed font-montserrat">
                      {notification.description}
                      {notification.hasLink && (
                        <button className="text-blue-600 underline ml-1">
                          Track Here
                        </button>
                      )}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
