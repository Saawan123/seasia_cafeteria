import { createApi } from "@reduxjs/toolkit/query/react"
import axios from "axios"
import { getToken } from "../../routes/ProtectedRoutes";
export const BASE_URL = import.meta.env.VITE_BASE_URL;
const getPostData = async (data: any) => {
    let { currentPage, limit, search } = data;
    const response = await axios.get(`${BASE_URL}admin/modules/v1/dashboard/dashboard-list?currentPage=${currentPage ? currentPage : ""}&limit=${limit ? limit : 10}&search=${search ? search : ""}`, getToken())
    return response;
}
// export interface IPost{

// }
export const postApi:any = createApi({
    reducerPath: "postApi",
    baseQuery: getPostData,
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPost: builder.query({
            query: () => '/'
        })
    })
})
export const {useGetPostQuery}:any = postApi
//Use Of RTK Query