import type { Product } from "../interfaces/product";
import Counter2 from "./counter2";

interface CartCardProps {
  item: Product & {
    quantity: number;
    productId: string;
  };

  selected: boolean;
  onSelect: () => void;
  onConfirm: () => void;
  onDelete: () => void;
  onReset: () => void;
  onQuantityChange: (quantity: number) => void;
}

const CartCard = ({
  item,
  selected,
  onSelect,
  onReset,
  onQuantityChange,
}: CartCardProps) => {
  return (
    <div
      className={`
        relative
        flex flex-col sm:flex-row
        gap-5
        p-5 my-4
        bg-white
        border rounded-2xl
        shadow-sm
        transition-all duration-200
        ${
          selected
            ? "border-black ring-1 ring-black shadow-md"
            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
        }
      `}
    >
      {/* Checkbox */}
      <div className="absolute top-4 right-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="w-5 h-5 cursor-pointer accent-black"
        />
      </div>

      {/* Image */}
      <div className="flex justify-center sm:block shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="
            w-28 h-36
            object-cover
            rounded-xl
            shadow-sm
          "
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 pr-6">
        {/* Book Information */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
            {item.title}
          </h2>

          <p className="mt-1 text-sm font-medium text-gray-500">
            By {item.writer}
          </p>

          <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Bottom Section */}
        <div
          className="
          flex flex-col
          sm:flex-row
          sm:items-end
          sm:justify-between
          gap-4
          mt-5
          pt-4
          border-t
          border-gray-100
        "
        >
          {/* Quantity */}
          <div>
            <p className="text-xs text-gray-400 mb-1">Quantity</p>

            <Counter2
              value={item.quantity}
              onChange={onQuantityChange}
              minValue={1}
              onReset={onReset}
            />
          </div>

          {/* Price */}
          <div className="sm:text-right">
            <p className="text-xs text-gray-400">
              Rs. {item.price} × {item.quantity}
            </p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              Rs. {item.price * item.quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
