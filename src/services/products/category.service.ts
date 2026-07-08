import { api } from "../../config/api";
import type { CreateCategoryType } from "../../pages/dashboard/products/category/forms/schemas/create-category-schema";
import type { UpdateCategoryType } from "../../pages/dashboard/products/category/forms/schemas/update-category-schema";
import type { Category } from "../../types/models";

export type CreateCategoryResponse = {
    message: string;
    data: Category;
}

export type FindAllCategoriesRespnse = {
    message: string;
    data: Category[];
}

export type DeleteCategoryResponse = {
    message: string;
    data: Category;
}

type FindAllResponse = {
    message: string;
    data: Category[];
}

export const categoryService = {
    create: async(data:CreateCategoryType):Promise<CreateCategoryResponse> => {
        const response = await api.post('/category', data );
        return response.data
    },
    update: async({categoryId, data}:{categoryId: string, data:UpdateCategoryType}) => {
        const response = await api.patch('/category', data, {
            params:{categoryId}
        });
        return response.data
    },
    findAll: async():Promise<FindAllResponse> => {
        const response = await api.get('/category' );
        return response.data
    },
    delete: async(categoryId: string):Promise<DeleteCategoryResponse> => {
        const response = await api.delete('/category', {
            params:{categoryId}
        });
        return response.data
    }
}
