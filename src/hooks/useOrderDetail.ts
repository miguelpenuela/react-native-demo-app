import {Product} from "../components/ProductCard";
import {useQuery} from "@tanstack/react-query";

export interface Order {
    id: string;
    status: string;
    total: number;
    items: Product[];
}

function fetchOrderById(orderId: string): Promise<Order> {
    return fetch(`https://api.example.com/orders/${orderId}`).then(res => res.json());
}

export function useOrderDetail(orderId: string) {
    return useQuery({
        queryKey: ["order", orderId],
        queryFn: () => fetchOrderById(orderId),
        enabled: !!orderId,
    })
}

/*
* Explicación:
- queryKey: ["order", orderId] - incluir `orderId` en la key hace que cada petición tenga su propia
entrada de caché
- enabled: !!orderId - convierte el string en booleano: true si tiene contenido, false si esta vacio ("") o undefined
esto evita que la query se dispare con una url rota como .../orders/ cuando `orderId` todavia no esta disponible
* */
