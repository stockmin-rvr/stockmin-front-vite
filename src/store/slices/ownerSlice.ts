import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Owner, Verification } from "../../types/models";
import type { ResponseMessageType } from "../../types/api";

type OwnerState = {
    owner: Owner | null;
    verification: Verification | null;
    loading: boolean;
    responseMessage: ResponseMessageType;
}

const initialState: OwnerState = {
    owner: null,
    verification: null,
    loading: false,
    responseMessage: {message:'', type: null}
}
const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        setLoadingOwner(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setOwner(state, action: PayloadAction<Owner>){
            state.owner = action.payload;
        },
        resetOwner(state){
            state.owner = null;
        },
        setVerificationOwner(state, action: PayloadAction<Verification>){
            state.verification = action.payload
        },
        resetVerificationOwner(state){
            state.verification = null
        },
        setResponseOwner(state, action: PayloadAction<ResponseMessageType>){
            state.responseMessage = action.payload
        },
        resetResponseOwner(state){
            state.responseMessage = {message: '', type: null}
        }
    }
});

export const {
    setOwner,
    resetOwner,
    setVerificationOwner,
    resetVerificationOwner,
    setLoadingOwner,
    setResponseOwner,
    resetResponseOwner
} = ownerSlice.actions;

export default ownerSlice.reducer;
