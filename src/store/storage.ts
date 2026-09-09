import { createMMKV } from 'react-native-mmkv'

//export const storage = createMMKV();
export const storage = {
    getString: (key: any) => {
        return "{}"
    },
    set: (key: any, value: any) => console.log(key, value),
}
