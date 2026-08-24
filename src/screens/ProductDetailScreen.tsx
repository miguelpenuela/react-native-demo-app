import {Button, Text, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../navigation/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {CartItem} from "../store/useCartStore";
import {Product} from "../components/ProductCard";

type ProductDetailProps = NativeStackScreenProps<RootStackParamsList, "ProductDetail">;

function addToCart(item: CartItem): Promise<void> {
    return fetch("https://api.example.com/cart", {
        method: "POST",
        body: JSON.stringify(item),
    }).then(() => undefined)
}

export function ProductDetailScreen({ product }: { product: Product }) {

    //const { productId } = route.params; // tipado automáticamente como string
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
            // invalida la caché del carrito para que se vuelva a pedir con datos frescos
            queryClient.invalidateQueries({queryKey: ["cart"]});
        },
    })

    return (
        <View>
            <Button
                title={mutation.isPending ? "Agregando..." : "Agregar al carrito"}
                onPress={() => mutation.mutate({id: product.id, name: product.name, price: product.price})}
                disabled={mutation.isPending}
            />
        </View>
    )
}