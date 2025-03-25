import {useQuery} from "@tanstack/react-query";
import {searchFood, searchFoodRequestBody} from "@/services/food.service.ts";

export const userHistoryKeys = {main: ['userHistory'] as const}

// Custom hook to assign a food or get the previous one assigned
export const useUserHistory = (dto: searchFoodRequestBody) => {
    return useQuery({
        queryKey: userHistoryKeys.main,
        queryFn: () => searchFood(dto),
    })
}