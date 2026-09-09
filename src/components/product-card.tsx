import { useNavigate } from "react-router-dom";
import { useState } from "react";

import type { Product } from "../interfaces/product";
import Button from "./button";
import Counter from "./counter";
import { handleCart } from "./function/handlecart";

interface ProductCardProps {
  item: Product;
  onStockUpdate?: (productId: string, availableItems: number) => void;
}

const ProductCard = ({ item }: ProductCardProps) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const data = await handleCart(item._id, quantity);

    console.log("Response from add to cart:", data);
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
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Quantity</p>

          <Counter
            value={quantity}
            onChange={setQuantity}
            maxValue={item.availableItems}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-auto">
          <Button
            disabled={item.availableItems <= 0}
            onClick={handleAddToCart}
            className="
      w-full
      py-2.5
      text-sm
      font-semibold
      rounded-lg
      transition-all
      duration-200
      shadow-sm
      hover:shadow-md
    "
          >
            {item.availableItems <= 0 ? "OUT OF STOCK" : "ADD TO CART"}
          </Button>

          <Button
            onClick={() => navigate(`/product/${item._id}`)}
            className="
      w-full
      py-2.5
      text-sm
      font-semibold
      rounded-lg
      bg-gray-100
      text-gray-700
      hover:bg-gray-200
      transition-all
      duration-200
    "
          >
            VIEW PRODUCT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
