import {useQuery} from "@tanstack/react-query";
import {searchFood} from "@/services/food.service.ts";

export const allFoodKeys = {main: ['allFood'] as const}

// Custom hook to assign a food or get the previous one assigned
export const useAllFood = () => {
    return useQuery({
        queryKey: allFoodKeys.main,
        queryFn: () => searchFood({
            page: 1,
            limit: 500000
        }),
    })
}