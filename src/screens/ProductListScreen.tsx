import {useState} from "react";
import {useFetch} from "../hooks/useFetch";
import {Product} from "../components/ProductCard";
import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {useQuery} from "@tanstack/react-query";

function fetchProducts(): Promise<Product[]> {
    return fetch("https://api.example.com/products").then(res => res.json());
}

function ProductListScreen() {

    //const {data: products, loading, error} = useFetch<Product[]>("https://api.example.com/products");
    const {data: products, isLoading, isError, error} = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    })

    if (isLoading) return <ActivityIndicator/>;

    if (isError) return <Text>Something went wrong: {error.message}</Text>;

    return <FlatList data={products} renderItem={null}/>

}