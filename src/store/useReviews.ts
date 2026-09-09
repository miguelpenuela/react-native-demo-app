import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Review} from "../models/Review.interface";
import {getReviews, saveReview} from "./reviewsStore";

export function useReviews(productId: string) {
    return useQuery({
        queryKey: ["reviews", productId],
        queryFn: () => getReviews(productId),
        enabled: !!productId,
    })
}

export function useAddReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (review: Review) => {
            saveReview(review);
            return review;
        },
        onSuccess: (review: Review) => {
            queryClient.invalidateQueries({
                queryKey: ["reviews", review.productId],
            })
        }
    })

}
