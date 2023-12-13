import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Menu, deleteItems, subMenuList } from "./menuService";

interface UsersState {
  menus: any;
  subMenus: any;
  deleteRecord:any;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: boolean;
}

const initialState = {
  menus: {},
  subMenus:{},
  deleteRecord:{},
  error: false,
} as UsersState;

export const MenuListData = createAsyncThunk(
  "menuList",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await Menu(data);
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


export const SubMenuListData = createAsyncThunk(
    "SubmenuList",
    async (data: any, thunkAPI: any) => {
      try {
        const response = await subMenuList(data);
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

  export const DeleteItemRecords = createAsyncThunk(
    "deleteItems",
    async (data: any, thunkAPI: any) => {
      try {
        const response = await deleteItems(data);
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
  
const MenuSlice:any = createSlice({
  name: "menu",
  initialState,
  reducers: {
 reset:(state:any)=>{

 }
  },
  extraReducers: (builder) => {

    builder.addCase(MenuListData.pending, (state, action) => {
      state.loading = "pending";
      state.menus = {};
    }),
      builder.addCase(MenuListData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.menus = action.payload;
        state.error = false;
      }),
      builder.addCase(MenuListData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = true;
      });


      builder.addCase(SubMenuListData.pending, (state, action) => {
        state.loading = "pending";
        state.subMenus = {};
      }),
        builder.addCase(SubMenuListData.fulfilled, (state, action) => {
          state.loading = "succeeded";
          state.subMenus = action.payload;
          state.error = false;
        }),
        builder.addCase(SubMenuListData.rejected, (state, action) => {
          state.loading = "failed";
          state.error = true;
        });



        builder.addCase(DeleteItemRecords.pending, (state, action) => {
          state.loading = "pending";
          state.deleteRecord = {};
        }),
          builder.addCase(DeleteItemRecords.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.deleteRecord = action.payload;
            state.error = false;
          }),
          builder.addCase(DeleteItemRecords.rejected, (state, action) => {
            state.loading = "failed";
            state.error = true;
          });
    }
});
export const { reset } = MenuSlice.actions;
export default MenuSlice.reducer;
