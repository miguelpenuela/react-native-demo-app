import {Review} from "../models/Review.interface";
import React from "react";
import {Image, Text, View} from "react-native";

export const ReviewCard = React.memo(({review}: {review: Review}) => {
    return (
        <View style={{flexDirection: "row", padding: 12, alignItems: "center"}}>
            <Image
                source={{uri: review.photoUri}}
                style={{width:60, height:60, borderRadius: 8 }}
            />
            <View style={{marginLeft: 12, flex: 1}}>
                <Text>{review.comment}</Text>
                <Text style={{color: "gray", fontSize: 12}}>
                    {new Date(review.createdAt).toLocaleDateString()}
                </Text>
            </View>
        </View>
    )
})