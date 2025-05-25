import { createSlice } from "@reduxjs/toolkit";
import type { IDoc } from "../../models/Document";
import { getDocs, getDocsById } from "./ActionCreators";

interface DocumentState {
    docs: IDoc[],
    docDetails: IDoc | null,
    isLoading: boolean,
    error: string
}

const initialState: DocumentState = {
    docs: [
        // {
        //     id: 1,
        //     name: 'Test document ...',
        //     tag: 'Jobs',
        //     tagColor: 'bg-orange-300',
        //     recipient: 'Stiv Rogers',
        //     created: '1/03/2023',
        //     status: 'Draft',
        //     statusColor: 'bg-gray-400',
        //     modified: '2 hours ago',
        // },
        // {
        //     id: 2,
        //     name: 'Quote contract',
        //     tag: 'Quotes',
        //     tagColor: 'bg-purple-300',
        //     recipient: 'Stiv Rogers',
        //     created: '4/03/2023',
        //     status: 'Signed',
        //     statusColor: 'bg-green-400',
        //     modified: '15 minutes ago',
        // },
    ],
    docDetails: null,
    isLoading: false,
    error: ''
}

export const DocumentSlice = createSlice({
    name: 'document',
    initialState,
    reducers: {
        setDocs: (state, action) => {
            state.docs = action.payload
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getDocs.pending, (state) => {
            state.isLoading = true
            state.error = ''
        })
        .addCase(getDocs.fulfilled, (state, action) => {
            state.docs = action.payload
            state.isLoading = false
        })
        .addCase(getDocs.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload || 'Login failed'
        })
        .addCase(getDocsById.pending, (state) => {
            state.isLoading = true
            state.error = ''
        })
        .addCase(getDocsById.fulfilled, (state, action) => {
            state.docDetails = action.payload
            state.isLoading = false
        })
        .addCase(getDocsById.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload || 'Login failed'
        })
    }
})


export default DocumentSlice.reducer
export const { setDocs } = DocumentSlice.actions