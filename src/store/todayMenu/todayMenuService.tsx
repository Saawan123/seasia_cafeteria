import axios from "axios";
import { getToken } from "../../routes/ProtectedRoutes";
export const BASE_URL = import.meta.env.VITE_BASE_URL;
// const userTypeCheck=UserTypeCheck()
// let userIdCheck=UserTypeId()

export const todaysMenu = async (data: any) => {
  try {
    const response = await axios
      .get(`${BASE_URL}listTodayMenu`, getToken())
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

export const UsersListDetails = async (data: any) => {
  let {currentPage, limit} = data;
  try {
    const response = await axios
      .get(`${BASE_URL}admin/listUsers?currentPage=${currentPage ? currentPage : ""}&limit=${limit? limit :10}`, getToken())
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

export const CustomerListDetails = async (data: any) => {
  console.log(data,"lllllll")
  try {
    console.log(data,"5353466")
    const token = `Bearer ${localStorage.getItem('token')}`;
    const response = await axios.get(`${BASE_URL}admin/listOrder`, {
      headers: {
        Authorization: token,
      }})
      
      .then((data: any) => {
        console.log(token,"sefsdgdg")
        return data;
      })
      .catch((error: any) => {
        console.log("efedrgdrgdfg")
        return error;
      });
      console.log(response,"resssss")
      return response.data;
  } catch (err) {
    throw err;
  }
};

 
  


