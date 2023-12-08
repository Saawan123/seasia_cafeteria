import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ConfirmOrder } from "./ConfirmOrderService";


interface UsersState {
    addOrder: any;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: boolean;
}

const initialState = {
    addOrder: {},

    error: false,
} as UsersState;

export const ConfirmOrderedData = createAsyncThunk(
    "orderAdd",
    async (data: any, thunkAPI: any) => {
        try {
            const response = await ConfirmOrder(data);
            return response;
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.string();
            return thunkAPI.rejectWithValue(message);
        }
    }
);




const ConfirmOrderSlice: any = createSlice({
    name: "confirmOrder",
    initialState,
    reducers: {
        reset: (state: any) => {

        }
    },
    extraReducers: (builder) => {



        builder.addCase(ConfirmOrderedData.pending, (state, action) => {
            state.loading = "pending";
            state.addOrder = {};
        }),
            builder.addCase(ConfirmOrderedData.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.addOrder = action.payload;
                state.error = false;
            }),
            builder.addCase(ConfirmOrderedData.rejected, (state, action) => {
                state.loading = "failed";
                state.error = true;
            });

    }
});
export const { reset } = ConfirmOrderSlice.actions;
export default ConfirmOrderSlice.reducer;
