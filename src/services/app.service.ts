import axiosClient from "@/config/axios.config";


// ------------------------------------------------------------

export type createImageRequestBody = {
    name: string;
    src: string;
};

export type StatsResponse = {
    firstName: string;
    lastName: string;
    id: number;
    email: string;
    _count: { foodsEdited: number; imagesCreated: number; }
};

// ------------------------------------------------------------

export async function getPlatformStats() {
    const { data } = await axiosClient.instance.get<StatsResponse[]>('/users');

    const chartData = data.map((user) => ({
        name: `${user.firstName} ${user.lastName}`,
        id: user.id,
        email: user.email,
        foodsEdited: user._count.foodsEdited,
        imagesCreated: user._count.imagesCreated
    }));

    return chartData;
}

export async function getPriceTiers() {

    const response = await axiosClient.instance.get('/price-tiers');

    return response.data;
}

export async function getImages(params: PageableDTO) {
    const response = await axiosClient.instance.get('/images', {
        params
    });

    return response.data;
}

export async function createImage(requestBody: createImageRequestBody) {
    const response = await axiosClient.instance.post('/images', requestBody);

    return response.data;
}