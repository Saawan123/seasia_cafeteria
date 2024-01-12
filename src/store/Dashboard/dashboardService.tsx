import axios from "axios";
import { getToken } from "../../routes/ProtectedRoutes";
export const BASE_URL = import.meta.env.VITE_BASE_URL;
// const userTypeCheck=UserTypeCheck()
// let userIdCheck=UserTypeId()

export const DashboardDataList = async (data: any) => {
  try {
    let {currentPage, limit,search} = data;

    const response = await axios
      .get(`${BASE_URL}admin/modules/v1/dashboard/dashboard-list?currentPage=${currentPage ? currentPage : ""}&limit=${limit? limit :10}&search=${search?search:""}`, getToken())
      .then((data: any) => {
        return data;
      })
      .catch((error: any) => {
        return error;
      });
    return response.data;
  } catch (err) {
    throw err;
  }
};





