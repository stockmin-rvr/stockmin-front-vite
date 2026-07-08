import type { AppDispatch } from "..";
import { getMessageErrorApi } from "../../config/api";
import type { CreateBranchType } from "../../pages/branch/register/forms/schema/register-branch-schema";
import { branchService } from "../../services/branch/branch.service";
import type { Branch } from "../../types/models";
import { addListBranch, resetBranch, resetResponseBranch, setBranch, setListBranch, setLoadingBranch, setResponseBranch } from "../slices/branchSlice";

export const findAllBranchApi = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(resetResponseBranch());
            dispatch(setLoadingBranch(true));
            const response = await branchService.findAll();
            dispatch(setListBranch(response.data));
        } catch (error) {
            const message = getMessageErrorApi(error);
            console.log(message)          
        } finally {
            dispatch(setLoadingBranch(false));            
        }
    }
}

export const createBranchApi = (data: CreateBranchType, file?: File | null) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(resetResponseBranch());
            dispatch(setLoadingBranch(true));
            const response = await branchService.create(data, file);
            dispatch(addListBranch(response.data));
            dispatch(setResponseBranch({message: response.message, type:'success'}));
        } catch (error) {
            const message = getMessageErrorApi(error);
            dispatch(setResponseBranch({message, type:'error'}));           
        } finally {
            dispatch(setLoadingBranch(false));            
        }
    }
}

export const loginBranchApi = (branch: Branch) => {
    return async (dispatch: AppDispatch) => {
        localStorage.setItem('branch', JSON.stringify(branch));
        dispatch(setBranch(branch));
    }
}

export const logoutBranchApi = () => {
    return async (dispatch: AppDispatch) => {
        localStorage.removeItem('branch');
        dispatch(resetBranch());
    }
}