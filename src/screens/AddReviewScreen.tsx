import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackParamsList} from "../navigation/types";
import {CameraView, useCameraPermissions} from "expo-camera";
import {useRef, useState} from "react";
import {useAddReview} from "../store/useReviews";
import {Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

type AddReviewProps = NativeStackScreenProps<HomeStackParamsList, "AddReview">;

export function AddReviewScreen({ route, navigation }: AddReviewProps)  {

    const { productId } = route.params;
    const [permission, requestPermission] = useCameraPermissions();
    const [photoUri, setPhotoUri] = useState<string|null>(null);
    const [comment, setComment] = useState<string>("");

    const cameraRef = useRef<CameraView>(null);
    const addReview = useAddReview();

    if (!permission?.granted) {
        return <Button title="Permitir cámara" onPress={requestPermission} />
    }

    async function takePhoto() {
        const photo = await cameraRef.current?.takePictureAsync({ quality: 0.7 });
        if (photo) {
            setPhotoUri(photo.uri)
        }
    }

    function handleSubmit() {
        if (!photoUri) return;

        addReview.mutate({
            id: Date.now().toString(),
            productId,
            photoUri,
            comment,
            createdAt: Date.now()
        });

        navigation.goBack();
    }

    if (!photoUri) {
        return (
            <View style={{flex: 1}}>
                <CameraView ref={cameraRef} style={{flex:1}} facing="back"/>
                <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
                    <Text style={{color: "white"}}>Tomar foto</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ padding: 16 }}>
            <Image source={{uri: photoUri}} style={{width:'100%', height:250,borderRadius:10}}/>
            <TextInput
                placeholder={"Escribe tu reseña"}
                value={comment}
                onChangeText={setComment}
                style={styles.input}
                multiline={true}
            />
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={addReview.isPending}
            >
                <Text style={{color:"white", fontWeight: "600"}}>
                    {addReview.isPending ? "Guardando..." : "Publicar reseña"}
                </Text>
            </TouchableOpacity>
        </View>
    )
    //return <Text>Hola</Text>
}

const styles = StyleSheet.create({
    captureButton: {
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
        backgroundColor: "#333",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginTop: 12,
        minHeight: 80,
        textAlignVertical: "top",
    },
    submitButton: {
        backgroundColor: "#333",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 16,
    },
})