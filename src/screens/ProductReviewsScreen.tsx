import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackParamsList} from "../navigation/types";
import {useReviews} from "../store/useReviews";
import {ActivityIndicator, FlatList, Text} from "react-native";
import {ReviewCard} from "../components/ReviewCard";

export function ProductReviewsScreen({ route }: NativeStackScreenProps<HomeStackParamsList, "ProductReviews">) {

    const {productId} = route.params;
    const {data: reviews, isLoading} = useReviews(productId);

    if (isLoading) {
        return (<ActivityIndicator style={{flex: 1}} />);
    }

    return (
        <FlatList
            data={reviews}
            keyExtractor={(review) => review.id}
            renderItem={({ item }) => (<ReviewCard review={item}/>)}
            ListEmptyComponent={<Text style={{padding: 16}}>Aún no hay reseñas</Text>}
        />
    )
}