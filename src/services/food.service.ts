import axiosClient from "@/config/axios.config";
import {AxiosResponse} from "axios";

// ------------------------------------------------------------

export type searchFoodRequestBody = {
    name: string;
} & PageableDTO;

export type updateFoodRequestBody = {
    imageId: number;
    priceTierId: number;
};

// ------------------------------------------------------------

export async function assignFoodToUser() {
    const response = await axiosClient.instance.get('/food/assign');

    return response.data;
}

export async function updateFood(foodID: number, dto: updateFoodRequestBody): Promise<Food> {
    const response = await axiosClient.instance.patch(`/food/${foodID}`, dto);

    return response.data;
}

export async function searchFood(dto: searchFoodRequestBody): Promise<AxiosResponse<{ data:Food[], elements: number }>> {

    return await axiosClient.instance.get<{ data:Food[], elements: number }>('/food', {
        params: {
            name: dto.name,
            page: dto.page,
            limit: dto.limit
        }
    });
}

export async function getFoodById(foodID: number): Promise<Food> {
    const response = await axiosClient.instance.get<Food>(`/food/${foodID}`);

    return response.data;
}