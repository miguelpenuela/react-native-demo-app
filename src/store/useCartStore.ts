import {create} from "zustand";
import {Product} from "../components/ProductCard";

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (product: string) => void;
    total: number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addItem: (product) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === product.id);
            if (existing) {
                return {
                    items: state.items.map((i) => i.id === product.id ? {...i, quantity: i.quantity + 1 } : i),
                }
            }
            return {items: [...state.items, {...product, quantity: 1}]}
        }),
    removeItem: (productId) =>
        set((state) => ({items: state.items.filter((i) => i.id !== productId)})),
    get total() {
        return get().items.reduce((sum, item) => sum + item.price, 0);
    }
}));