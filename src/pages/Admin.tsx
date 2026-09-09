import { useEffect, useState } from "react";
import handleDelete from "../components/function/handleDelete";
import api from "../api/axios";
import Button from "../components/button";

interface Product {
  _id: string;
  title: string;
  writer: string;
  price: number;
  availableItems: number;
  description: string;
  image?: string;
}

function Admin() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/products");

        console.log(response.data);

        setProducts(response.data.products);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <Button className="w-full py-3 text-lg">Add New Book</Button>
      <h2 className="mb-5 text-xl font-semibold text-gray-800">Products</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Writer</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-14 w-12 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-12 items-center justify-center rounded bg-gray-100 text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </td>

                <td className="px-4 py-3 font-medium text-gray-800">
                  {product.title}
                </td>

                <td className="px-4 py-3 text-gray-600">{product.writer}</td>

                <td className="px-4 py-3 font-medium">Rs. {product.price}</td>

                <td className="px-4 py-3 text-gray-600">
                  {product.availableItems}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      className="rounded-lg px-4 py-3 text-sm text-white bg-blue-500 hover:bg-blue-600"
                      onClick={async () => {
                        const success = await handleDelete(product._id);

                        if (success) {
                          setProduct((prev) =>
                            prev.filter((item) => item._id !== product._id),
                          );
                        }
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      disabled={product.availableItems <= 0}
                      className="rounded-lg px-4 py-3 text-sm text-white bg-blue-500 hover:bg-blue-600"
                    >
                      {product.availableItems <= 0
                        ? "OUT OF STOCK"
                        : "Modify Record"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
