import { useState } from "react";

import Button from "./button";

interface CounterProps {
    initialValue?: number;
    minValue?: number;
    maxValue?: number;
}

function Counter({ initialValue = 1, minValue = 1, maxValue = Infinity }: CounterProps) {
    const [value, setValue] = useState<number>(initialValue)
    return (
        <div className="flex flex-row items-center justify-center ">
            <Button className="w-1/3" disabled={value <= minValue} onClick={() => setValue(Math.max(minValue, value - 1))}>-</Button >
            <span className="w-1/3 flex justify-center p-10">{value}</span>
            <Button className="w-1/3" disabled={value >= maxValue} onClick={() => setValue(Math.min(maxValue, value + 1))}>+</Button>
        </div >
    )
}
export default Counter