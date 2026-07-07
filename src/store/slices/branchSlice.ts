import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Branch } from "../../types/models"
import type { ResponseMessage } from "../../types/api";


type BranchState = {
    branch: Branch | null,
    list: Branch[],
    loading: boolean,
    responseMessage: ResponseMessage,
}

const initialState: BranchState = {
    loading: false,
    branch: null,
    list: [],
    responseMessage: {message:'', type: null}
}

const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        setBranch: (state, action: PayloadAction<Branch>) => {
            state.branch = action.payload;
        },
        resetBranch: (state) => {
            state.branch = null;
        },
        setListBranch: (state, action: PayloadAction<Branch[]>) => {
            state.list = action.payload;
        },
        addListBranch: (state, action: PayloadAction<Branch>) => {
            state.list = [...state.list, action.payload];
        },
        resetListBranch: (state) => {
            state.list = [];
        },
        setLoadingBranch: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setResponseBranch(state, action: PayloadAction<ResponseMessage>){
            state.responseMessage = action.payload
        },
        resetResponseBranch(state){
            state.responseMessage = {message: '', type: null}
        }
    }
});

export const {
    setBranch,
    resetBranch,
    setListBranch,
    addListBranch,
    resetListBranch,
    setLoadingBranch,
    setResponseBranch,
    resetResponseBranch
} = branchSlice.actions;

export default branchSlice.reducer;