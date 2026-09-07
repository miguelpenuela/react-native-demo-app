import {Button, FlatList, Text, TouchableOpacity, View} from "react-native";
import {useCartStore} from "../store/useCartStore";

export function CartScreen() {

    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <View style={{flex: 1, padding: 16}}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{display: "flex", flexDirection: "column", marginBottom: 16, borderWidth: 1, padding:10, borderRadius: 10}}>
                        <View>
                            <Text>{item.title} x {item.quantity}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => removeItem(item.id)}>
                                <Text style={{color: "red", textAlign: "right",padding:8}}>Quitar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <Text style={{fontSize: 18, fontWeight: "700", marginTop: 16}}>Total: ${total.toFixed(2)}</Text>
        </View>
    )
}

// Badge con la cantidad de items - solo se re-renderiza si cambia items-length
export function CartTabIcon() {
    const itemCount = useCartStore((state) => state.items.length);
    return (<Text>🛒 {itemCount > 0 ? itemCount : ""}</Text>)
}

/*
* la diferencia clave con context es que al hacer useCartStore((state) => state.items), el componente solo
* se re-renderiza si items especificamente cambia - no si cambia alguna otra parte del store
* */