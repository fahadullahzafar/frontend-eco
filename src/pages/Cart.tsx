import Button from "../components/button";
import { useEffect, useState } from "react";
import type { Product } from "../interfaces/product";

function Cart() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

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
                console.log("Cart:", data);
                setProducts(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Cart</h1>

            {products.map((product) => (
                <div key={product._id}>
                    <h2>{product.title}</h2>
                    <p>Price: {product.price}</p>
                    <p>Writer: {product.writer}</p>
                </div>
            ))}

            <Button
                style={{
                    fontSize: "20px",
                    borderRadius: "20px",
                }}
            >
                Now it's our time
            </Button>
        </div>
    );
}

export default Cart;