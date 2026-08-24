import {Product} from "../components/ProductCard";
import {useQuery} from "@tanstack/react-query";

function fetchProducts(): Promise<Product[]> {
    return fetch("https://fakestoreapi.com/products").then((res) => res.json());
}

function fetchProductById(id: string): Promise<Product> {
    return fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json());
}

export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts
    });
}

export function useProduct(productId: string) {
    return useQuery({
        queryKey: ["products", productId],
        queryFn: () => fetchProductById(productId),
        enabled: !!productId,
    })
}
