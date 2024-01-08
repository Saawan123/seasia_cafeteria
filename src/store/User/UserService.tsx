import axios from "axios";
import { getToken } from "../../routes/ProtectedRoutes";
export const BASE_URL = import.meta.env.VITE_BASE_URL;
// const userTypeCheck=UserTypeCheck()
// let userIdCheck=UserTypeId()

export const WalletHistoryDetails = async (data: any) => {
  try {
    const response = await axios
      .get(`${BASE_URL}admin/modules/v1/wallet/wallet-history`, getToken())
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

export const ViewEmployeeDetails = async (data: any) => {

    try {
        let {emp_id} = data;
       
      const response = await axios
        .get(`${BASE_URL}admin/modules/v1/auth/view-employee?emp_id=${emp_id ? emp_id : ""}`, getToken())
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


  export const NotificationDetails = async (data: any) => {
    try {
      const response = await axios
        .get(`${BASE_URL}user/modules/v1/notification/notification-list`, getToken())
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





