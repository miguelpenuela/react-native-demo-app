import {useCallback, useState} from "react";

export function useToggle(initialValue: boolean = false) {
    const [value, setValue] = useState<boolean>(initialValue);

    const toggle = useCallback(() => {
        setValue((prevValue) => !prevValue);
        /*
        se usa la forma funcional setValue((prevValue) => !prevValue); en lugar de setValue(!value),
        importante, asi toggle no depende de value para funcionar correctamente, por el eso el array de
        dependencias de useCallback puede quedar vacio [] ya que la función nunca necesita "recrearse"
        * */
    }, []);

    return [value, toggle] as const;
    /*
    el `as const` le dice a Ts "esto es una tupla de tamaño fijo `[boolean, () => void]`, no un array
    genérico, sin esto, Ts no sabría distinguir cuál posición es el booleano y cual la función al hacer
    destructuring
    * */
}