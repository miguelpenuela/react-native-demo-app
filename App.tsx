import { StyleSheet } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LinkingOptions, NavigationContainer} from "@react-navigation/native";
import {HomeScreen} from "./src/screens/HomeScreen";
import {ProfileScreen} from "./src/screens/ProfileScreen";
import {ProductDetailScreen} from "./src/screens/ProductDetailScreen";
import {HomeStackParamsList, RootStackParamsList, TabParamList} from "./src/navigation/types";
import {AuthProvider} from "./src/store/AuthContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ProductListScreen} from "./src/screens/ProductListScreen";
import {CartScreen, CartTabIcon} from "./src/screens/CartScreen";

//const Stack = createNativeStackNavigator();

const Stack = createNativeStackNavigator<RootStackParamsList>();

/*
casi ninguna app usa solo un tipo de navigator, lo típico: tabs como navegación principal, y cada
tab tiene su propio stack interno para poder "entrar en detalle" sin perder las pestañas
* */

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
const HomeStack = createNativeStackNavigator<HomeStackParamsList>();
const Tab = createBottomTabNavigator<TabParamList>();
const queryClient = new QueryClient();

function HomeStackNavigator() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="ProductList" component={ProductListScreen} options={{title: "Productos"}}/>
            <HomeStack.Screen name="ProductDetail" component={ProductDetailScreen} options={{title: "Detalle"}}/>
        </HomeStack.Navigator>
    )
}


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer linking={linking}>
        <Tab.Navigator>
          <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{title: "Tienda", headerShown: false}} />
          <Tab.Screen name="CartTab" component={CartScreen} options={{title: "Carrito", tabBarIcon: () => <CartTabIcon/>}} />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
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
