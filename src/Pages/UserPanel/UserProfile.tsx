// import { useEffect, useMemo, useState } from 'react'
// import { Button, Spinner } from 'react-bootstrap';
// import DataTable from "react-data-table-component";
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch } from '../../store/store';
// import ModalShow from '../../components/ModalShow';
// import CreateUser from '../CreateUser';
// import "../login.scss"
// import InputSearch from '../../components/InputSearch';
// import { NotificationDataList, ViewEmoplyeeData, WalletData } from '../../store/User/UserSlice';
// import { UsersOrderedData } from '../../store/ConfirmOrder/ConfirmOrderSLice';
// import { CustomerListData } from '../../store/todayMenu/todayMenuSlice';
// import ToastifyShow from '../../components/ToastifyShow';
// import { Navigate, useNavigate } from 'react-router-dom';
// const UserProfile = () => {
//   const dispatch = useDispatch<AppDispatch>();
// const navigate = useNavigate()
//   const [showModal, setShowModal] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const { userLists, loading } = useSelector((state: any) => state?.MenuListToday);
//   const [paginationPerDetails, setPaginationPerDetails] = useState({
//     perPage: 10,
//     currentPage: 0,
//   });

// const{ walletList,    employeeList,    notificationList} = useSelector((state:any)=>state?.userProfile)
//   const columns: any = useMemo(
//     () => [
//       // {
//       //   name: "_id",
//       //   sortable: true,

//       //   cell: ({ _id }: any) => _id,
//       // },
//       {
//         name: "EmployeeId",

//         cell: ({ EmployeeId }: any) => EmployeeId,


//       },
//       {
//         name: "Name",

//         cell: ({ FirstName, LastName }: any) => FirstName + " " + LastName,

//       },
//       {
//         name: "balance",

//         cell: ({ balance }: any) => balance,


//       },

//       {
//         name: "Wallet",

//         cell: ({ wallet }: any) => wallet,

//       },
//       {
//         name: "EmployeeId",

//         cell: ({ EmployeeId }: any) => EmployeeId,


//       },


//     ],
//     []
//   );
// // all apis dispatch here for userProfile
//   useEffect(() => {
//     dispatch(WalletData({ }));
//     dispatch(NotificationDataList({}))
//     dispatch(ViewEmoplyeeData({emp_id:3657}))
//     dispatch(CustomerListData({}))
//   }, [])


//   return (
//     <div>
//       <div className='d-flex justify-content-between p-2 m-2'>

//         <div className='mt-4'>
        // <Button
        //     // type="submit"
        //     onClick={() => {
        //         localStorage.clear();
        // navigate("/")
        //         ToastifyShow("Logout Successfully","success")
        //     }}
        //     size="lg"
        //     data-testid="loginBtn"
        //     className="button-color"
        //   >
        //    Logout
        //   </Button>
       
//         </div>
//         <div className='mt-2'>

//           <InputSearch
//             placeholder="Search here"
//             className="text-center "
//             showValue={searchValue}
//             addValue={(e: any) => setSearchValue(e.target.value)}
//           />
//         </div>
//       </div>
//       <ModalShow
//         handleView={showModal}
//         size="md"
//         handleClose={() => {
//           setShowModal(false)
//         }}
//         title="Login"
//         title1={
//           <CreateUser closeModal={() => setShowModal(false)} />

//         }
//         // title2="Submit"
//         handleApi={

//           ""
//         }
//       />

//       <DataTable
//         columns={columns}
//         data={userLists?.data}
//         pagination
//         paginationPerPage={paginationPerDetails?.perPage}
//         noDataComponent="No items found matching the search criteria"

//         responsive
//         paginationServer
//         onChangeRowsPerPage={(data) => {
//           setPaginationPerDetails({
//             ...paginationPerDetails,
//             perPage: data,
//           });
//         }}
//         progressPending={loading == "pending" ? true : false}
//         progressComponent={
//           <div className="py-5 my-5">
//             <Spinner animation="border" variant="primary" />
//           </div>
//         }
//         selectableRowsHighlight={true}
//         paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
//         paginationTotalRows={userLists?.totalRecords}
//         highlightOnHover={true}
//         fixedHeader
//         fixedHeaderScrollHeight="550px"
//         onChangePage={(data) => {
//           setPaginationPerDetails({
//             ...paginationPerDetails,
//             currentPage: data-1,
//           });
//         }}
//       />
//     </div>
//   )
// }

// export default UserProfile

import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import ToastifyShow from '../../components/ToastifyShow';
import { useNavigate } from 'react-router-dom';
import { NotificationDataList, ViewEmoplyeeData, WalletData } from '../../store/User/UserSlice';
import { CustomerListData } from '../../store/todayMenu/todayMenuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';

const UserProfile = () => {
  const navigate = useNavigate();
  const {employeeList} = useSelector((state:any)=>state?.userProfile)
  console.log(employeeList,"lllll")
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {

         dispatch(ViewEmoplyeeData({ emp_id: employeeList?.data?.EmployeeId }));
         dispatch(WalletData({}));
         dispatch(NotificationDataList({}));
         dispatch(CustomerListData({}));
   
  }, [dispatch,]);
  
  return (
    <div>
              <Button
            // type="submit"
            onClick={() => {
                localStorage.clear();
        navigate("/")
                ToastifyShow("Logout Successfully","success")
            }}
            size="lg"
            data-testid="loginBtn"
            className="button-color"
          >
           Logout
          </Button>
    </div>
  )
}

export default UserProfile
