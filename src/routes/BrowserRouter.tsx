import { BrowserRouter, Navigate, Route, Routes } from "react-router";

// =============================== AUTH ===============================
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";

export default function AppRouter() {

  // Aquí podrás usar hooks más adelante
  // const user = useAppSelector(state => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />}/>

        {/* Auth */}
        <Route path="/auth">
          <Route index element={<Navigate to="login" replace />}/>
          <Route path="login" element={<LoginPage />}/>
          <Route path="register" element={<RegisterPage />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}