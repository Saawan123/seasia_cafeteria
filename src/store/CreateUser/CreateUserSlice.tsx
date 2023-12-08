import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateUserList } from "./CreateUserService";



interface UsersState {
    createUser: any;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: boolean;
}

const initialState = {
    createUser: {},

    error: false,
} as UsersState;

export const CreateUserData = createAsyncThunk(
    "createUser",
    async (data: any, thunkAPI: any) => {
        try {
            const response = await CreateUserList(data);
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




const CreateUserSlice: any = createSlice({
    name: "create User",
    initialState,
    reducers: {
        reset: (state: any) => {

        }
    },
    extraReducers: (builder) => {



        builder.addCase(CreateUserData.pending, (state, action) => {
            state.loading = "pending";
            state.createUser = {};
        }),
            builder.addCase(CreateUserData.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.createUser = action.payload;
                state.error = false;
            }),
            builder.addCase(CreateUserData.rejected, (state, action) => {
                state.loading = "failed";
                state.error = true;
            });

    }
});
export const { reset } = CreateUserSlice.actions;
export default CreateUserSlice.reducer;
