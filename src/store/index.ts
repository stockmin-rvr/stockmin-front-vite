import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './slices/themeSlice';
import ownerReducer from './slices/ownerSlice';
import branchReducer from './slices/branchSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        owner: ownerReducer,
        branch: branchReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;