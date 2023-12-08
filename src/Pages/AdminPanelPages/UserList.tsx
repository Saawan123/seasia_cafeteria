import { useEffect, useMemo, useState } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { UsersListData } from '../../store/todayMenu/todayMenuSlice';
import { EditIcon } from '../../lib/icon';
import Icon from '../../components/Icon';
import ModalShow from '../../components/ModalShow';
import CreateUser from '../CreateUser';
import "../login.scss"
import ToastifyShow from '../../components/ToastifyShow';
import { CreateUserData } from '../../store/CreateUser/CreateUserSlice';
const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [showModal, setShowModal] = useState(false);
  const { userLists ,loading} = useSelector((state: any) => state?.MenuListToday);
  console.log(userLists?.data, "userrrrrr")
  const columns: any = useMemo(
    () => [
      // {
      //   name: "_id",
      //   sortable: true,

      //   cell: ({ _id }: any) => _id,
      // },
      {
        name: "EmployeeId",

        cell: ({ EmployeeId }: any) => EmployeeId,


      },
      {
        name: "Name",

        cell: ({ FirstName, LastName }: any) => FirstName + " " + LastName,

      },
      {
        name: "balance",

        cell: ({ balance }: any) => balance,


      },

      {
        name: "Wallet",

        cell: ({ wallet }: any) => wallet,

      },
      {
        name: "EmployeeId",

        cell: ({ EmployeeId }: any) => EmployeeId,


      },
      {
        name: "Operations",

        cell: ({ }: any) => <Icon
          icon={EditIcon}
        // action={() => {
        //   openExcelPreview(doc_file);
        // }}
        />,


      },

    ],
    []
  );
  useEffect(() => {
    dispatch(UsersListData({}));
  }, [])
  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      await dispatch(CreateUserData(values));
      console.log("User created:", values);
      resetForm();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };



  return (
    <div>
      <Button
                  // type="submit"
                  onClick={()=>setShowModal(true)}
                  size="lg"
                  data-testid="loginBtn"
                  className="button-color fs-6 fw-bold w-25 mt-4 ms-3"
                >
                  Create User
                </Button>
                
                <ModalShow
                  handleView={showModal}
                  handleClose={() => {
                    setShowModal(false)
                  }}
                  title="Login"
                  title1={
                    <CreateUser/>
                  }
                  title2="Submit"
                  handleApi={()=>{

                    setShowModal(false),
                    ToastifyShow("User Created successfully","success")
                  }
                  //   async()=>{
                  //   await dispatch()
                  // }
                }
                />
              
      <DataTable
        columns={columns}
        data={userLists?.data}
        pagination
        // paginationPerPage={FranchiseDocList?.per_page}
        responsive
        paginationServer
        // onChangeRowsPerPage={(data) => {
        //   setPaginationPerDetails({
        //     ...paginationPerDetails,
        //     perPage: data,
        //   });
        // }}
        progressPending={loading == "pending" ? true : false}
        progressComponent={
          <div className="py-5 my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        }
        selectableRowsHighlight={true}
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
        // paginationTotalRows={FranchiseDocList?.total}
        highlightOnHover={true}
        fixedHeader
        fixedHeaderScrollHeight="550px"
      // onChangePage={(data) => {
      //   setPaginationPerDetails({
      //     ...paginationPerDetails,
      //     page: data,
      //   });
      // }}
      />
    </div>
  )
}

export default UserList
