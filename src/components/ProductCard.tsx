import { useState } from "react";
import {Button, Image, Text, TouchableOpacity, View} from "react-native";
import {useToggle} from "../hooks/useToggle";

export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
}

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
}
/*
ejercicio: construye el layout de una tarjeta de producto simple que debe
verse asi:
- una fila horizontal
- a la izquierda: una imagen cuadrada de 80x80
- a la derecha: el nombre del producto arriba, y el precio abajo, alineados a la izquierda
- el bloque de texto debe estar centrado verticalmente respecto a la imagen
*/
export default function ProductCard({product, onAddToCart}: ProductCardProps) {

    const [quantity, setQuantity] = useState(1);

    const [isExpanded, toggleExpanded] = useToggle(false);

    return (
        <View>
            <TouchableOpacity onPress={toggleExpanded}>
                <Text>{isExpanded ? "Ver menos": "Ver más"}</Text>
            </TouchableOpacity>
            {isExpanded && (
                <View style={{flexDirection: "row", alignItems: "center", padding: 12}}>
                    <Image
                        source={{uri: product.imageUrl}}
                        style={{ width: 80, height: 80, borderRadius: 8}}
                    />
                    <View style={{flexDirection: "column", alignItems: "flex-start", marginLeft: 12}}>
                        <Text style={{fontSize: 16, fontWeight: "600"}}>{product.name}</Text>
                        <Text style={{fontSize: 14, color: "gray"}}>{product.price}</Text>
                    </View>
                </View>
            )}
        </View>
    )
}