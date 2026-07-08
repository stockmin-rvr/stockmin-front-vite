import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './slices/themeSlice';
import ownerReducer from './slices/ownerSlice';
import branchReducer from './slices/branchSlice';
import productsReducer from './slices/productsSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        owner: ownerReducer,
        branch: branchReducer,
        products: productsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;