import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import todayMenuReducer from "../todayMenu/todayMenuSlice";
import menuReducer from "../Menu/menuSlice";
import ConfirmOrderReducer from "../ConfirmOrder/ConfirmOrderSLice";
import CreateUserReducer from "../CreateUser/CreateUserSlice";
import dashboardReducer from "../Dashboard/dashboardSlice";
import UserReducer from "../User/UserSlice";



const rootReducer = combineReducers({
  auth: authReducer,
  userProfile:UserReducer,
  MenuListToday:todayMenuReducer,
  MenuList:menuReducer,
  confirmOrderList:ConfirmOrderReducer,
  createUserDataList:CreateUserReducer,
  dashboardDataShow:dashboardReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
