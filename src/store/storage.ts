import { createMMKV } from 'react-native-mmkv'
import {Review} from "../models/Review.interface";

export const storage = createMMKV();

// Guardar - sin await, es instantáneo
// storage.set("theme", JSON.stringify({ isDarkMode: true }));

// Leer - tambien sin await
//const raw = storage.getString("theme");
//const theme = raw ? JSON.parse(raw) : null;

export function getReviews(productId: string): Review[] {
    const raw = storage.getString(`reviews:${productId}`);
    return raw ? JSON.parse(raw) : [];
}

export function saveReview(review: Review) {
    const existing = getReviews(review.productId);
    const updated = [...existing, review];
    storage.set(`reviews:${review.productId}`, JSON.stringify(updated));
}
