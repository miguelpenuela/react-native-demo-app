import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {HomeScreen} from "./src/screens/HomeScreen";
import {ProfileScreen} from "./src/screens/ProfileScreen";
import {ProductDetailScreen} from "./src/screens/ProductDetailScreen";
import {RootStackParamsList} from "./src/navigation/types";
import SearchScreen from "./src/screens/SearchScreen";

//const Stack = createNativeStackNavigator();

const Stack = createNativeStackNavigator<RootStackParamsList>();

/*
casi ninguna app usa solo un tipo de navigator, lo típico: tabs como navegación principal, y cada
tab tiene su propio stack interno para poder "entrar en detalle" sin perder las pestañas
* */

function HomeStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="HomeTab" component={HomeStack}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
