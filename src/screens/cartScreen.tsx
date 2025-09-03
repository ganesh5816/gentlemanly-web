/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ArrowLeft, Eye, Minus, Plus, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type ItemId = string;

interface CartItem {
  id: ItemId;
  name: string;
  price: string;
  image: string;
  description?: string;
  category?: string;
  size?: string;
  color?: string;
}

export default function ShoppingCart() {
  const [quantities, setQuantities] = useState<Record<ItemId, number>>({});
  const [showModal, setShowModal] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [momentTitle, setMomentTitle] = useState<string>("");

  // Load moment-specific products on component mount
  useEffect(() => {
    const storedMomentData = localStorage.getItem("selectedMomentProducts");
    if (storedMomentData) {
      try {
        const parsedData = JSON.parse(storedMomentData);
        const products = parsedData.products || [];

        // Transform products to cart items format
        const transformedItems: CartItem[] = products.map((product: any) => ({
          id: product.id.toString(),
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          category: getCategoryFromName(product.name),
          size: getDefaultSize(product.name),
          color: getDefaultColor(product.name),
        }));

        setCartItems(transformedItems);
        setMomentTitle(parsedData.momentTitle || "My Selected Items");

        // Initialize quantities
        const initialQuantities: Record<string, number> = {};
        transformedItems.forEach((item) => {
          initialQuantities[item.id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error parsing stored moment data:", error);
        // Set empty cart if there's an error
        setCartItems([]);
      }
    } else {
      // Set empty cart if no stored data
      setCartItems([]);
    }
  }, []);

  // Don't show modal if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      setShowModal(false);
    }
  }, [cartItems]);

  const getCategoryFromName = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("shoe") || lowerName.includes("sandal"))
      return "SHOES";
    if (lowerName.includes("bag") || lowerName.includes("handbag"))
      return "BAGS";
    if (lowerName.includes("dress")) return "DRESS";
    if (lowerName.includes("hat")) return "ACCESSORIES";
    if (lowerName.includes("necklace") || lowerName.includes("jewelry"))
      return "JEWELRY";
    if (lowerName.includes("dinner") || lowerName.includes("reservation"))
      return "EXPERIENCE";
    return "ACCESSORIES";
  };

  const getDefaultSize = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("shoe") || lowerName.includes("sandal"))
      return "SIZE: 38";
    if (lowerName.includes("dress")) return "SIZE: L";
    return "ONE SIZE";
  };

  const getDefaultColor = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("white")) return "COLOR: White";
    if (lowerName.includes("black")) return "COLOR: Black";
    if (lowerName.includes("beige")) return "COLOR: Beige";
    return "COLOR: Natural";
  };

  const removeFromCart = (itemId: ItemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);

    // Update localStorage
    if (updatedItems.length > 0) {
      const cartData = {
        products: updatedItems,
        momentTitle,
        timestamp: Date.now(),
      };
      localStorage.setItem("selectedMomentProducts", JSON.stringify(cartData));
    } else {
      localStorage.removeItem("selectedMomentProducts");
    }

    // Update quantities
    const newQuantities = { ...quantities };
    delete newQuantities[itemId];
    setQuantities(newQuantities);
  };

  const updateQuantity = (item: ItemId, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: Math.max(1, prev[item] + change),
    }));
  };

  const getPriceValue = (priceString: string): number => {
    // Extract numeric value from price string
    const numericValue = parseFloat(priceString.replace(/[^0-9.]/g, ""));
    return isNaN(numericValue) ? 0 : numericValue;
  };

  const renderProductImage = (item: CartItem) => {
    const name = item.name.toLowerCase();

    // If it's a real image URL, use it
    if (
      item.image &&
      !item.image.includes("/api/placeholder") &&
      !item.image.includes("placeholder")
    ) {
      return (
        <img
          height={110}
          width={110}
          src={`${item.image}`}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      );
    }

    // Otherwise, render custom icons based on category/name
    if (name.includes("shoe") || name.includes("sandal")) {
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="w-12 h-8 relative">
            <div className="absolute inset-0 bg-amber-100 rounded-full"></div>
            <div className="absolute top-2 left-2 w-8 h-4 bg-amber-200 rounded-full"></div>
            <div className="absolute bottom-1 left-3 w-2 h-6 bg-amber-300"></div>
            <div className="absolute bottom-1 right-3 w-2 h-6 bg-amber-300"></div>
          </div>
        </div>
      );
    }

    if (name.includes("bag") || name.includes("handbag")) {
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="w-12 h-10 bg-black rounded-sm relative">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black rounded-full"></div>
            <div className="absolute top-1 left-1 w-2 h-1 bg-gray-400 rounded"></div>
          </div>
        </div>
      );
    }

    if (name.includes("dress")) {
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="w-10 h-14 bg-white relative rounded-t-full">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-white rounded-full"></div>
            <div className="absolute top-3 left-0 right-0 h-8 bg-white"></div>
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-white rounded-b-full"></div>
          </div>
        </div>
      );
    }

    if (name.includes("hat")) {
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="w-14 h-12 relative">
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-amber-200 rounded-full"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-100 rounded-full"></div>
          </div>
        </div>
      );
    }

    if (name.includes("necklace") || name.includes("jewelry")) {
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="w-12 h-12 relative">
            <div className="absolute inset-2 border-2 border-gray-400 rounded-full"></div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      );
    }

    if (name.includes("dinner") || name.includes("reservation")) {
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="w-12 h-12 relative">
            <div className="absolute inset-1 bg-gray-300 rounded-full"></div>
            <div className="absolute top-3 left-3 w-6 h-1 bg-gray-500 rounded"></div>
            <div className="absolute top-5 left-4 w-4 h-1 bg-gray-500 rounded"></div>
            <div className="absolute top-7 left-3 w-6 h-1 bg-gray-500 rounded"></div>
          </div>
        </div>
      );
    }

    // Default generic icon
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <div className="w-8 h-8 bg-gray-400 rounded"></div>
      </div>
    );
  };

  const calculateTotal = (): string => {
    const total = cartItems.reduce((sum, item) => {
      const price = getPriceValue(item.price);
      const quantity = quantities[item.id] || 1;
      return sum + price * quantity;
    }, 0);
    return `$${total.toFixed(2)}`;
  };
  const navigate = useNavigate();
  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <button className="border-2  border-[#E7E7E7] rounded-full p-2">
            <Link to="/moment">
              <ArrowLeft className="w-6 h-6 text-black" />
            </Link>
          </button>
          <div className="text-center flex-1">
            <h1 className="text-xl font-semibold text-black font-times">
              My Shopping Cart
            </h1>
          </div>
          <div className="w-6 h-6"></div> {/* Spacer */}
        </div>

        {/* Empty cart content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 font-times">
            Your cart is empty
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col relative">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-black text-white p-8 w-full mx-4 text-center relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 w-8 h-8 flex items-center justify-center border border-white rounded-full"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Modal Content */}
            <div className="pt-4">
              <h2 className="text-2xl font-medium mb-6 leading-tight font-times">
                A sneak peek into the joy you're about to give!
              </h2>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed font-montserrat">
                Watch how your selected gifts turn into a beautiful memory.
              </p>

              <button
                onClick={() => {
                  navigate("/giftmoment");
                  setShowModal(false);
                }}
                className="w-full bg-gray-200 text-black py-3 rounded-xl font-medium text-sm font-montserrat"
              >
                Preview my Moment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-1 text-black text-lg font-medium"></div>

      {/* Header */}
      <div className="flex items-center justify-between rounded-full px-4 py-4">
        <button className="border-2 border-[#E7E7E7] rounded-full p-2">
          <Link to="/moment">
            <ArrowLeft className="w-6 h-6 text-black" />
          </Link>
        </button>
        <div className="text-center flex-1">
          <h1 className="text-xl font-semibold text-black font-times">
            My Shopping Cart
          </h1>
        </div>
        <button onClick={() => setShowModal(true)}>
          <Eye className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Product Count */}
      <div className="px-4 pb-4">
        <span className="text-gray-500 text-sm font-montserrat">
          {cartItems.length} product{cartItems.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* Cart Items - Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {cartItems.map((item, index) => (
          <div key={item.id}>
            <div className="px-4 py-6">
              <div className="flex space-x-4">
                {/* Product Image */}
                <div className="w-[110px] h-[110px] bg-gray-100 overflow-hidden flex-shrink-0">
                  {renderProductImage(item)}
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs text-gray-500 font-medium mb-1 font-montserrat">
                        {item.category || "ITEM"}
                      </div>
                      <h3 className="text-lg font-medium text-black mb-2 font-times">
                        {item.name}
                      </h3>
                      <div className="text-sm text-gray-600 mb-1 font-montserrat">
                        {item.size || "ONE SIZE"}
                      </div>
                      <div className="text-sm text-gray-600 font-montserrat">
                        {item.color || "COLOR: Standard"}
                      </div>
                    </div>
                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quantity and Price */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="border border-gray-300 rounded-md px-2 py-1 flex items-center justify-center min-w-[20px]">
                    <span className="text-md font-medium font-montserrat text-center">
                      {quantities[item.id] || 1}
                    </span>
                  </div>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                {getPriceValue(item.price) > 0 && (
                  <div className="text-sm text-[#79756C] font-montserrat">
                    {item.price}
                  </div>
                )}
              </div>
            </div>
            {index < cartItems.length - 1 && (
              <div className="border-t border-gray-200 mx-4"></div>
            )}
          </div>
        ))}
      </div>

      {/* Fixed Checkout Button */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white p-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-medium font-montserrat">Total:</span>
          <span className="text-sm text-[#79756C] font-montserrat">
            {calculateTotal()}
          </span>
        </div>
        <button
          onClick={() => navigate("/makeitYours")}
          className="w-full font-montserrat bg-[#E7BD79] text-white py-3 rounded-xl font-medium text-sm"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
