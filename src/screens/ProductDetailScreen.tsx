import {ActivityIndicator, Button, Image, Text, TouchableOpacity, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackParamsList} from "../navigation/types";
import {useCartStore} from "../store/useCartStore";
import {useProduct} from "../store/useProducts";

type ProductDetailProps = NativeStackScreenProps<HomeStackParamsList, "ProductDetail">;

export function ProductDetailScreen({ route, navigation }: ProductDetailProps) {

    const { productId } = route.params;
    const { data: product, isLoading } = useProduct(productId);
    const addItem = useCartStore((state) => state.addItem);

    if (isLoading || !product) return <ActivityIndicator style={{flex: 1}}/>;

    return (
        <View style={{padding: 16}}>
            <Image source={{uri: product.image}} style={{width: "100%", height: 250}}/>
            <Text style={{fontSize: 18, fontWeight: "700", marginTop: 12}}>{product.title}</Text>
            <Text style={{fontSize: 16, color: "gray", marginTop: 4}}>${product.price}</Text>

            <TouchableOpacity
                style={{backgroundColor: "#333", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 20}}
                onPress={() => addItem(product)}
            >
                <Text style={{color: "white", fontWeight: "600"}}>Agregar al carrito</Text>
            </TouchableOpacity>

            <View style={{marginTop: 16, display: "flex", flexDirection: "row"}}>
                <View style={{flex: 1, padding: 10}}>
                    <Button
                        title={"Ver reseñas"}
                        onPress={() => navigation.navigate("ProductReviews", {productId: product.id})}
                    />
                </View>
                <View style={{flex: 1, padding: 10}}>
                    <Button
                        title={"Dejar reseña"}
                        onPress={() => navigation.navigate("AddReview", {productId: product.id})}
                    />
                </View>
            </View>
        </View>
    )
}