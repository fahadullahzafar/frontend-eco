import { useNavigate } from "react-router-dom";
import { useState } from "react";

import type { Product } from "../interfaces/product";
import Button from "./button";
import Counter from "./counter";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

interface ProductCardProps {
  item: Product;
  onStockUpdate?: (productId: string, availableItems: number) => void;
}

const ProductCard = ({ item }: ProductCardProps) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/Login");
      return;
    }

    setAdding(true);
    const result = await addToCart(item._id, quantity);
    setAdding(false);

    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } else {
      alert(result.message || "Failed to add to cart");
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 m-4 flex flex-col">
      {/* Image */}
      <div className="bg-gray-100 h-64 flex items-center justify-center p-6 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-800 line-clamp-2 min-h-[56px]">
            {item.title}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            by{" "}
            <span className="font-semibold text-gray-700">{item.writer}</span>
          </p>
        </div>

        {/* Price + Stock */}
        <div className="flex items-center justify-between border-y border-gray-200 py-3">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Price
            </p>

            <p className="text-2xl font-bold text-green-600">
              Rs. {item.price}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Stock
            </p>

            <p
              className={
                item.availableItems > 0
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {item.availableItems > 0
                ? `${item.availableItems} left`
                : "Out of stock"}
            </p>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-sm font-medium text-gray-600">Quantity</p>

          <Counter
            value={quantity}
            onChange={setQuantity}
            maxValue={item.availableItems}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5 mt-auto pt-2">
          <Button
            disabled={item.availableItems <= 0 || adding}
            onClick={handleAddToCart}
            className={`w-full py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 shadow-xs hover:shadow-md ${
              item.availableItems <= 0
                ? "bg-gray-100 text-gray-400 border border-gray-200"
                : added
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600"
                  : "bg-blue-600 hover:bg-blue-700 text-white border border-blue-600"
            }`}
          >
            {item.availableItems <= 0
              ? "OUT OF STOCK"
              : added
                ? "✓ ADDED TO CART"
                : adding
                  ? "ADDING..."
                  : "ADD TO CART"}
          </Button>

          <Button
            onClick={() => navigate(`/product/${item._id}`)}
            variant="outline"
            className="w-full py-2.5 text-sm font-semibold rounded-xl bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-2xs"
          >
            VIEW PRODUCT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
