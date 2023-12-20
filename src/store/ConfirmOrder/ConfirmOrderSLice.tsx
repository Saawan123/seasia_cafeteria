import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ConfirmOrder, DeleteOrder, UsersOrder, addTodayMenuOrder } from "./ConfirmOrderService";


interface UsersState {
    addOrder: any;
    deleteOrderItems:any;
    usersOrderLists:any;
    todayOrderMenu:any;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: boolean;
}

const initialState = {
    addOrder: {},
    deleteOrderItems:{},
    todayOrderMenu:{},
    usersOrderLists:{},
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

export const UsersOrderedData = createAsyncThunk(
    "userOrderList",
    async (data: any, thunkAPI: any) => {
        try {
            const response = await UsersOrder(data);
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

export const DeleteOrderedData = createAsyncThunk(
    "orderDelete",
    async (data: any, thunkAPI: any) => {
        try {
            const response = await DeleteOrder(data);
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

export const AddTodayOrderedData = createAsyncThunk(
    "addtodayMenu",
    async (data: any, thunkAPI: any) => {
        try {
            const response = await addTodayMenuOrder(data);
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


   //usersOrders
   builder.addCase(UsersOrderedData.pending, (state, action) => {
    state.loading = "pending";
    state.usersOrderLists = {};
}),
    builder.addCase(UsersOrderedData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.usersOrderLists = action.payload;
        state.error = false;
    }),
    builder.addCase(UsersOrderedData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = true;
    });

            //delete
            builder.addCase(DeleteOrderedData.pending, (state, action) => {
                state.loading = "pending";
                state.deleteOrderItems = {};
            }),
                builder.addCase(DeleteOrderedData.fulfilled, (state, action) => {
                    state.loading = "succeeded";
                    state.deleteOrderItems = action.payload;
                    state.error = false;
                }),
                builder.addCase(DeleteOrderedData.rejected, (state, action) => {
                    state.loading = "failed";
                    state.error = true;
                });


                //today menuorder
                builder.addCase(AddTodayOrderedData.pending, (state, action) => {
                    state.loading = "pending";
                    state.todayOrderMenu = {};
                }),
                    builder.addCase(AddTodayOrderedData.fulfilled, (state, action) => {
                        state.loading = "succeeded";
                        state.todayOrderMenu = action.payload;
                        state.error = false;
                    }),
                    builder.addCase(AddTodayOrderedData.rejected, (state, action) => {
                        state.loading = "failed";
                        state.error = true;
                    });

    }
});
export const { reset } = ConfirmOrderSlice.actions;
export default ConfirmOrderSlice.reducer;
