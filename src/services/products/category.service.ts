import { api } from "@/lib/api"
import { Category } from "@/types";
import { CreateCategoryType } from "@/ui/dashboard/products/category/schemas/create-category-schema";
import { UpdateCategoryType } from "@/ui/dashboard/products/category/schemas/update-category-schema";

export type CreateCategoryResponse = {
    message: string;
    data: Category;
}

export type GetAllBrandsRespnse = {
    message: string;
    data: Category[];
}

export type DeleteCategoryResponse = {
    message: string;
    data: Category;
}

export const createCategory = async(data:CreateCategoryType):Promise<CreateCategoryResponse> => {
    const response = await api.post('/category', data );
    return response.data
}

export const updateCategory = async({categoryId, data}:{categoryId: string, data:UpdateCategoryType}) => {
    const response = await api.patch('/category', data, {
        params:{categoryId}
    });
    return response.data
}

export const getAllCategories = async():Promise<Category[]> => {
    const response = await api.get('/category' );
    return response.data.data
}

export const deleteCategory = async(categoryId: string):Promise<DeleteCategoryResponse> => {
    const response = await api.delete('/category', {
        params:{categoryId}
    });
    return response.data
}