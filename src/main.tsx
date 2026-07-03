import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "./components/ThemeProvider";
import AppRouter from "./routes/BrowserRouter";
import './index.css'
import ModalProvider from "./components/modal/ModalProvider";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ModalProvider>
          <AppRouter/>
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
