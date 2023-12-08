import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "./apiService";

interface UsersState {
  loginData: any;
  loginOtp: any;
  listData:any;
  loading: "idle" | "pending" | "succeeded" | "failed";
  loadingOtp: "idle" | "pending" | "succeeded" | "failed";
  loadingList: "idle" | "pending" | "succeeded" | "failed";
  error: boolean;
}

const initialState = {
  loginData: {},
  loginOtp: {},
  listData:{},
  error: false,
} as UsersState;

export const authLogin:any = createAsyncThunk(
  "auth/login",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await ApiService.authLogin(data);
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

export const otpLogin:any = createAsyncThunk(
  "auth/login/otp",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await ApiService.otpLogin(data);
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




const authSlice:any = createSlice({
  name: "auth/login",
  initialState,
  reducers: {
    reset: () => initialState,
    resetLoginData : (state)=>{
state.loginData={}
    }
  },
  extraReducers: (builder) => {

//login     
    builder.addCase(authLogin.pending, (state) => {
      state.loading = "pending";
    }),
      builder.addCase(authLogin.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.loginData = action.payload;
        state.error = false;
      }),
      builder.addCase(authLogin.rejected, (state) => {
        state.loading = "failed";
        state.error = true;
      })

//verify otp
      builder.addCase(otpLogin.pending, (state) => {
        state.loadingOtp = "pending";
      }),
        builder.addCase(otpLogin.fulfilled, (state, action) => {
          state.loadingOtp = "succeeded";
          state.loginOtp = action.payload;
          state.error = false;
        }),
        builder.addCase(otpLogin.rejected, (state) => {
          state.loadingOtp = "failed";
          state.error = true;
        })


       
  },
});

export const { reset,resetLoginData } = authSlice.actions;
export default authSlice.reducer;
