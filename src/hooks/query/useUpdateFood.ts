// Custom hook for updating a food
import {updateFood, updateFoodRequestBody} from "@/services/food.service.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {foodAssignmentKeys} from "@/hooks/query/useAssignFood.ts";
import {statKeys} from "@/hooks/query/useStats.ts";

export function useUpdateFood(foodId: number, reqBody: updateFoodRequestBody) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => updateFood(foodId, reqBody),
        onSuccess: async (data) => {
            console.log('Food updated successfully:', data);
            await queryClient.invalidateQueries({queryKey: foodAssignmentKeys.main});
            await queryClient.invalidateQueries({queryKey: statKeys.all});
            return data;
        },
        onError: (error) => {
            console.error('Error creating image:', error.message);
        },
    });
}