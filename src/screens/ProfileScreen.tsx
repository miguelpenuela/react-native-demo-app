import {UserProfile} from "../models/UserProfile.interface";
import {Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {useState} from "react";

export function ProfileScreen() {

    const { width } = useWindowDimensions();
    const isTablet = width > 600;

    const avatarSize = isTablet ? 140 : 100;
    const contentMaxWidth = isTablet ? 500 : width; // limita ancho en tablets

    const [user, setUser] = useState<UserProfile>({
        id: '0',
        name: 'Felipe Garzon',
        avatarUrl: 'dummy',
        bio: 'Hello, this is my Bio',
        stats: {
            posts: 10,
            followers: 20,
            following: 30
        }
    });

    return (
        <View style={[styles.container, { maxWidth: contentMaxWidth, alignSelf: "center"}]}>
            <View style={styles.header}>
                <Image
                    source={{ uri: user.avatarUrl}}
                    style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize/2 }}
                />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.bio}>{user.bio}</Text>
            </View>
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.stats.posts}</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.stats.followers}</Text>
                    <Text style={styles.statLabel}>Seguidores</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.stats.following}</Text>
                    <Text style={styles.statLabel}>Siguiendo</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar perfil</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    header: {
        alignItems: "center",
        marginBottom: 24
    },
    name: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 12
    },
    bio: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
        marginTop: 4
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-around", // reparte los items con espacio uniforme
        marginBottom: 24,
        borderTopWidth: 1,
        borderColor: "#EEE",
        paddingVertical: 16
    },
    statItem: {
        alignItems: "center" // centra numero y label horizontalmente
    },
    statNumber: {
        fontSize: 10,
        fontWeight: "700",
    },
    statLabel: {
        fontSize: 12,
        color: "gray",
        marginTop: 2
    },
    editButton: {
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: "center",
    },
    editButtonText: {
        fontSize: 14,
        fontWeight: "600",
    }
})