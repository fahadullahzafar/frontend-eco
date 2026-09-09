interface CounterProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  onChange: (value: number) => void;
}

function Counter({
  value,
  minValue = 1,
  maxValue = Infinity,
  onChange,
}: CounterProps) {
  return (
    <div className="inline-flex items-center rounded-xl border border-gray-200 bg-gray-50/70 p-1 shadow-2xs">
      {/* Decrease */}
      <button
        type="button"
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-700 text-base font-bold shadow-2xs hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95 cursor-pointer"
        disabled={value <= minValue}
        onClick={() => onChange(Math.max(minValue, value - 1))}
      >
        −
      </button>

      {/* Quantity */}
      <span className="w-10 text-center text-sm font-semibold text-gray-800 select-none">
        {value}
      </span>

      {/* Increase */}
      <button
        type="button"
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-700 text-base font-bold shadow-2xs hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95 cursor-pointer"
        disabled={value >= maxValue}
        onClick={() => onChange(Math.min(maxValue, value + 1))}
      >
        +
      </button>
    </div>
  );
}

export default Counter;
