import axios from "axios";
import { getToken } from "../../routes/ProtectedRoutes";
import ToastifyShow from "../../components/ToastifyShow";
export const BASE_URL = import.meta.env.VITE_BASE_URL;
// const userTypeCheck=UserTypeCheck()
// let userIdCheck=UserTypeId()

export const CreateUserList = async (data: any) => {
  try {
    const response = await axios
      .post(`${BASE_URL}admin/modules/v1/auth/create-employee`,data, getToken())
      .then((data: any) => {
        ToastifyShow("User Create Successfully","success")
        return data;
      })
      .catch((error: any) => {
        // console.log(error,"error")
        ToastifyShow(error?.response?.data?.error,"error")
        return error;
      });
    return response.data;
  } catch (err) {
    throw err;
  }
};





