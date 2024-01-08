import axios from "axios";
import { getToken } from "../../routes/ProtectedRoutes";
export const BASE_URL = import.meta.env.VITE_BASE_URL;
// const userTypeCheck=UserTypeCheck()
// let userIdCheck=UserTypeId()

export const todaysMenu = async (data: any) => {
  try {
    const response = await axios
      .get(`${BASE_URL}user/modules/v1/today-menu/list-today-menu`, getToken())
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
// export const listSubMenuList = async (data: any) => {
//   try {
//     const response = await axios
//       .get(`${BASE_URL}admin/listSubMenu`, getToken())
//       .then((data: any) => {
//         return data;
//       })
//       .catch((error: any) => {
//         return error;
//       });
//     return response.data;
//   } catch (err) {
//     throw err;
//   }
// };
export const addSubMenu = async (data: any) => {
  try {
    const response = await axios
      .post(`${BASE_URL}admin/modules/v1/submenu/add-submenu`,data, getToken())
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


export const updateSubMenu = async (data: any) => {
  try {
  ;
    const response = await axios
      .put(`${BASE_URL}admin/modules/v1/submenu/update-submenu`,data, getToken())
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
  let {currentPage, limit, search} = data;
  try {
    const response = await axios
      .get(`${BASE_URL}admin/modules/v1/auth/employee-list?currentPage=${currentPage ? currentPage : 0}&limit=${limit? limit :10}&search=${search ? search : ""}`, getToken())
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
  try {
  let {currentPage, limit,search} = data;
    const token = `Bearer ${localStorage.getItem('token')}`;
    const response = await axios.get(`${BASE_URL}admin/modules/v1/order/list-order?currentPage=${currentPage ? currentPage : ""}&limit=${limit? limit :10}&search=${search?search:""}`, {
      headers: {
        Authorization: token,
      }})
      
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


export const PendingListDetails = async (data: any) => {
  try {
  let {currentPage, limit,search} = data;
    const token = `Bearer ${localStorage.getItem('token')}`;
    const response = await axios.get(`${BASE_URL}admin/modules/v1/order/pending-order?currentPage=${currentPage ? currentPage : ""}&limit=${limit? limit :10}&search=${search?search:""}`, {
      headers: {
        Authorization: token,
      }})
      
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
 

export const UpdateStatusListDetails = async (data: any) => {
  try {
    let {status} = data;
    const token = `Bearer ${localStorage.getItem('token')}`;
    const response = await axios.post(`${BASE_URL}admin/modules/v1/order/update-statuss?status=${status ? status : ""}`, data,{
      headers: {
        Authorization: token,
      }})
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
  


