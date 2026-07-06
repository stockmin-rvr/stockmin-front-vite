import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { LoadingScreen } from "../components/LoadingScreen";
import BranchPage from "../pages/branch/BranchPage";
import { useEffect } from "react";
import { refreshTokenOwner } from "../store/thunks/ownerThunk";
import RegisterBranchPage from "../pages/branch/register/RegisterBranchPage";
import type { Owner } from "../types/models";
import VerifyAccountPage from "../pages/auth/register/VerifyAccountPage";

export default function AppRouter() {
  const { loadingScreen } = useAppSelector(s => s.theme);
  const dispatch = useAppDispatch();
  const { owner } = useAppSelector((state) => state.owner);

  useEffect(() => {
    dispatch(refreshTokenOwner());
  }, [])

  if (loadingScreen) return <LoadingScreen />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="verify-account" element={<VerifyAccountPage />} />

        {/* Auth */}
        <Route element={<PublicRoute owner={owner}/>}>
          <Route path="/auth">
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>

        {/* Branch */}
        <Route element={<ProtectedRoute owner={owner} />}>
          <Route path="/branch">
            <Route index element={<Navigate to='list' replace />} />
            <Route path="list" element={<BranchPage />} />
            <Route path="register" element={<RegisterBranchPage />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

function PublicRoute({owner}:{owner:Owner|null}) {
  if (owner) {
    return <Navigate to="/branch/list" replace />;
  }
  return <Outlet />;
}

function ProtectedRoute({owner}:{owner:Owner|null}) {
  if (!owner) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
}