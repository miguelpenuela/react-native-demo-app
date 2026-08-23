import { useState } from "react";
import {Button, Text, TouchableOpacity, View} from "react-native";
import {useToggle} from "../hooks/useToggle";

export interface Product {
    id: string;
    name: string;
    price: number;
}

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductCard({product, onAddToCart}: ProductCardProps) {

    const [quantity, setQuantity] = useState(1);

    const [isExpanded, toggleExpanded] = useToggle(false);

    return (
        <View>
            <TouchableOpacity onPress={toggleExpanded}>
                <Text>{isExpanded ? "Ver menos": "Ver más"}</Text>
            </TouchableOpacity>
            {isExpanded && (
                <View>
                    <Text>{product.name} - ${product.price}</Text>
                    <Button title="+" onPress={() => setQuantity(quantity + 1)}/>
                    <Button title="Agregar" onPress={() => onAddToCart(product, quantity)}/>
                </View>
            )}
        </View>
    )
}