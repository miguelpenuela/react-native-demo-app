import {Button, FlatList, Text, View} from "react-native";
import {useCartStore} from "../store/useCartStore";

export function CartScreen() {

    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);

    return (
        <FlatList
            data={items}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.name}</Text>
                    <Button title="Quitar" onPress={() => removeItem(item.id)}/>
                </View>
            )}
        />
    )
}

/*
* la diferencia clave con context es que al hacer useCartStore((state) => state.items), el componente solo
* se re-renderiza si items especificamente cambia - no si cambia alguna otra parte del store
* */