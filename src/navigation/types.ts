/*
paso de parámetros, se necesita tipar qué parámetros recibe cada pantalla
* */
export type RootStackParamsList = {
    Home: undefined, // no recibe parámetros
    HomeTab: undefined,
    ProductDetail: { productId: string }, // requiere productId
    Profile: { userId: string, fromScreen?: string  }, // fromScreen opcional
}