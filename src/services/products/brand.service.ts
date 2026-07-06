import { api } from "@/lib/api"
import { Brand } from "@/types";
import { CreateBrandType } from "@/ui/dashboard/products/brand/schemas/create-brand-schema"
import { UpdateBrandType } from "@/ui/dashboard/products/brand/schemas/update-brand-schema";

export type CreateBrandResponse = {
    message: string;
    data: Brand;
}

export type GetAllBrandsRespnse = {
    message: string;
    data: Brand[];
}

export type DeleteBrandResponse = {
    message: string;
    data: Brand;
}

export const createBrand = async(data:CreateBrandType) => {
    const response = await api.post('/brand', data );
    return response.data
}

export const updateBrand = async({brandId, data}:{brandId: string, data:UpdateBrandType}) => {
    const response = await api.patch('/brand', data, {
        params:{brandId}
    });
    return response.data
}

export const getAllBrands = async():Promise<Brand[]> => {
    const response = await api.get('/brand' );
    return response.data.data
}

export const deleteBrand = async(brandId: string):Promise<DeleteBrandResponse> => {
    const response = await api.delete('/brand', {
        params:{brandId}
    });
    return response.data
}