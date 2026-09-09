import { useEffect, useState } from "react";
import type { Product } from "../interfaces/product";
import ProductCard from "../components/product-card";
import api from "../api/axios";

function Home() {
  const [products, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const productsPerPage = 8;

  // Get products from backend
  useEffect(() => {
    setLoading(true);
    setError("");

    api.get(
      `/products?page=${currentPage}&limit=${productsPerPage}&search=${encodeURIComponent(search)}`,
    )
      .then((res) => {
        const data = res.data;
        console.log(data);

        setProduct(data.products);
        setTotalPages(data.pagination.totalPages);
        setTotalProducts(data.pagination.totalProducts);
      })
      .catch((error) => {
        console.log(error);
        setError("Unable to load books. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, search]);


  // Search
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Change page
  const goToPage = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
              Your Online Bookstore
            </p>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Find Your Next
              <span className="text-blue-600"> Great Read</span>
            </h1>

            <p className="text-gray-500 text-lg leading-8 mt-6">
              Explore our collection of books, discover new authors, and find
              stories that inspire, educate, and entertain.
            </p>

            {/* SEARCH */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="flex items-center bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
                <span className="text-gray-400 text-xl mr-3">🔍</span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by book title or author..."
                  className="w-full bg-transparent outline-none text-gray-700"
                />

                {search && (
                  <button
                    onClick={() => handleSearch("")}
                    className="text-gray-400 hover:text-gray-700 text-xl"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
              Our Collection
            </p>

            <h2 className="text-4xl font-bold text-gray-900 mt-2">
              {search ? "Search Results" : "Explore Books"}
            </h2>
          </div>

          {!loading && !error && (
            <p className="text-gray-500">
              {totalProducts} {totalProducts === 1 ? "book" : "books"} found
            </p>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>

              <p className="text-gray-500">Loading books...</p>
            </div>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="bg-white border border-red-200 rounded-xl p-10 text-center">
            <p className="text-red-600 font-semibold">Something went wrong</p>

            <p className="text-gray-500 mt-2">{error}</p>
          </div>
        )}

        {/* NO RESULTS */}
        {!loading && !error && products.length === 0 && (
          <div className="bg-white border rounded-xl p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>

            <h3 className="text-xl font-bold text-gray-800">No Books Found</h3>

            <p className="text-gray-500 mt-2">No books match your search.</p>

            {search && (
              <button
                onClick={() => handleSearch("")}
                className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* PRODUCTS */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((item) => (
                <ProductCard
                  item={item}
                  key={item._id}
                />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {/* Previous */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg bg-white
                  disabled:opacity-40 disabled:cursor-not-allowed
                  hover:bg-gray-100 transition"
                >
                  ←
                </button>

                {/* Pages */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg border transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg bg-white
                  disabled:opacity-40 disabled:cursor-not-allowed
                  hover:bg-gray-100 transition"
                >
                  →
                </button>
              </div>
            )}

            {/* PAGE INFO */}
            {totalPages > 1 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-gray-900 text-white mt-10">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            There's Always Another Story to Discover
          </h2>

          <p className="text-gray-400 mt-4">
            Browse our collection and find your next favorite book.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
