import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Branch } from "../../types/models"


type BranchState = {
    loading: boolean,
    branch: Branch | null,
    list: Branch[],
}

const initialState: BranchState = {
    loading: false,
    branch: null,
    list: []
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
        resetListBranch: (state) => {
            state.list = [];
        }
    }
});

export const {
    setBranch,
    resetBranch,
    setListBranch,
    resetListBranch
} = branchSlice.actions;

export default branchSlice.reducer;