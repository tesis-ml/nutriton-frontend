import { useQuery } from "@tanstack/react-query";
import { getPlatformStats } from "@/services/app.service.ts";

export const statKeys = { all: ['stats'] as const };

export const useStats = () => {
    return useQuery({
        queryKey: statKeys.all,
        queryFn: async () => {
            const result = await getPlatformStats();
            return result || [];
        },
    })
}