import {Button, Text, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../navigation/types";

type HomeScreenProps = NativeStackScreenProps<RootStackParamsList, "Home">;

export function HomeScreen({ navigation }: HomeScreenProps) {

    return (
        <View>
            <Text>Home Screen</Text>
            <Button
                title="Ver Producto"
                onPress={() => navigation.navigate('ProductDetail', { productId: '123' })}
            />
        </View>
    )
}