import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false
}

export const loaderSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        isLoader: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { isLoader } = loaderSlice.actions
export default loaderSlice.reducer // This line was changed from loginSlice.reducers
