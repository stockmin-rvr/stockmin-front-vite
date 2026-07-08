import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Brand, Category, MeasurementUnit } from "../../types/models"
import type { ResponseMessageType } from "../../types/api";


type ProductsState = {
    products: Brand[],
    brands: Brand[],
    categories: Category[],
    measurementUnits: MeasurementUnit[]
    loading: boolean,
    loadingAction: boolean,
    responseMessage: ResponseMessageType,
}

const initialState: ProductsState = {
    products:[],
    brands:[],
    categories:[],
    measurementUnits:[],
    loading: false,
    loadingAction: false,
    responseMessage: {message:'', type: null}
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // ===================== PRODUCTS =====================
        setProducts: (state, action: PayloadAction<Brand[]>) => {
            state.brands = [...action.payload];
        },
        // ===================== BRANDS =====================
        setBrands: (state, action: PayloadAction<Brand[]>) => {
            state.brands = [...action.payload];
        },
        createBrand: (state, action: PayloadAction<Brand>) => {
            state.brands = [...state.brands, action.payload];
        },
        updateBrand: (state, action: PayloadAction<{index: number, data: Brand}>) => {
            state.brands[action.payload.index] = action.payload.data;
        },
        deleteBrand: (state, action: PayloadAction<number>) => {
            state.brands.splice(action.payload, 1);
        },
        // ===================== CATEGORIES =====================
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = [...action.payload];
        },
        createCategory: (state, action: PayloadAction<Category>) => {
            state.categories = [...state.categories, action.payload];
        },
        updateCategory: (state, action: PayloadAction<{index: number, data: Category}>) => {
            state.categories[action.payload.index] = action.payload.data;
        },
        deleteCategory: (state, action: PayloadAction<number>) => {
            state.categories.splice(action.payload, 1);
        },
        // ===================== MEASUREMENT UNITS =====================
        setMeasurementUnits: (state, action: PayloadAction<MeasurementUnit[]>) => {
            state.measurementUnits = [...action.payload];
        },
        createMeasurementUnit: (state, action: PayloadAction<{index: number, data: MeasurementUnit}>) => {
            state.measurementUnits[action.payload.index] = action.payload.data;
        },
        deleteMeasurementUnit: (state, action: PayloadAction<{index: number, data: MeasurementUnit}>) => {
            state.measurementUnits[action.payload.index] = action.payload.data;
        },
        // ===================== OTHERS =====================
        setLoadingProducts: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setLoadingActionProducts: (state, action: PayloadAction<boolean>) => {
            state.loadingAction = action.payload;
        },
        setResponseProducts(state, action: PayloadAction<ResponseMessageType>){
            state.responseMessage = action.payload
        },
        resetResponseProducts(state){
            state.responseMessage = {message: '', type: null}
        }
    }
});

export const {
    setProducts,

    setBrands,
    createBrand,
    updateBrand,
    deleteBrand,

    setCategories,
    createCategory,
    updateCategory,
    deleteCategory,

    setMeasurementUnits,
    createMeasurementUnit,
    deleteMeasurementUnit,
    
    setLoadingProducts,
    setLoadingActionProducts,
    setResponseProducts,
    resetResponseProducts
} = productsSlice.actions;

export default productsSlice.reducer;