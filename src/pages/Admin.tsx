import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Input from "../components/Input";
import handleDelete from "../components/function/handleDelete";
import { useAuth } from "../context/AuthContext";

interface Product {
  _id: string;
  title: string;
  writer: string;
  price: number;
  availableItems: number;
  description: string;
  image?: string;
}

interface ProductFormData {
  title: string;
  writer: string;
  price: string | number;
  availableItems: string | number;
  description: string;
  image: string;
}

const emptyForm: ProductFormData = {
  title: "",
  writer: "",
  price: "",
  availableItems: "",
  description: "",
  image: "",
};

function Admin() {
  const { isLoggedIn, isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  // Guard: Only allow admin
  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 rounded-full bg-red-100 p-4 text-4xl">🔒</div>
        <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
        <p className="mt-2 max-w-md text-gray-500">
          You do not have administrator permissions to access this page. Please log in with an administrator account.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  // Fetch all products for admin
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products?limit=100");
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtered products based on search
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.writer.toLowerCase().includes(q),
    );
  }, [products, search]);

  // Statistics
  const stats = useMemo(() => {
    const totalBooks = products.length;
    const totalStock = products.reduce(
      (acc, p) => acc + (p.availableItems || 0),
      0,
    );
    const outOfStock = products.filter(
      (p) => (p.availableItems || 0) <= 0,
    ).length;
    const lowStock = products.filter(
      (p) => (p.availableItems || 0) > 0 && (p.availableItems || 0) <= 5,
    ).length;
    return { totalBooks, totalStock, outOfStock, lowStock };
  }, [products]);

  // Open Add Modal
  const openAddModal = () => {
    setFormData(emptyForm);
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      writer: product.writer,
      price: product.price,
      availableItems: product.availableItems,
      description: product.description || "",
      image: product.image || "",
    });
    setIsEditModalOpen(true);
  };

  // Handle Create Product
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.writer || formData.price === "" || formData.availableItems === "") {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        title: formData.title,
        writer: formData.writer,
        price: Number(formData.price),
        availableItems: Number(formData.availableItems),
        description: formData.description,
        image: formData.image || undefined,
      };

      const res = await api.post("/products", payload);
      const newProduct = res.data;

      setProducts((prev) => [newProduct, ...prev]);
      setIsAddModalOpen(false);
      setFormData(emptyForm);
      alert("Book added successfully!");
    } catch (error: any) {
      console.error("Error creating product:", error);
      const msg = error.response?.data?.message || "Failed to add book. Ensure you are logged in as an Admin.";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  // Handle Update Product
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      setSaving(true);
      const payload = {
        title: formData.title,
        writer: formData.writer,
        price: Number(formData.price),
        availableItems: Number(formData.availableItems),
        description: formData.description,
        image: formData.image || undefined,
      };

      const res = await api.patch(`/products/${editingProduct._id}`, payload);
      const updatedProduct = res.data;

      setProducts((prev) =>
        prev.map((p) =>
          p._id === editingProduct._id ? { ...p, ...updatedProduct } : p,
        ),
      );
      setIsEditModalOpen(false);
      setEditingProduct(null);
      alert("Book updated successfully!");
    } catch (error: any) {
      console.error("Error updating product:", error);
      const msg = error.response?.data?.message || "Failed to update book. Ensure you are logged in as an Admin.";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  // Handle Delete
  const onDelete = async (productId: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    const success = await handleDelete(productId);
    if (success) {
      setProducts((prev) => prev.filter((item) => item._id !== productId));
      alert("Book deleted successfully.");
    } else {
      alert("Failed to delete book. Admin privileges required.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-10">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your bookstore catalog, inventory quantities, and pricing.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-95"
        >
          <span className="text-xl leading-none">+</span> Add New Book
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Books */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Total Books</span>
            <span className="rounded-lg bg-blue-50 p-2 text-xl">📚</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-800">{stats.totalBooks}</p>
        </div>

        {/* Total Stock */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Inventory Units</span>
            <span className="rounded-lg bg-green-50 p-2 text-xl">📦</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-800">{stats.totalStock}</p>
        </div>

        {/* Low Stock */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Low Stock (&le; 5)</span>
            <span className="rounded-lg bg-amber-50 p-2 text-xl">⚠️</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-amber-600">{stats.lowStock}</p>
        </div>

        {/* Out of Stock */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Out of Stock</span>
            <span className="rounded-lg bg-red-50 p-2 text-xl">🚫</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-red-600">{stats.outOfStock}</p>
        </div>
      </div>

      {/* SEARCH BAR & CONTROLS */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search books by title or writer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <span className="text-sm text-gray-500">
          Showing {filteredProducts.length} of {products.length} books
        </span>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-gray-500">Loading catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
            <span className="text-4xl">🔍</span>
            <p className="mt-2 text-lg font-semibold text-gray-700">No books found</p>
            <p className="text-sm text-gray-500">
              {search ? "Try adjusting your search query." : "Start by adding a new book."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
                  <th className="px-6 py-4">Book</th>
                  <th className="px-6 py-4">Writer</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredProducts.map((product) => {
                  const isOut = (product.availableItems || 0) <= 0;
                  const isLow = !isOut && product.availableItems <= 5;

                  return (
                    <tr key={product._id} className="hover:bg-gray-50/75 transition">
                      {/* Image & Title */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.title}
                              className="h-12 w-10 rounded-md object-cover shadow-xs"
                            />
                          ) : (
                            <div className="flex h-12 w-10 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">
                              📖
                            </div>
                          )}
                          <div>
                            <span className="font-semibold text-gray-800 line-clamp-1">
                              {product.title}
                            </span>
                            <span className="text-xs text-gray-400">
                              ID: {product._id.slice(-6)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Writer */}
                      <td className="px-6 py-4 text-gray-600 font-medium">
                        {product.writer}
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        Rs. {product.price}
                      </td>

                      {/* Stock Badge */}
                      <td className="px-6 py-4">
                        {isOut ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                            Out of stock
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span>
                            Low Stock ({product.availableItems})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                            {product.availableItems} available
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(product._id, product.title)}
                            className="rounded-lg bg-red-50 border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <h3 className="text-xl font-bold text-gray-800">Add New Book</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Book Title *
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Peer-e-Kamil"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Writer / Author *
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Umera Ahmed"
                  value={formData.writer}
                  onChange={(e) =>
                    setFormData({ ...formData, writer: e.target.value })
                  }
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Price (Rs.) *
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g. 1200"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Stock Quantity *
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g. 25"
                    value={formData.availableItems}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availableItems: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Cover Image URL
                </label>
                <Input
                  type="text"
                  placeholder="https://example.com/cover.jpg"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Short description or summary of the book..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {saving ? "Creating..." : "Create Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <h3 className="text-xl font-bold text-gray-800">Edit Book Record</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Book Title *
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Writer / Author *
                </label>
                <Input
                  type="text"
                  value={formData.writer}
                  onChange={(e) =>
                    setFormData({ ...formData, writer: e.target.value })
                  }
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Price (Rs.) *
                  </label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Stock Quantity *
                  </label>
                  <Input
                    type="number"
                    value={formData.availableItems}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availableItems: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Cover Image URL
                </label>
                <Input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
