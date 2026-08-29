import Button from "../components/button"
import Counter from "../components/counter";
import { useEffect, useState } from "react"
import type { Product } from "../interfaces/product";
import ProductCard from "../components/product-card";

function Home() {
    const [products, setProduct] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProduct(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
    return (
        <div className="flex flex-col gap-2" >
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4 gap-5">
                {products.map((item) => (
                    <ProductCard item={item} key={item._id} />
                ))
                }
            </div >
        </div >

    )
}
export default Home