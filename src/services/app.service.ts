import axiosClient from "@/config/axios.config";


// ------------------------------------------------------------

export type createImageRequestBody = {
    name: string;
    src: string;
};

export type getImagesRequestBody = {
    name: string;
} & PageableDTO;

export type StatsResponse = {
    firstName: string;
    lastName: string;
    id: number;
    email: string;
    _count: { foodsEdited: number; imagesCreated: number; }
};

// ------------------------------------------------------------

export async function getPlatformStats() {
    const {data} = await axiosClient.instance.get<StatsResponse[]>('/users');

    return data.map((user) => ({
        name: `${user.firstName} ${user.lastName}`,
        id: user.id,
        email: user.email,
        foodsEdited: user._count.foodsEdited,
        imagesCreated: user._count.imagesCreated
    }));
}

export async function getPriceTiers() {
    return await axiosClient.instance.get<{ id: number, name: string }[]>('/price-tiers').then(res => res.data);
}

export async function getFoodImages(params: getImagesRequestBody) {
    const response = await axiosClient.instance.get<{
        data: Image[],
        elements: number
    }>('/images', {params});

    return response.data;
}

export async function createImage(requestBody: createImageRequestBody) {
    const response = await axiosClient.instance.post('/images', requestBody);

    return response.data;
}