/* All the API will be called in this file */
export const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";
import ToastifyShow from "../../components/ToastifyShow";

//Login API
// Login API in ApiService file
const authLogin = async (data: { emp_id: number }) => {
    try {
        const response = await axios.post(`${BASE_URL}user/modules/v1/auth/login`, data);
        return response.data;
    } catch (err:any) {
        throw err;
    }
};

const otpLogin = async (data: { otp: number }) => {
    try {
        const response = await axios.post(`${BASE_URL}user/modules/v1/auth/verify-otp`, data);
        return response.data;
    } catch (err:any) {
        localStorage.clear()
        ToastifyShow("Please Enter Valid Otp","error")
        throw err;
    }
}; 



  const ApiService = {
    authLogin,
    otpLogin,
    
  };
  
  export default ApiService;
  

