import { api } from "../../config/api";
import type { CreateProductType } from "../../pages/dashboard/products/list/forms/schemas/create-product-schema";
import type { Product } from "../../types/models";


type CreateResponse = {
    data: Product,
    message: string
}

export const productService = {
    create: async (data: CreateProductType, file?: File | null): Promise<CreateResponse> => {
            const { brandId, categoryId, measuremetUnitCode, code, name, description, active} = data;
            const formData = new FormData();
    
            formData.append('brandId', brandId);
            formData.append('categoryId', categoryId);
            formData.append('measuremetUnitCode', measuremetUnitCode);
            formData.append('code', code);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('active', active ? "true" : "false");
            if (file) formData.append('file', file);
    
            const response = await api.post("/product", formData);
            return response.data;
        },
}