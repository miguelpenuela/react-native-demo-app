import {FlatList, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import {Product} from "../components/ProductCard";
import {useDebounce} from "../hooks/useDebounce";

export default function SearchScreen ({category}: {category: string}) {

    const [results, setResults] = useState<Product[]>([]);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 400); // Espera 400ms de silencio
    /*
    Ahora si el usuario escribe "audifonos", la petición no se dispara en cada letra, solo 400ms después
    de que deja de teclear
    * */

    useEffect(() => {
        if (debouncedQuery === "") return;
        //searchProducts(query, category).then(setResults);
    }, [query, category]);

    return (
        <View>
            <TextInput value={query} onChangeText={setQuery} />
            <FlatList data={results} renderItem={null}/>
        </View>
    )
}