/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ChevronLeft, Eye, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

type ItemId = "shoes" | "bag" | "dress";

interface CartItem {
  id: ItemId;
  category: string;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
}

export default function ShoppingCart() {
  const [quantities, setQuantities] = useState<Record<ItemId, number>>({
    shoes: 1,
    bag: 1,
    dress: 1,
  });

  const updateQuantity = (item: ItemId, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: Math.max(1, prev[item] + change),
    }));
  };

  const items: CartItem[] = [
    {
      id: "shoes",
      category: "SHOES",
      name: "Ankle-cuff heeled sandals",
      size: "SIZE: 38",
      color: "COLOR: Beige",
      price: 5650.0,
      image: "/api/placeholder/120/120",
    },
    {
      id: "bag",
      category: "BAGS",
      name: "Hermès Mini Kelly",
      size: "ONE SIZE",
      color: "COLOR: Black",
      price: 3450.0,
      image: "/api/placeholder/120/120",
    },
    {
      id: "dress",
      category: "DRESS",
      name: "White A-line Dress",
      size: "SIZE: L",
      color: "COLOR: White",
      price: 0,
      image: "/api/placeholder/120/120",
    },
  ];

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-1 text-black text-lg font-medium"></div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <Link to="/">
          <ChevronLeft className="w-6 h-6 text-black" />
        </Link>
        <h1 className="text-xl font-semibold text-black font-times">
          My Shopping Cart
        </h1>
        <Eye className="w-6 h-6 text-black" />
      </div>

      {/* Product Count */}
      <div className="px-4 pb-4">
        <span className="text-gray-500 text-sm font-montserrat">
          3 products
        </span>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* Cart Items - Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {items.map((item, index) => (
          <div key={item.id}>
            <div className="px-4 py-6">
              <div className="flex space-x-4">
                {/* Product Image */}
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.id === "shoes" && (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div className="w-12 h-8 relative">
                        <div className="absolute inset-0 bg-amber-100 rounded-full"></div>
                        <div className="absolute top-2 left-2 w-8 h-4 bg-amber-200 rounded-full"></div>
                        <div className="absolute bottom-1 left-3 w-2 h-6 bg-amber-300"></div>
                        <div className="absolute bottom-1 right-3 w-2 h-6 bg-amber-300"></div>
                      </div>
                    </div>
                  )}
                  {item.id === "bag" && (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div className="w-12 h-10 bg-black rounded-sm relative">
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black rounded-full"></div>
                        <div className="absolute top-1 left-1 w-2 h-1 bg-gray-400 rounded"></div>
                      </div>
                    </div>
                  )}
                  {item.id === "dress" && (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div className="w-10 h-14 bg-white relative rounded-t-full">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-white rounded-full"></div>
                        <div className="absolute top-3 left-0 right-0 h-8 bg-white"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-3 bg-white rounded-b-full"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="text-xs text-gray-500 font-medium mb-1 font-montserrat">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-medium text-black mb-2 font-times">
                    {item.name}
                  </h3>
                  <div className="text-sm text-gray-600 mb-1 font-montserrat">
                    {item.size}
                  </div>
                  <div className="text-sm text-gray-600 font-montserrat">
                    {item.color}
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
                      {quantities[item.id]}
                    </span>
                  </div>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                {item.price > 0 && (
                  <div className="text-lg font-semibold text-[#79756C] font-montserrat">
                    ${item.price.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
            {index < items.length - 1 && (
              <div className="border-t border-gray-200 mx-4"></div>
            )}
          </div>
        ))}
      </div>

      {/* Fixed Checkout Button */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white p-4 border-t border-gray-200">
        <button className="w-full font-montserrat bg-yellow-400 text-white py-4 rounded-xl font-medium text-lg">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
