import {useQuery} from "@tanstack/react-query";
import {assignFoodToUser} from "@/services/food.service.ts";

export const foodAssignmentKeys = {main: ['foodAssignment'] as const}

// Custom hook to assign a food or get the previous one assigned
export const useAssignFood = () => {
    return useQuery({
        queryKey: foodAssignmentKeys.main,
        queryFn: () => assignFoodToUser(),
    })
}