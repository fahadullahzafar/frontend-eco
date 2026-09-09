import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Search ke liye debounce
    const timeout = setTimeout(() => {
      if (!loading) {
        setSearching(true);
      }

      fetch(
        `http://localhost:3000/orders?search=${encodeURIComponent(search)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to get orders");
          }

          return res.json();
        })
        .then((data) => {
          console.log("Orders:", data);
          setOrders(data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
          setSearching(false);
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  // Initial Loading only
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">📚</div>

          <p className="text-xl font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      <div className="max-w-5xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>

          <p className="text-gray-500 mt-1">
            View your previous orders and order details
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-8">
          <div className="flex items-center bg-white border rounded-xl px-4 py-3 shadow-sm">
            <span className="mr-3 text-lg">🔍</span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by book title..."
              className="w-full outline-none text-gray-700"
            />

            {/* Searching */}
            {searching && (
              <span className="text-sm text-gray-400">Searching...</span>
            )}

            {/* Clear */}
            {search && !searching && (
              <button
                onClick={() => setSearch("")}
                className="ml-3 text-gray-400 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* NO ORDERS */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              {search ? "No Books Found" : "No Orders Yet"}
            </h2>

            <p className="text-gray-500 mt-2">
              {search
                ? `No orders contain "${search}".`
                : "You haven't placed any orders yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                {/* ORDER HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>

                    <p className="font-semibold text-gray-800 break-all">
                      {order._id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>

                    <p className="font-medium text-gray-700">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span className="self-start md:self-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                    {order.status}
                  </span>
                </div>

                {/* ORDER ITEMS */}
                <div className="p-5">
                  <h2 className="text-lg font-semibold mb-4">Ordered Books</h2>

                  <div className="space-y-3">
                    {order.items.map((item: any) => (
                      <div
                        key={item.productId}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-xl p-4"
                      >
                        <div className="flex items-center gap-4">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-20 h-24 object-cover rounded-lg border"
                            />
                          ) : (
                            <div className="w-20 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                              No Image
                            </div>
                          )}

                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {item.title}
                            </h3>

                            <p className="text-sm text-gray-500">
                              Writer: {item.writer}
                            </p>

                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>

                        {/* PRICE */}
                        <div className="text-left sm:text-right">
                          <p className="text-sm text-gray-500">
                            Rs.{item.price} × {item.quantity}
                          </p>

                          <p className="font-semibold text-gray-800">
                            Rs.{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TOTAL */}
                <div className="flex justify-between items-center p-5 bg-gray-50 border-t">
                  <span className="text-lg font-semibold text-gray-700">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold text-gray-800">
                    Rs.{order.totalPrice}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
