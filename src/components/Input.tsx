import type { InputHTMLAttributes } from 'react';

function Input(props: InputHTMLAttributes<HTMLInputElement>) {

    return (
        <input {...props}
            className="w-2/3 px-1 border-solid border-2"
            style={{
                ...props.style
            }
            }></input>
    )
}
export default Input