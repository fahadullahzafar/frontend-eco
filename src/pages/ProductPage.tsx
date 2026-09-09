import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import type { Product } from "../interfaces/product";
import Button from "../components/button";
import Counter from "../components/counter";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  // ADD TO CART
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/Login");
      return;
    }

    setAdding(true);
    const result = await addToCart(product._id, quantity);
    setAdding(false);

    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } else {
      alert(result.message || "Failed to add to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Image */}
          <div className="flex justify-center items-center bg-gray-50 rounded-xl p-8">
            <img
              src={product.image}
              alt={product.title}
              className="w-64 h-80 object-contain rounded-lg"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col gap-5 justify-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                {product.title}
              </h1>

              <p className="text-gray-500 mt-2">
                by <span className="font-semibold">{product.writer}</span>
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Price */}
            <div>
              <p className="text-gray-500 text-sm">Price</p>

              <p className="text-3xl font-bold text-green-600">
                Rs. {product.price}
              </p>
            </div>

            {/* Stock */}
            <div>
              <p className="text-gray-500 text-sm">Availability</p>

              <p
                className={
                  product.availableItems > 0
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {product.availableItems > 0
                  ? `${product.availableItems} items available`
                  : "Out of stock"}
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-500 text-sm mb-1">Description</p>

              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-gray-500 text-sm mb-2">Quantity</p>

              <Counter
                value={quantity}
                onChange={setQuantity}
                maxValue={product.availableItems}
              />
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              disabled={product.availableItems <= 0 || adding}
              className={`w-full py-3 text-lg transition-all duration-200 ${
                added ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""
              }`}
            >
              {product.availableItems <= 0
                ? "OUT OF STOCK"
                : added
                  ? "✓ ADDED TO CART"
                  : adding
                    ? "ADDING..."
                    : "ADD TO CART"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
