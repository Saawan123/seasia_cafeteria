import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DashboardDataList } from "./dashboardService";



interface UsersState {
    dashboardList: any;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: boolean;
}

const initialState = {
    dashboardList: {},

    error: false,
} as UsersState;

export const DashboardData = createAsyncThunk(
    "dashbaord",
    async (data: any, thunkAPI: any) => {
        try {
            const response = await DashboardDataList(data);
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




const DashboardDataSlice: any = createSlice({
    name: "dashboard User",
    initialState,
    reducers: {
        reset: (state: any) => {

        }
    },
    extraReducers: (builder) => {



        builder.addCase(DashboardData.pending, (state, action) => {
            state.loading = "pending";
            state.dashboardList = {};
        }),
            builder.addCase(DashboardData.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.dashboardList = action.payload;
                state.error = false;
            }),
            builder.addCase(DashboardData.rejected, (state, action) => {
                state.loading = "failed";
                state.error = true;
            });

    }
});
export const { reset } = DashboardDataSlice.actions;
export default DashboardDataSlice.reducer;
