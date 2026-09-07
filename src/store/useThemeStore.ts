import { create } from "zustand";
import {storage} from "./storage";
import {createJSONStorage, persist} from "zustand/middleware/persist";

interface ThemeState {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const zustangStorage = {
    setItem: (name: string, value: string) => {storage.set(name, value)},
    getItem: (name: string) => storage.getString(name) ?? null,
    removeItem: (name: string) => {storage.remove(name)},
}

/*export const useThemeStore = create<ThemeState>((set) => ({
    isDarkMode: false,
    toggleTheme: () => set((state) => ({isDarkMode: !state.isDarkMode})),
}))*/
export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            isDarkMode: false,
            toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        }),
        {
            name: "theme-storage",
            storage: createJSONStorage(() => zustangStorage)
        }
    )
);
/*
con el middleware `persist`, tu store de zustand sobrevive a que el usuario cierre la app - se guarda automáticamente
en MMKV y se restaura al abrir de nuevo si código adicional en cada componente.
* */
