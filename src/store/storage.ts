import { createMMKV } from 'react-native-mmkv'

export const storage = createMMKV();

// Guardar - sin await, es instantáneo
// storage.set("theme", JSON.stringify({ isDarkMode: true }));

// Leer - tambien sin await
//const raw = storage.getString("theme");
//const theme = raw ? JSON.parse(raw) : null;