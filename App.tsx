import { StyleSheet } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LinkingOptions, NavigationContainer} from "@react-navigation/native";
import {HomeScreen} from "./src/screens/HomeScreen";
import {ProfileScreen} from "./src/screens/ProfileScreen";
import {ProductDetailScreen} from "./src/screens/ProductDetailScreen";
import {RootStackParamsList} from "./src/navigation/types";
import {AuthProvider} from "./src/store/AuthContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

/*
configurar linking para conectar las url con tus pantallas ya definidas,
con esta configuración:
- miapp://product/123 -> abre ProductDetail con route.params.productId === "123"
* */
const linking: LinkingOptions<RootStackParamsList> = {
    prefixes: ["mirnapp://", "https://myrnapp.com"], // scheme propio + dominio web
    config: {
        screens: {
            Home: "home",
            ProductDetail: "productDetail/:productId",
        }
    }
}

const queryClient = new QueryClient();

export default function App() {
  return (
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <NavigationContainer linking={linking}>
              <Stack.Navigator>
                <Stack.Screen name="Profile" component={ProfileScreen}/>
                <Stack.Screen name="HomeTab" component={HomeStack}/>
              </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
      </AuthProvider>
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
