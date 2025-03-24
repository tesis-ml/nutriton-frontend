import axiosClient from "@/config/axios.config";
import {AxiosResponse} from "axios";

// ------------------------------------------------------------

export type searchFoodRequestBody = {
    name?: string;
} & PageableDTO;

export type updateFoodRequestBody = {
    imageId: number;
    priceTierId: number;
    hasMeat: boolean;
    hasEggs: boolean;
    hasMilk: boolean;
    hasHoney: boolean;
    hasGluten: boolean;
    canBeADish: boolean;
};

// ------------------------------------------------------------

export async function assignFoodToUser() {
    const response = await axiosClient.instance.get('/food/assign');

    return response.data;
}

export async function updateFood(foodID: number, dto: updateFoodRequestBody) {
    const response = await axiosClient.instance.patch<Food>(`/food/${foodID}`, dto);

    return response.data;
}

export async function searchFood(dto: searchFoodRequestBody): Promise<AxiosResponse<{
    data: Food[],
    elements: number
}>> {

    const finalDTO = Object.fromEntries(
        Object.entries(dto).filter(([, v]) => v != null)
    );


    return await axiosClient.instance.get<{ data: Food[], elements: number }>('/food', {
        params: finalDTO
    });
}

export async function getFoodById(foodID: number): Promise<Food> {
    const response = await axiosClient.instance.get<Food>(`/food/${foodID}`);

    return response.data;
}