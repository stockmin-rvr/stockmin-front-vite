import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  loadingScreen: boolean;
  isOpenNavbar:boolean;
}

const initialState: ThemeState = {
    theme: 'light',
    loadingScreen: false,
    isOpenNavbar: false,
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
        },
        toggleNavbar(state){
            state.isOpenNavbar = !state.isOpenNavbar; 
        }
    }
});

export const {
    setTheme,
    toggleTheme,
    setLoadingScreen,
    toggleNavbar
} = themeSlice.actions;

export default themeSlice.reducer;