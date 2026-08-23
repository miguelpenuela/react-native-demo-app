import {useEffect, useState} from "react";

export function useDebounce<T>(value: T, delayMs: number) {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delayMs);

        return () => {
            clearTimeout(timer); // cancela el timer anterior si "value" cambia antes de tiempo
        };

    }, [value, delayMs]);

    return debouncedValue;

}