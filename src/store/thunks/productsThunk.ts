import type { AppDispatch } from ".."
import { getMessageErrorApi } from "../../config/api";
import type { CreateBrandType } from "../../pages/dashboard/products/brand/forms/schemas/create-brand-schema";
import type { UpdateBrandType } from "../../pages/dashboard/products/brand/forms/schemas/update-brand-schema";
import type { CreateCategoryType } from "../../pages/dashboard/products/category/forms/schemas/create-category-schema";
import type { UpdateCategoryType } from "../../pages/dashboard/products/category/forms/schemas/update-category-schema";
import { brandService } from "../../services/products/brand.service";
import { categoryService } from "../../services/products/category.service";
import { measurementUnitService } from "../../services/products/measurement-unit.service";
import { createBrand, createCategory, createMeasurementUnit, deleteBrand, deleteCategory, deleteMeasurementUnit, resetResponseProducts, setBrands, setCategories, setLoadingActionProducts, setLoadingProducts, setMeasurementUnits, setResponseProducts, updateBrand, updateCategory } from "../slices/productsSlice"

// ===================== BRANDS =====================
export const findAllBrandsApi = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(resetResponseProducts());
            dispatch(setLoadingProducts(true));
            const response = await brandService.findAll();
            dispatch(setBrands(response.data));
        } catch (error) {
            console.log(error);            
        }finally{
            dispatch(setLoadingProducts(false));
        }
    }
}

export const createBrandApi = (data: CreateBrandType) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingActionProducts(true));
            const response = await brandService.create(data);
            dispatch(createBrand(response.data));
            dispatch(setResponseProducts({type:'success', message: response.message})); 
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseProducts({type:'error', message}));         
        }finally{
            dispatch(setLoadingActionProducts(false));
            setTimeout(() => {
                dispatch(resetResponseProducts())
            }, 5000);
        }
    }
}

export const updateBrandApi = ({index, brandId, data}:{index: number, brandId: string, data: UpdateBrandType}) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingActionProducts(true));
            const response = await brandService.update({brandId, data});
            dispatch(updateBrand({index, data:response.data}));
            dispatch(setResponseProducts({type:'success', message: response.message})); 
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseProducts({type:'error', message}));         
        }finally{
            dispatch(setLoadingActionProducts(false));
            setTimeout(() => {
                dispatch(resetResponseProducts())
            }, 5000);
        }
    }
}

export const deleteBrandApi = ({index, brandId}:{index: number, brandId: string}) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingActionProducts(true));
            const response = await brandService.delete(brandId);
            dispatch(deleteBrand(index));
            dispatch(setResponseProducts({type:'success', message: response.message})); 
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseProducts({type:'error', message}));         
        }finally{
            dispatch(setLoadingActionProducts(false));
        }
    }
}

// ===================== CATEGORIES =====================
export const findAllCategoriesApi = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(resetResponseProducts());
            dispatch(setLoadingActionProducts(true));
            const response = await categoryService.findAll();
            dispatch(setCategories(response.data));
        } catch (error) {
            console.log(error);            
        }finally{
            dispatch(setLoadingActionProducts(false));
        }
    }
}

export const createCategoryApi = (data: CreateCategoryType) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingActionProducts(true));
            const response = await categoryService.create(data);
            dispatch(createCategory(response.data));
            dispatch(setResponseProducts({type:'success', message: response.message})); 
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseProducts({type:'error', message}));         
        }finally{
            dispatch(setLoadingActionProducts(false));
            setTimeout(() => {
                dispatch(resetResponseProducts())
            }, 5000);
        }
    }
}

export const updateCategoryApi = ({index, categoryId, data}:{index: number, categoryId: string, data: UpdateCategoryType}) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingActionProducts(true));
            const response = await categoryService.update({categoryId, data});
            dispatch(updateCategory({index, data: response.data}));
            dispatch(setResponseProducts({type:'success', message: response.message})); 
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseProducts({type:'error', message}));         
        }finally{
            dispatch(setLoadingActionProducts(false));
            setTimeout(() => {
                dispatch(resetResponseProducts())
            }, 5000);
        }
    }
}

export const deleteCategoryApi = ({index, categoryId}:{index: number, categoryId: string}) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingActionProducts(true));
            const response = await categoryService.delete(categoryId);
            dispatch(deleteCategory(index));
            dispatch(setResponseProducts({type:'success', message: response.message})); 
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseProducts({type:'error', message}));         
        }finally{
            dispatch(setLoadingActionProducts(false));
        }
    }
}

// ===================== MEASUREMENT UNITS =====================
export const findAllMeasurementUnitsApi = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(resetResponseProducts());
            dispatch(setLoadingActionProducts(true));
            const response = await measurementUnitService.findAll();
            dispatch(setMeasurementUnits(response.data));
        } catch (error) {
            console.log(error);            
        }finally{
            dispatch(setLoadingActionProducts(false));
        }
    }
}

export const createMeasurementUnitApi = ({index, code}: {index: number, code: string}) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingActionProducts(true));
            const response = await measurementUnitService.create({code});
            dispatch(createMeasurementUnit({index, data:response.data}));
        } catch (error) {
            const message = getMessageErrorApi(error);
            console.log(message);       
        }finally{
            dispatch(setLoadingActionProducts(false));
        }
    }
}

export const deleteMeasurementUnitApi = ({index, unitId}: {index: number, unitId: string}) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingActionProducts(true));
            const response = await measurementUnitService.delete(unitId);
            dispatch(deleteMeasurementUnit({index, data:response.data}));
        } catch (error) {
            const message = getMessageErrorApi(error);
            console.log(message);       
        }finally{
            dispatch(setLoadingActionProducts(false));
        }
    }
}