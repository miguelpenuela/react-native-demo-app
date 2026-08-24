import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {HomeScreen} from "./src/screens/HomeScreen";
import {ProfileScreen} from "./src/screens/ProfileScreen";
import {ProductDetailScreen} from "./src/screens/ProductDetailScreen";

//const Stack = createNativeStackNavigator();

/*
paso de parámetros, se necesita tipar qué parámetros recibe cada pantalla
* */
export type RootStackParamsList = {
  Home: undefined, // no recibe parámetros
  ProductDetail: { productId: string }, // requiere productId
  Profile: { userId: string, fromScreen?: string  }, // fromScreen opcional
}

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
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
