import type { InputHTMLAttributes } from "react";

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`px-3 py-2 border-2 border-gray-300 rounded-lg
        focus:outline-none focus:border-blue-500
        transition ${props.className ?? ""}`}
      style={{
        ...props.style,
      }}
    />
  );
}

export default Input;
