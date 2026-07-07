import { api } from "../../config/api";
import type { CreateOwnerType } from "../../pages/auth/register/form/schema/register-schema";
import type { LoginType } from "../../pages/auth/login/form/schemas/login-schema";
import type { Owner, Verification } from "../../types/models";


type CreateResponse = {
  message: string,
  data: Owner
}

type LoginResponse = {
  owner: Owner,
  verification: Verification
}

type ResentVerificationResponse = {
  message: string
}

type VerificationResponse = {
  data: Verification
  message: string
}

type RequestResetPasswordResponse = {
  message: string
}

type VerifyResetPasswordResponse = {
  ownerId: string;
  message: string
}

type UpdatePasswordResponse = {
  message: string
}

export const ownerService = {
  login: async (data: LoginType):Promise<LoginResponse> => {
    const response = await api.post("/auth/login", data);
    const {access_token, refresh_token, ...res} = response.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    return res;
  },
  refreshToken: async (data: { refresh_token: string }):Promise<LoginResponse> => {
    const response = await api.post("/auth/refresh", data);
    const {access_token, refresh_token, ...res} = response.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    return res;
  },
  create: async (data: CreateOwnerType):Promise<CreateResponse> => {
    const response = await api.post("/owners", data);
    return response.data;
  },
  verifyAccount: async (data: { email: string, code: string }):Promise<VerificationResponse> => {
    const response = await api.post("/owners/verify", data);
    return response.data;
  },
  verifyResetPassword: async (data: { email: string, code: string }):Promise<VerifyResetPasswordResponse> => {
    const response = await api.post("/owners/verify-reset-password", data);
    return response.data;
  },
  updatePassword: async (data: { ownerId: string; password: string; rePassword: string }):Promise<UpdatePasswordResponse> => {
    const response = await api.post("/owners/update-password", data);
    return response.data;
  },
  requestResetPassword: async (data: { email: string }):Promise<RequestResetPasswordResponse> => {
    const response = await api.post("/owners/request-reset-password", data);
    return response.data;
  },
  resentVerification: async (data: { ownerId: string; email: string }):Promise<ResentVerificationResponse> => {
    const response = await api.post("/owners/resend-verification", data);
    return response.data;
  }
}
