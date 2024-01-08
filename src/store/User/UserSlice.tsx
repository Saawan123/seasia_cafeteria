import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotificationDetails, ViewEmployeeDetails, WalletHistoryDetails } from "./UserService";



interface UsersState {
    walletList: any;
    employeeList: any;
    notificationList:any;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: boolean;
}

const initialState = {
    walletList: {},
employeeList:{},
notificationList:{},
    error: false,
} as UsersState;

export const WalletData = createAsyncThunk(
    "wallet",
    async (data: any, thunkAPI: any) => {
        try {
            const response = await WalletHistoryDetails(data);
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


export const ViewEmoplyeeData = createAsyncThunk(
    "employee",
    async (data: any, thunkAPI: any) => {
        try {
            const response = await ViewEmployeeDetails(data);
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




export const NotificationDataList = createAsyncThunk(
    "notification",
    async (data: any, thunkAPI: any) => {
        try {
            const response = await NotificationDetails(data);
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


const UserSlice: any = createSlice({
    name: " User Details data",
    initialState,
    reducers: {
        reset: (state: any) => {

        }
    },
    extraReducers: (builder) => {



        builder.addCase(WalletData.pending, (state, action) => {
            state.loading = "pending";
            state.walletList = {};
        }),
            builder.addCase(WalletData.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.walletList = action.payload;
                state.error = false;
            }),
            builder.addCase(WalletData.rejected, (state, action) => {
                state.loading = "failed";
                state.error = true;
            });

            //viewEmployee

            builder.addCase(ViewEmoplyeeData.pending, (state, action) => {
                state.loading = "pending";
                state.employeeList = {};
            }),
                builder.addCase(ViewEmoplyeeData.fulfilled, (state, action) => {
                    state.loading = "succeeded";
                    state.employeeList = action.payload;
                    state.error = false;
                }),
                builder.addCase(ViewEmoplyeeData.rejected, (state, action) => {
                    state.loading = "failed";
                    state.error = true;
                });

                //notification
                builder.addCase(NotificationDataList.pending, (state, action) => {
                    state.loading = "pending";
                    state.notificationList = {};
                }),
                    builder.addCase(NotificationDataList.fulfilled, (state, action) => {
                        state.loading = "succeeded";
                        state.notificationList = action.payload;
                        state.error = false;
                    }),
                    builder.addCase(NotificationDataList.rejected, (state, action) => {
                        state.loading = "failed";
                        state.error = true;
                    });
    


    }
});
export const { reset } = UserSlice.actions;
export default UserSlice.reducer;
