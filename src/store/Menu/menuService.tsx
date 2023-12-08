import axios from "axios";
import { getToken } from "../../routes/ProtectedRoutes";
export const BASE_URL = import.meta.env.VITE_BASE_URL;
// const userTypeCheck=UserTypeCheck()
// let userIdCheck=UserTypeId()

export const Menu = async (data: any) => {
  try {
    const response = await axios
      .get(`${BASE_URL}admin/listMenu`, getToken())
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


export const subMenuList = async (data: any) => {
    try {
      const response :any= await axios
        .get(`${BASE_URL}admin/listSubMenu`, getToken())
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



