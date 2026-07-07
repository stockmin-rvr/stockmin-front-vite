import { api } from "../../config/api";
import type { CreateBranchType } from "../../pages/branch/register/forms/schema/register-branch-schema";
import type { Branch } from "../../types/models";

type CreateResponse = {
    message: string,
    data: Branch
}

type FindAllResponse = {
    message: string,
    data: Branch[]
}

export const branchService = {
    create: async (data: CreateBranchType, file?: File | null): Promise<CreateResponse> => { //: Promise<RegisterBranchResponse>
        const { name, nit, location, contacts } = data;
        const formData = new FormData();

        formData.append('name', name);
        formData.append('nit', nit);
        formData.append('location', location);
        formData.append('contacts', contacts);
        if (file) formData.append('file', file);

        const response = await api.post("/branch", formData);
        return response.data;
    },
    findAll: async (): Promise<FindAllResponse> => {
        const response = await api.get("/branch");
        return response.data;
    }
}
