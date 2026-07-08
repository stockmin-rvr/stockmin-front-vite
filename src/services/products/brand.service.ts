import { api } from "../../config/api";
import type { CreateBrandType } from "../../pages/dashboard/products/brand/forms/schemas/create-brand-schema";
import type { UpdateBrandType } from "../../pages/dashboard/products/brand/forms/schemas/update-brand-schema";
import type { Brand } from "../../types/models";

type CreateResponse = {
    message: string;
    data: Brand;
}

type UpdateResponse = {
    message: string;
    data: Brand;
}

type FindAllResponse = {
    message: string;
    data: Brand[];
}

type DeleteResponse = {
    message: string;
    data: Brand;
}

export const brandService = {
    create: async (data: CreateBrandType):Promise<CreateResponse> => {
        const response = await api.post('/brand', data);
        return response.data
    },
    update: async ({ brandId, data }: { brandId: string, data: UpdateBrandType }): Promise<UpdateResponse> => {
        const response = await api.patch('/brand', data, {
            params: { brandId }
        });
        return response.data
    },
    findAll: async (): Promise<FindAllResponse> => {
        const response = await api.get('/brand');
        return response.data
    },
    delete: async (brandId: string): Promise<DeleteResponse> => {
        const response = await api.delete('/brand', {
            params: { brandId }
        });
        return response.data
    }
}
