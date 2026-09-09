import {storage} from "./storage";
import {Review} from "../models/Review.interface";

export function getReviews(productId: string): Review[] {
    const raw = storage.getString(`reviews:${productId}`);
    return raw ? JSON.parse(raw) : [];
}

export function saveReview(review: Review) {
    const existing = getReviews(review.productId);
    const updated = [...existing, review];
    storage.set(`reviews:${review.productId}`, JSON.stringify(updated));
}
