import {useThemeStore} from "../store/useThemeStore";
import {Switch, Text, View} from "react-native";

export function SettingsScreen() {

    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    return (
        <View style={{backgroundColor: isDarkMode ? '#000' : '#fff'}}>
            <Text style={{backgroundColor: isDarkMode ? '#fff' : '#000'}}>Modo Oscuro</Text>
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
    )
}