import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
}

function Button({
  className = "",
  disabled,
  children,
  style,
  variant,
  ...props
}: ButtonProps) {
  const hasBg = className.includes("bg-");
  const baseVariant = variant
    ? variant === "secondary"
      ? "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200"
      : variant === "outline"
        ? "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-2xs"
        : variant === "danger"
          ? "bg-red-600 hover:bg-red-700 text-white border border-transparent"
          : "bg-blue-600 hover:bg-blue-700 text-white border border-transparent shadow-xs"
    : hasBg
      ? ""
      : "bg-blue-600 hover:bg-blue-700 text-white border border-transparent shadow-xs";

  return (
    <button
      {...props}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-semibold rounded-xl px-4 py-2.5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] ${baseVariant} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;