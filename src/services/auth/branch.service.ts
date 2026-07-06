import { api } from "../../config/api";
import type { Branch } from "../../types/models";

type RegisterBranchWithFile = {
    name: string,
    nit: string,
    location: string,
    contacts: string,
    file: File
}

type RegisterBranchResponse = {
    message: string,
    data: Branch
}

export const registerBranchService = async (data: RegisterBranchWithFile): Promise<RegisterBranchResponse> => {
    const { name, nit, location, contacts, file } = data;
    const formData = new FormData();

    formData.append('name', name);
    formData.append('nit', nit);
    formData.append('location', location);
    formData.append('contacts', contacts);
    formData.append('file', file);

    const response = await api.post("/branch", formData);
    return response.data;
};

export const findAllBranchService = async (): Promise<Branch[]> => {
    const response = await api.get("/branch");
    return response.data.data;
}