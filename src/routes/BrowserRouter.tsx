import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { LoadingScreen } from "../components/LoadingScreen";
import BranchPage from "../pages/branch/BranchPage";
import { useEffect } from "react";
import { refreshTokenOwnerApi } from "../store/thunks/ownerThunk";
import RegisterBranchPage from "../pages/branch/register/RegisterBranchPage";
import type { Branch, Owner } from "../types/models";
import VerifyAccountPage from "../pages/auth/register/VerifyAccountPage";
import ResetPasswordPage from "../pages/auth/reset-password/ResetPasswordPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProductsPage from "../pages/dashboard/products/ProductsPage";
import ListProductPage from "../pages/dashboard/products/list/ListProductsPage";
import BrandProductPage from "../pages/dashboard/products/brand/BrandProductsPage";
import MeasurementUnitProductsPage from "../pages/dashboard/products/measurement-unit/MeasurementUnitProductsPage";
import CategoryProductsPage from "../pages/dashboard/products/category/CategoryProductsPage";

export default function AppRouter() {
  const { loadingScreen } = useAppSelector(s => s.theme);
  const dispatch = useAppDispatch();
  const { owner } = useAppSelector((state) => state.owner);
  const { branch } = useAppSelector((state) => state.branch);

  useEffect(() => {
    dispatch(refreshTokenOwnerApi());
  }, [])

  if (loadingScreen) return <LoadingScreen />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/verify-account" element={<VerifyAccountPage />} />

        {/* Auth */}
        <Route element={<PublicRoute owner={owner} branch={branch} />}>
          <Route path="/auth">
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
          </Route>
        </Route>

        {/* Branch */}
        <Route element={<ProtectedRoute owner={owner} />}>
          <Route path="/branch">
            <Route index element={<Navigate to='list' replace />} />
            <Route path="list" element={<BranchPage />} />
            <Route path="register" element={<RegisterBranchPage />} />
          </Route>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<Navigate to='products' replace />} />
            <Route path="products" element={<ProductsPage />}>
              <Route index element={<Navigate to='list' replace />} />
              <Route path="list" element={<ListProductPage />} />
              <Route path="brand" element={<BrandProductPage />} />
              <Route path="category" element={<CategoryProductsPage />} />
              <Route path="measurement-unit" element={<MeasurementUnitProductsPage />} />
            </Route>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

function PublicRoute({ owner, branch }: { owner: Owner | null, branch: Branch | null }) {
  if (owner) {
    if (branch) return <Navigate to="/dashboard" replace />;
    else return <Navigate to="/branch/list" replace />;
  }
  return <Outlet />;
}

function ProtectedRoute({ owner }: { owner: Owner | null }) {
  if (!owner) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
}