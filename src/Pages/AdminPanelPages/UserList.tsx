import { useEffect, useMemo, useState } from 'react'
import { Button,  Spinner } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { UsersListData } from '../../store/todayMenu/todayMenuSlice';
import { EditIcon } from '../../lib/icon';
import Icon from '../../components/Icon';
import ModalShow from '../../components/ModalShow';
import CreateUser from '../CreateUser';
import "../login.scss"
const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [showModal, setShowModal] = useState(false);
  const { userLists, loading } = useSelector((state: any) => state?.MenuListToday);
  console.log(userLists?.data, "userrrrrr");
  const [paginationPerDetails, setPaginationPerDetails] = useState({
    perPage: 10,
    currentPage: 0,
  });
  const { perPage, currentPage } = paginationPerDetails;

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
    dispatch(UsersListData({ limit: perPage, currentPage: currentPage }));
  }, [paginationPerDetails])


  return (
    <div>
      <Button
        // type="submit"
        onClick={() => setShowModal(true)}
        size="lg"
        data-testid="loginBtn"
        className="button-color fs-6 fw-bold w-25 mt-4 ms-3"
      >
        Create User
      </Button>

      <ModalShow
        handleView={showModal}
        size="md"
        handleClose={() => {
          setShowModal(false)
        }}
        title="Login"
        title1={
          <CreateUser closeModal={() => setShowModal(false)} /> 

        }
        // title2="Submit"
        handleApi={
      
""
        }
      />

      <DataTable
        columns={columns}
        data={userLists?.data}
        pagination
        paginationPerPage={paginationPerDetails?.perPage}
          noDataComponent="No items found matching the search criteria"
          
        responsive
        paginationServer
        onChangeRowsPerPage={(data) => {
          console.log(data, 'dataaaa11111')
          setPaginationPerDetails({
            ...paginationPerDetails,
            perPage: data,
          });
        }}
        progressPending={loading == "pending" ? true : false}
        progressComponent={
          <div className="py-5 my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        }
        selectableRowsHighlight={true}
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
        paginationTotalRows={userLists?.totalRecords}
        highlightOnHover={true}
        fixedHeader
        fixedHeaderScrollHeight="550px"
        onChangePage={(data) => {
          console.log(data, "data222222")
          setPaginationPerDetails({
            ...paginationPerDetails,
            currentPage: data,
          });
        }}
      />
    </div>
  )
}

export default UserList
