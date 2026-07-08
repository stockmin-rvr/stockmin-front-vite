import type { AppDispatch } from ".."
import { getMessageErrorApi } from "../../config/api"
import type { LoginType } from "../../pages/auth/login/form/schemas/login-schema"
import type { CreateOwnerType } from "../../pages/auth/register/form/schema/register-schema"
import { ownerService } from "../../services/auth/owner.service"
import { setResponseOwner, setLoadingOwner, setOwner, setVerificationOwner, resetVerificationOwner, resetOwner, resetResponseOwner } from "../slices/ownerSlice"
import { setLoadingScreen } from "../slices/themeSlice"


export const createOwnerApi = (data: CreateOwnerType) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingOwner(true));
            const owner = await ownerService.create(data);
            dispatch(setResponseOwner({ message: owner.message, type: 'success' }));
        } catch (error: any) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseOwner({ message, type: 'error' }));
        } finally {
            dispatch(setLoadingOwner(false));
        }
    }
}

export const loginOwnerApi = (data: LoginType) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingOwner(true));
            const response = await ownerService.login(data);
            dispatch(setOwner(response.owner));
            dispatch(setVerificationOwner(response.verification));
        } catch (error: any) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseOwner({ message, type: 'error' }));
        } finally {
            dispatch(setLoadingOwner(false));
        }
    }
}

export const logoutOwnerApi = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(resetVerificationOwner());
        dispatch(resetOwner());
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }
}

export const refreshTokenOwnerApi = () => {
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
            dispatch(setResponseOwner({ message, type: 'error' }));
        } finally {
            dispatch(setLoadingScreen(false));
        }
    }
}

export const verifyAccountOwnerApi = (data: { email: string, code: string }) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingOwner(true));
            const response = await ownerService.verifyAccount(data);
            dispatch(setResponseOwner({ message: response.message, type: 'success' }));
            dispatch(setVerificationOwner(response.data));
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseOwner({ message, type: 'error' }));
        } finally {
            dispatch(setLoadingOwner(false));
        }
    }
}

export const resentVerificationOwnerApi = (data: { ownerId: string, email: string }) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingOwner(true));
            const response = await ownerService.resentVerification(data);
            dispatch(setResponseOwner({ message: response.message, type: 'success' }));
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseOwner({ message, type: 'error' }));
        } finally {
            dispatch(setLoadingOwner(false));
        }
    }
}

export const requestResetPasswordOwnerApi = (data: { email: string }) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingOwner(true));
            const response = await ownerService.requestResetPassword(data);
            dispatch(setResponseOwner({ message: response.message, type: 'success' }));
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseOwner({ message, type: 'error' }));
        } finally {
            dispatch(setLoadingOwner(false));
        }
    }
}

export const verifyResetPasswordOwnerApi = (data: { email: string, code: string }, setOwnerId: React.Dispatch<React.SetStateAction<string>>) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(resetResponseOwner());
            dispatch(setLoadingOwner(true));
            const response = await ownerService.verifyResetPassword(data);
            setOwnerId(response.ownerId);
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseOwner({ message, type: 'error' }));
        } finally {
            dispatch(setLoadingOwner(false));
        }
    }
}

export const updatePasswordOwnerApi = (data: { ownerId: string; password: string; rePassword: string }) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingOwner(true));
            const response = await ownerService.updatePassword(data);
            dispatch(setResponseOwner({ message: response.message, type: 'success' }));
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseOwner({ message, type: 'error' }));
        } finally {
            dispatch(setLoadingOwner(false));
        }
    }
}