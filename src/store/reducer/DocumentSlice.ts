import { createSlice } from "@reduxjs/toolkit";
import type { IDoc } from "../../models/Document";

interface DocumentState {
    docs: IDoc[],
    isLoading: boolean,
    error: string
}

const initialState: DocumentState = {
    docs: [
        {
            id: 1,
            name: 'Test document ...',
            tag: 'Jobs',
            tagColor: 'bg-orange-300',
            recipient: 'Stiv Rogers',
            created: '1/03/2023',
            status: 'Draft',
            statusColor: 'bg-gray-400',
            modified: '2 hours ago',
        },
        {
            id: 2,
            name: 'Quote contract',
            tag: 'Quotes',
            tagColor: 'bg-purple-300',
            recipient: 'Stiv Rogers',
            created: '4/03/2023',
            status: 'Signed',
            statusColor: 'bg-green-400',
            modified: '15 minutes ago',
        },
    ],
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
    }
})


export default DocumentSlice.reducer
export const { setDocs } = DocumentSlice.actions