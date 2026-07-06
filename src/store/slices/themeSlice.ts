import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  loadingScreen: boolean
}

const initialState: ThemeState = {
    theme: 'light',
    loadingScreen: false
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<Theme>){
            state.theme = action.payload
        },
        toggleTheme(state) {
            state.theme = state.theme === 'light'? 'dark':'light';
        },
        setLoadingScreen(state, action: PayloadAction<boolean>){
            state.loadingScreen = action.payload;
        }
    }
});

export const {
    setTheme,
    toggleTheme,
    setLoadingScreen
} = themeSlice.actions;

export default themeSlice.reducer;