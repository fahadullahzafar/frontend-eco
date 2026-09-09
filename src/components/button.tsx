import type { ButtonHTMLAttributes } from "react";

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
      <button
        {...props}
        className={`${props.className ?? ""} hover:bg-blue-200  disabled:bg-amber-50`}
        style={{
          padding: "10px",
          border: "2.5px solid",
          cursor: props.disabled ? "not-allowed" : "pointer",
          margin: "2px",
          ...props.style,
        }}
      >
        {props.children}
      </button>
    );
}

export default Button;