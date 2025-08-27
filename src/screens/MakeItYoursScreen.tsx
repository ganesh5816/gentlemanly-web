const OrderConfirmationScreen = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="relative max-w-sm mx-auto min-h-screen overflow-hidden">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 pt-3 pb-1"></div>

        {/* Main Content - Perfectly Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-times text-black">
                Congratulation !
              </h1>
              <h2 className="text-2xl font-normal text-black leading-tight font-montserrat">
                Your Order is Placed
              </h2>
            </div>

            <p className="text-gray-600 text-base  font-montserrat leading-relaxed max-w-xs mx-auto">
              Your special moment is on the way. Here's a sneak peek of the
              experience you'll share once the package arrives.
            </p>

            <div className="pt-6">
              <button className="w-full max-w-sm bg-transparent border font-montserrat border-gray-300 text-gray-700 py-3 rounded-lg font-medium text-base hover:bg-gray-100 transition-colors duration-200">
                Preview the Experience
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationScreen;
