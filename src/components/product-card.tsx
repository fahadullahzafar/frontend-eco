import type { Product } from "../interfaces/product"
import Button from "./button"
import Counter from "./counter"
import { handleCart } from "../components/handleCart"

interface ProductCardProps {
    item: Product
}

const ProductCard = ({ item }: ProductCardProps) => {
    return <div className=" flex flex-col border-2 border-solid p-5 justify-center m-10" >
        <h1 className="flex flex-col items-center border-2 border-r-10 border-l-10 p-2">{item.title}</h1>
        <span ><p>Writer: </p>
            <p>{item.writer}</p></span>
        <span>{item.image}</span>
        <span className="flex flex-row justify-around">
            <p>Price: Rs.{item.price}</p>
            <p>Available Items:{item.availableItems}</p></span>
        {/* <img className="flex flex-row items-center justify-center" src={item.image} alt={item.title} /> */}
        <div className="flex flex-col justify-center">
            <Button
                style={{
                    fontSize: "20px",
                }}
                onClick={() => handleCart(item._id)}
            >
                ADD TO CART
            </Button>
            <div>
                <h2>{<Counter maxValue={item.availableItems} />}</h2>
            </div>
        </div>
    </div>
}

export default ProductCard;