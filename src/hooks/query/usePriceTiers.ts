import { getPriceTiers } from "@/services/app.service";
import { useQuery } from "@tanstack/react-query";

export const usePriceTiers = () => {
    return useQuery({
        queryKey: ['priceTiers'],
        queryFn: () => getPriceTiers(),
    })
}