import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../navigation/types";
import {useOrderDetail} from "../hooks/useOrderDetail";
import {ActivityIndicator, Text, View} from "react-native";

type OrderDetailProps = NativeStackScreenProps<RootStackParamsList, "OrderDetail">;

function OrderDetailScreen({ route }: OrderDetailProps) {

    const {orderId} = route.params;
    const {data: order, isLoading, isError} = useOrderDetail(orderId);

    if (isLoading) return <ActivityIndicator/>;

    if (isError || !order) return <Text>No se pudo cargar el pedido</Text>;

    return (
        <View>
            <Text>Pedido: #{order.id}</Text>
            <Text>Estado: {order.status}</Text>
            <Text>Total: {order.total}</Text>
        </View>
    )

}