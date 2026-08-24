import {Button, Text, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../../App";

type ProductDetailProps = NativeStackScreenProps<RootStackParamsList, "ProductDetail">;

export function ProductDetailScreen({ route }: ProductDetailProps) {

    const { productId } = route.params; // tipado automáticamente como string

    return (
        <View>
            <Text>Detalle del producto {productId}</Text>
        </View>
    )
}