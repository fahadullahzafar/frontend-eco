import Button from "./button";

interface CounterProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  onChange: (value: number) => void;
  onReset: () => void;
}

function Counter2({ value, minValue = 1, onChange, onReset }: CounterProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* Decrease */}
      <Button
        className="
          w-9 h-9
          flex items-center justify-center
          rounded-md
          bg-blue-500
          hover:bg-blue-600
          disabled:bg-blue-400
          disabled:text-white
          disabled:cursor-not-allowed
          text-white
          text-lg
          font-bold
          transition-colors
        "
        disabled={value <= minValue}
        onClick={() => onChange(Math.max(minValue, value - 1))}
      >
        −
      </Button>

      {/* Quantity */}
      <span
        className="
          w-10 h-9
          flex items-center justify-center
          rounded-md
          border border-gray-200
          bg-gray-50
          text-sm
          font-semibold
          text-gray-700
        "
      >
        {value}
      </span>

      {/* Remove */}
      <Button
        className="
          h-9
          px-3
          flex items-center justify-center
          rounded-md
          bg-red-500
          hover:bg-red-600
          text-white
          text-sm
          font-semibold
          transition-colors
        "
        onClick={onReset}
      >
        Remove
      </Button>
    </div>
  );
}

export default Counter2;
