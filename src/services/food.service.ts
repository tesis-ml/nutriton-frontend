import axiosClient from "@/config/axios.config";

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

export async function searchFood(dto: searchFoodRequestBody): Promise<Food[]> {

    const response = await axiosClient.instance.get('/food', {
        params: {
            name: dto.name,
            page: dto.page,
            limit: dto.limit
        }
    });

    return response.data;
}

export async function getFoodById(foodID: number): Promise<Food> {
    const response = await axiosClient.instance.get<Food>(`/food/${foodID}`);

    return response.data;
}