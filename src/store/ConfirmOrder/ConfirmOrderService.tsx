import axios from "axios";
import { getToken } from "../../routes/ProtectedRoutes";
export const BASE_URL = import.meta.env.VITE_BASE_URL;
// const userTypeCheck=UserTypeCheck()
// let userIdCheck=UserTypeId()

export const ConfirmOrder = async (data: any) => {
  try {
    const response = await axios
      .post(`${BASE_URL}/user/modules/v1/order/add-order`,data, getToken())
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


export const UsersOrder = async (data: any) => {
  try {
    const response = await axios
      .get(`${BASE_URL}user-orders`, getToken())
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

export const DeleteOrder = async (data: any) => {
  try {
    let {id}:any=data;
    const response = await axios
      .delete(`${BASE_URL}admin/delete?id=${id?id:""}`, getToken())
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



export const addTodayMenuOrder = async (data: any) => {
  try {
 
    const response = await axios
      .post(`${BASE_URL}admin/modules/v1/today-menu/add-today-menu`,data, getToken())
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
