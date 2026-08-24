import {useState} from "react";
import {useFetch} from "../hooks/useFetch";
import {Product} from "../components/ProductCard";
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useQuery} from "@tanstack/react-query";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackParamsList} from "../navigation/types";
import {useProducts} from "../store/useProducts";

function fetchProducts(): Promise<Product[]> {
    return fetch("https://api.example.com/products").then(res => res.json());
}

type ProductListProps = NativeStackScreenProps<HomeStackParamsList, "ProductList">;

// @ts-ignore
export function ProductListScreen({navigation}) {

    //const {data: products, loading, error} = useFetch<Product[]>("https://api.example.com/products");
    /*const {data: products, isLoading, isError, error} = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    })*/
    const {data: products, isLoading, isError} = useProducts();

    if (isLoading) return <ActivityIndicator style={{flex: 1}}/>;

    if (isError) return <Text>Error al cargar productos</Text>;

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ProductDetail", {productId: item.id})}>
                    <Image source={{uri: item.image}} style={styles.thumbnail}/>
                    <View style={styles.info}>
                        <Text numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )

}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12
    },
    thumbnail: {
        width: 60,
        height: 60,
    },
    info: {
        marginLeft: 12,
        flex: 1
    },
    price: {
        color: "gray",
        marginTop: 4
    }
})