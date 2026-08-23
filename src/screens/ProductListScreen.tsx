import {useState} from "react";
import {useFetch} from "../hooks/useFetch";
import {Product} from "../components/ProductCard";
import {FlatList, View} from "react-native";

function ProductListScreen() {

    const {data: products, loading, error} = useFetch<Product[]>("https://api.example.com/products");

    if (loading) return <View />;

    if (error) return <View />;

    return <FlatList data={products} renderItem={null}/>

}