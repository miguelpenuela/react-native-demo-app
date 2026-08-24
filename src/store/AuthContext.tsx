import {UserProfile} from "../models/UserProfile.interface";
import {createContext, ReactNode, useContext, useState} from "react";

interface AuthContextType {
    user: UserProfile | null;
    login: (user: UserProfile) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);

    const login = (userData: UserProfile) => setUser(userData);

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// hook personalizado para consumir el contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within the AuthProvider");
    }
    return context;
}

/*
if (!context) throw, si alguien usa useAuth() fuera del AuthProvider, context será undefined
* */

/*
la trampa de context es que cuando su valor cambia, TODOS los componentes que lo consumen se
re-renderizan aunque solo les interese una parte pequeña del valor

regla practica:Context funciona bien para datos que cambian poco (usuario logueado, tema, idioma).
para estado que cambia frecuentemente (carrito de compras con actualizaciones constantes, filtros de
busqueda en tiempo real) es mejor una libreria dedicada
* */