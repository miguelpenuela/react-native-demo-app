import { useState } from "react";
import {Button, Text, View} from "react-native";

interface Product {
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

    return (
        <View>
            <Text>{product.name} - ${product.price}</Text>
            <Button title="+" onPress={() => setQuantity(quantity + 1)}/>
            <Button title="Agregar" onPress={() => onAddToCart(product, quantity)}/>
        </View>
    )
}