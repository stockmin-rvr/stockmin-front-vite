import type { AppDispatch } from ".."
import { getMessageErrorApi } from "../../config/api"
import type { LoginType } from "../../pages/auth/login/form/schemas/login-schema"
import type { CreateOwnerType } from "../../pages/auth/register/form/schema/register-schema"
import { ownerService } from "../../services/auth/owner.service"
import { setOwnerResponse, setOwnerLoading, setOwner, setVerificationOwner, resetVerificationOwner, resetOwner } from "../slices/ownerSlice"
import { setLoadingScreen } from "../slices/themeSlice"


export const createOwner = (data: CreateOwnerType) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setOwnerLoading(true));
            const owner = await ownerService.create(data);
            dispatch(setOwnerResponse({ message: owner.message, type: 'success' }));
        } catch (error: any) {
            const message = getMessageErrorApi(error);
            dispatch(setOwnerResponse({ message, type: 'error' }));
        } finally {
            dispatch(setOwnerLoading(false));
        }
    }
}

export const loginOwner = (data: LoginType) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setOwnerLoading(true));
            const response = await ownerService.login(data);
            dispatch(setOwner(response.owner));
            dispatch(setVerificationOwner(response.verification));
        } catch (error: any) {
            const message = getMessageErrorApi(error);
            dispatch(setOwnerResponse({ message, type: 'error' }));
        } finally {
            dispatch(setOwnerLoading(false));
        }
    }
}

export const logoutOwner = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(resetVerificationOwner());
        dispatch(resetOwner());
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }
}

export const refreshTokenOwner = () => {
    return async (dispatch: AppDispatch) => {
        const refresh_token = localStorage.getItem('refresh_token');
        if (!refresh_token) return;
        try {
            dispatch(setLoadingScreen(true));
            const response = await ownerService.refreshToken({ refresh_token });
            dispatch(setOwner(response.owner));
            dispatch(setVerificationOwner(response.verification));
        } catch (error: any) {
            const message = getMessageErrorApi(error);
            dispatch(setOwnerResponse({ message, type: 'error' }));
        } finally {
            dispatch(setLoadingScreen(false));
        }
    }
}

export const verifyAccountOwner = (data: { email: string, code: string }) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setOwnerLoading(true));
            const response = await ownerService.verifyAccount(data);
            dispatch(setOwnerResponse({ message: response.message, type: 'success' }));
            dispatch(setVerificationOwner(response.data));
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setOwnerResponse({ message, type: 'error' }));
        } finally {
            dispatch(setOwnerLoading(false));
        }
    }
}

export const resentVerificationOwner = (data: { ownerId: string, email: string }) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setOwnerLoading(true));
            const response = await ownerService.resentVerification(data);
            dispatch(setOwnerResponse({ message: response.message, type: 'success' }));
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setOwnerResponse({ message, type: 'error' }));
        } finally {
            dispatch(setOwnerLoading(false));
        }
    }
}

export const requestResetPasswordOwner = (data: { email: string }) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setOwnerLoading(true));
            const response = await ownerService.requestResetPassword(data);
            dispatch(setOwnerResponse({ message: response.message, type: 'success' }));
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setOwnerResponse({ message, type: 'error' }));
        } finally {
            dispatch(setOwnerLoading(false));
        }
    }
}