import {create} from "zustand";

export interface CartItem {
    id: string;
    name: string;
    price: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (itemId: string) => void;
    total: number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addItem: (item) =>
        set((state) => ({items: [...state.items, item]})),
    removeItem: (itemId) =>
        set((state) => ({items: state.items.filter((i) => i.id !== itemId)})),
    get total() {
        return get().items.reduce((sum, item) => sum + item.price, 0);
    }
}));