import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

export interface CartItem {
  productId: string;
  title: string;
  writer: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartData {
  _id?: string;
  userId?: string;
  items: CartItem[];
}

interface CartContextType {
  cart: CartData | null;
  cartCount: number;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (
    productId: string,
    quantity: number,
  ) => Promise<{ success: boolean; message?: string }>;
  updateQuantity: (
    productId: string,
    quantity: number,
  ) => Promise<{ success: boolean; message?: string }>;
  removeFromCart: (
    productId: string,
  ) => Promise<{ success: boolean; message?: string }>;
  setCart: (cart: CartData | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const cartCount =
    cart?.items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;

  const fetchCart = useCallback(async () => {
    if (!isLoggedIn) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isLoggedIn, fetchCart]);

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const res = await api.post("/cart", { productId, quantity });
      if (res.data?.cart) {
        setCart(res.data.cart);
      } else {
        await fetchCart();
      }
      return { success: true };
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to add item to cart";
      return { success: false, message };
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const res = await api.patch(`/cart/${productId}`, { quantity });
      if (res.data?.cart) {
        setCart(res.data.cart);
      } else {
        await fetchCart();
      }
      return { success: true };
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update quantity";
      return { success: false, message };
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const res = await api.delete(`/cart/${productId}`);
      if (res.data) {
        setCart(res.data);
      } else {
        await fetchCart();
      }
      return { success: true };
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to remove item from cart";
      return { success: false, message };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
