import {Text, useWindowDimensions, View} from "react-native";
import {Product} from "./ProductCard";

/*
en vez de tamaños fijos en pixeles, es mejor calcular en base al tamaño real de
pantalla del dispositivo
* */
export function ProductGrid({products}: {products: Product[]}) {

    const { width } = useWindowDimensions();
    const numColumns = width > 600 ? 3 : 2;// tablet vs telefono
    const cardWidth = width / numColumns - 16; // resta márgenes

    return (
        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
            {products.map((p) => (
                <View key={p.id} style={{width: cardWidth}}>
                    <Text>{p.name}</Text>
                </View>
            ))}
        </View>
    )

}