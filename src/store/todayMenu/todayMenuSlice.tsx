import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomerListDetails, PendingListDetails, UsersListDetails, addSubMenu, todaysMenu, updateSubMenu } from "./todayMenuService";


interface UsersState {
  menusList: any;
  userLists:any;
  subMenuAddList:any;
  subMenuUpdateList:any;
  customerOrders:any;
  pendingOrders:any;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: boolean;
}

const initialState = {
  menusList: {},
  subMenuAddList:{},
  subMenuUpdateList:{},
  userLists:{},
  customerOrders:{},
  pendingOrders:{},
  error: false,
} as UsersState;

export const TodaysMenuListData = createAsyncThunk(
  "menuList/todays",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await todaysMenu(data);
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

export const UsersListData = createAsyncThunk(
  "user/Lists",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await UsersListDetails(data);
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


export const CustomerListData = createAsyncThunk(
  "customer/lists",
  async (data: any, thunkAPI: any) => {
    console.log(data,"dataaaaaa")
    try {
console.log(data,"111111")
      const response = await CustomerListDetails(data);
      console.log(response,"gfgfgfgfgf")
      return response;
    } catch (error: any) {
      console.log("22222")

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


export const PendingOrderListData = createAsyncThunk(
  "pendingOrder/lists",
  async (data: any, thunkAPI: any) => {
    console.log(data,"dataaaaaa")
    try {
console.log(data,"111111")
      const response = await PendingListDetails(data);
      console.log(response,"gfgfgfgfgf")
      return response;
    } catch (error: any) {
      console.log("22222")

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

export const AddSubMenuListData = createAsyncThunk(
  "addSubMenu/lists",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await addSubMenu(data);
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

export const UpdateSubMenuListData = createAsyncThunk(
  "updateSubMenu/lists",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await updateSubMenu(data);
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

const todayMenuSlice:any = createSlice({
  name: "Today menu",
  initialState,
  reducers: {
 reset:(state:any)=>{

 }
  },
  extraReducers: (builder) => {

    builder.addCase(TodaysMenuListData.pending, (state, action) => {
      state.loading = "pending";
      state.menusList = {};
    }),
      builder.addCase(TodaysMenuListData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.menusList = action.payload;
        state.error = false;
      }),
      builder.addCase(TodaysMenuListData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = true;
      });


//user list
      builder.addCase(UsersListData.pending, (state, action) => {
        state.loading = "pending";
        state.userLists = {};
      }),
        builder.addCase(UsersListData.fulfilled, (state, action) => {
          state.loading = "succeeded";
          state.userLists = action.payload;
          state.error = false;
        }),
        builder.addCase(UsersListData.rejected, (state, action) => {
          state.loading = "failed";
          state.error = true;
        });

//customer details

        builder.addCase(CustomerListData.pending, (state, action) => {
          state.loading = "pending";
          state.customerOrders = {};
        }),
          builder.addCase(CustomerListData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.customerOrders = action.payload;
            state.error = false;
          }),
          builder.addCase(CustomerListData.rejected, (state, action) => {
            state.loading = "failed";
            state.error = true;
          });

          
          // pending order List
          builder.addCase(PendingOrderListData.pending, (state, action) => {
            state.loading = "pending";
            state.pendingOrders = {};
          }),
            builder.addCase(PendingOrderListData.fulfilled, (state, action) => {
              state.loading = "succeeded";
              state.pendingOrders = action.payload;
              state.error = false;
            }),
            builder.addCase(PendingOrderListData.rejected, (state, action) => {
              state.loading = "failed";
              state.error = true;
            });
          //add sub menu

        builder.addCase(AddSubMenuListData.pending, (state, action) => {
          state.loading = "pending";
          state.subMenuAddList = {};
        }),
          builder.addCase(AddSubMenuListData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.subMenuAddList = action.payload;
            state.error = false;
          }),
          builder.addCase(AddSubMenuListData.rejected, (state, action) => {
            state.loading = "failed";
            state.error = true;
          });
//update sub menu
          builder.addCase(UpdateSubMenuListData.pending, (state, action) => {
            state.loading = "pending";
            state.subMenuUpdateList = {};
          }),
            builder.addCase(UpdateSubMenuListData.fulfilled, (state, action) => {
              state.loading = "succeeded";
              state.subMenuUpdateList = action.payload;
              state.error = false;
            }),
            builder.addCase(UpdateSubMenuListData.rejected, (state, action) => {
              state.loading = "failed";
              state.error = true;
            });
    }
});
export const { reset } = todayMenuSlice.actions;
export default todayMenuSlice.reducer;
