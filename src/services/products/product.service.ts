import { api } from "../../config/api";
import type { CreateProductType } from "../../pages/dashboard/products/list/forms/schemas/create-product-schema";
import type { UpdateProductType } from "../../pages/dashboard/products/list/forms/schemas/update-product-schema";
import type { Product } from "../../types/models";


type CreateResponse = {
    data: Product,
    message: string
}

type UpdateResponse = {
    data: Product,
    message: string
}

type FindAllResponse = {
    data: Product[],
    message: string
}

type DeleteResponse = {
    message: string;
}

export const productService = {
    findAll: async (): Promise<FindAllResponse> => {
        const response = await api.get('/product');
        return response.data
    },
    create: async (data: CreateProductType, file?: File | null): Promise<CreateResponse> => {
        const { brandId, categoryId, measurementUnitCode, code, name, description, active } = data;
        const formData = new FormData();

        formData.append('brandId', brandId);
        formData.append('categoryId', categoryId);
        formData.append('measurementUnitCode', measurementUnitCode);
        formData.append('code', code);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('active', active ? "true" : "false");
        if (file) formData.append('file', file);

        const response = await api.post("/product", formData);
        return response.data;
    },
    update: async (productId: string, data: UpdateProductType, file?: File | null): Promise<UpdateResponse> => {
        const { brandId, categoryId, measurementUnitCode, code, name, description, active } = data;
        const formData = new FormData();

        formData.append('brandId', brandId);
        formData.append('categoryId', categoryId);
        formData.append('measurementUnitCode', measurementUnitCode);
        formData.append('code', code);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('active', active ? "true" : "false");
        if (file) formData.append('file', file);

        const response = await api.patch("/product", formData, {
            params: { productId }
        });
        return response.data;
    },
    delete: async (productId: string): Promise<DeleteResponse> => {
        const response = await api.delete('/product', {
            params: { productId }
        });
        return response.data
    }
}