import { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import Button from "../components/button";
import { useCart } from "../context/CartContext";
import api from "../api/axios";

function Cart() {
  const { cart, setCart, updateQuantity, removeFromCart, fetchCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const items = cart?.items || [];

  const toggleSelect = (id: string) => {
    setSelectedItems((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id],
    );
  };

  const selectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.productId));
    }
  };

  const isAllSelected =
    items.length > 0 && selectedItems.length === items.length;

  const handleConfirm = (productId: string) => {
    console.log("Confirm:", productId);
  };

  const handleDelete = (productId: string) => {
    console.log("Delete:", productId);
  };

  const resetItem = async (productId: string) => {
    await removeFromCart(productId);
    setSelectedItems((previous) => previous.filter((id) => id !== productId));
  };

  const handleConfirmSelected = async () => {
    try {
      const response = await api.post("/orders", {
        productIds: selectedItems,
      });

      const data = response.data;
      console.log("Order successful:", data);

      setCart(data.cart);
      setSelectedItems([]);

      alert("Order placed successfully!");
    } catch (error: any) {
      console.error("Order error:", error);
      const msg = error.response?.data?.message || "Failed to place order";
      alert(msg);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      for (const productId of selectedItems) {
        await removeFromCart(productId);
      }
      setSelectedItems([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number,
  ) => {
    await updateQuantity(productId, newQuantity);
  };

  /*
   * Calculate selected items total
   */
  const selectedTotal = items
    .filter((item) => selectedItems.includes(item.productId))
    .reduce((total, item) => total + item.price * item.quantity, 0);

  /*
   * Total quantity of selected items
   */
  const selectedQuantity = items
    .filter((item) => selectedItems.includes(item.productId))
    .reduce((total, item) => total + item.quantity, 0);

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
      {items.length === 0 && (
        <div className="flex min-h-80 items-center justify-center rounded-2xl bg-white shadow-sm">
          <div className="text-center">
            <div className="mb-4 text-6xl">🛒</div>

            <h2 className="text-2xl font-semibold">Your cart is empty</h2>

            <p className="mt-2 text-gray-500">Add some books to your cart.</p>
          </div>
        </div>
      )}

      {/* CART */}
      {items.length > 0 && (
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
                {items.length} item
                {items.length !== 1 && "s"}
              </span>
            </div>

            {/* PRODUCTS */}
            <div>
              {items.map((item: any) => (
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
