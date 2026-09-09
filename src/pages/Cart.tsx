import { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import Button from "../components/button";
import { io } from "socket.io-client";
import handleReset from "../components/function/handlereset";

function Cart() {
  const [cart, setCart] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 👇 YE GET CART FUNCTION HAI
    const getCart = () => {
      fetch("http://localhost:3000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to get cart");
          }

          return res.json();
        })
        .then((data) => {
          setCart(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    // Page open hone par
    getCart();

    // Socket
    const socket = io("http://localhost:3000");

    socket.on("cartUpdated", () => {
      getCart(); // 👈 Socket event aate hi dobara backend se cart fetch
    });

    return () => {
      socket.off("cartUpdated");
      socket.disconnect();
    };
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedItems((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id],
    );
  };

  const selectAll = () => {
    if (selectedItems.length === cart?.items?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart?.items?.map((item: any) => item.productId) || []);
    }
  };

  const isAllSelected =
    cart?.items?.length > 0 && selectedItems.length === cart.items.length;

  const handleConfirm = (productId: string) => {
    console.log("Confirm:", productId);
  };

  const handleDelete = (productId: string) => {
    console.log("Delete:", productId);
  };

  const resetItem = async (productId: string) => {
    const data = await handleReset(productId);

    console.log("Cart after reset:", data);

    if (data) {
      setCart(data);

      setSelectedItems((previous) => previous.filter((id) => id !== productId));
    }
  };

  const handleConfirmSelected = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          productIds: selectedItems,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();

      console.log("Order successful:", data);

      setCart(data.cart);
      setSelectedItems([]);

      alert("Order placed successfully!");
    } catch (error) {
      console.log("Order error:", error);
      alert("Failed to place order");
    }
  };

  const handleDeleteSelected = async () => {
    const token = localStorage.getItem("token");

    try {
      for (const productId of selectedItems) {
        const response = await fetch(
          `http://localhost:3000/cart/${productId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to delete product ${productId}`);
        }
      }

      const response = await fetch("http://localhost:3000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to refresh cart");
      }

      const data = await response.json();

      setCart(data);
      setSelectedItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number,
  ) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3000/cart/${productId}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const data = await response.json();

      setCart(data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Calculate selected items total
   */
  const selectedTotal =
    cart?.items
      ?.filter((item: any) => selectedItems.includes(item.productId))
      ?.reduce(
        (total: number, item: any) => total + item.price * item.quantity,
        0,
      ) || 0;

  /*
   * Total quantity of selected items
   */
  const selectedQuantity =
    cart?.items
      ?.filter((item: any) => selectedItems.includes(item.productId))
      ?.reduce((total: number, item: any) => total + item.quantity, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-10">
      {/* PAGE TITLE */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        <p className="mt-1 text-gray-500">
          Review your items before placing your order.
        </p>
      </div>

      {/* EMPTY CART */}
      {cart?.items?.length === 0 && (
        <div className="flex min-h-80 items-center justify-center rounded-2xl bg-white shadow-sm">
          <div className="text-center">
            <div className="mb-4 text-6xl">🛒</div>

            <h2 className="text-2xl font-semibold">Your cart is empty</h2>

            <p className="mt-2 text-gray-500">Add some books to your cart.</p>
          </div>
        </div>
      )}

      {/* CART */}
      {cart?.items?.length > 0 && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            {/* SELECT ALL */}
            <div className="mb-4 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={selectAll}
                  className="h-5 w-5 cursor-pointer"
                />

                <span className="font-medium">Select All</span>
              </label>

              <span className="text-sm text-gray-500">
                {cart.items.length} item
                {cart.items.length !== 1 && "s"}
              </span>
            </div>

            {/* PRODUCTS */}
            <div>
              {cart.items.map((item: any) => (
                <CartCard
                  key={item._id}
                  item={item}
                  selected={selectedItems.includes(item.productId)}
                  onSelect={() => toggleSelect(item.productId)}
                  onConfirm={() => handleConfirm(item.productId)}
                  onDelete={() => handleDelete(item.productId)}
                  onReset={() => resetItem(item.productId)}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(item.productId, newQuantity)
                  }
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="sticky top-5 rounded-2xl bg-white p-6 shadow-md">
              <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

              <div className="space-y-4 border-b pb-5">
                <div className="flex justify-between text-gray-600">
                  <span>Selected Items</span>
                  <span>{selectedQuantity}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {selectedTotal}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              {/* TOTAL */}
              <div className="flex justify-between py-5">
                <span className="text-lg font-semibold">Total</span>

                <span className="text-xl font-bold">Rs. {selectedTotal}</span>
              </div>

              {/* ACTIONS */}
              {selectedItems.length > 0 ? (
                <div className="space-y-3">
                  <Button className="w-full" onClick={handleConfirmSelected}>
                    Confirm Order
                  </Button>

                  <Button className="w-full" onClick={handleDeleteSelected}>
                    Delete Selected
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-500">
                  Select items to continue
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
