import { useEffect, useMemo, useState } from 'react'
import { Nav, Spinner } from 'react-bootstrap';
import "../login.scss"
import ModalShow from '../../components/ModalShow';
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { CustomerListData, PendingOrderListData, UpdateStatusOrderListData } from '../../store/todayMenu/todayMenuSlice';
import {  cancelledButtonIcon, confirmedButton } from '../../lib/icon';
import Icon from '../../components/Icon';
import ToastifyShow from '../../components/ToastifyShow';
import ToolTipDetails from '../../components/ToolTipDetails';
import InputSearch from '../../components/InputSearch';
import ChatBot from '../../components/Chatbot';
import { useGetPostQuery } from '../../store/Dashboard/dashboardServicertk';

const UserList = () => {
  const {loginOtp } = useSelector(
    (state: any) => state?.auth
  );
  const { employeeList } = useSelector((state: any) => state?.userProfile);
  const {data}:any = useGetPostQuery()
console.log(data,"dat6666")
  console.log(loginOtp?.data?.empDetails?.role,"plplplpi988887")
  const [activeTab, setActiveTab] = useState('customerOrders');
  const dispatch = useDispatch<AppDispatch>();
  const [searchValue, setSearchValue] = useState("");
  const [showModal , setShowModal] = useState(false)
  const [showConfirmModal , setShowConfirmModal] = useState(false)
  const [idd, setIdd] = useState("");
  const { customerOrders, loading, pendingOrders } = useSelector((state: any) => state?.MenuListToday);
  const [paginationPerDetails, setPaginationPerDetails] = useState({
    perPage: 10,
    currentPage: 0,
  });
  const { perPage, currentPage } = paginationPerDetails;

  const columns: any = useMemo(() => {
    let dynamicColumns = [
      {
        name: "Employee ID",
        cell: ({ emp_id }: any) => emp_id,
      },

      {
        name: "Order Status",
        cell: ({ order_status }: any) => order_status,
      },

      {
        name: "Bill Status",
        cell: ({ bill_status }: any) => bill_status,
      },
      {
        name: "Price",
        cell: ({ order_rec }: any) => order_rec?.map((item: any) => item.price).join(', '),
      },
      {
        name: "Item Name",
        cell: ({ order_rec }: any) => order_rec?.map((item: any) => item.item_name).join(', '),

      },
      {
        name: "Quantity",
        cell: ({ order_rec }: any) => order_rec?.map((item: any) => item.quantity).join(', '),

      },
      {
        name: "Total Price",
        cell: ({ order_rec }: any) => order_rec?.map((item: any) => item.totalPrice).join(', '),

      },
      {
        name: "Total Balance",
        cell: ({ totalBalance }: any) => totalBalance,


      },
      {
        name: "Time",
        cell: ({ time }: any) => time,
      },
    ];

    if (activeTab === 'pendingOrders' ) {
      dynamicColumns.push({
        name: "Operations",
        cell: ({ _id }: any) => (
          <div className='d-flex gap-2'>
            <ToolTipDetails
              data={"Cancel Order"}
              data1={
                <Icon
                  icon={cancelledButtonIcon}
                  className="cursor-pointer"
                  action={() => {
                    setShowModal(true)
                    setIdd(_id)

                  }}
                />} />
            <ToolTipDetails
              data={"Confirm Order"}
              data1={
                <Icon
                  icon={confirmedButton}
                  action={() => {
                    setShowConfirmModal(true)
                    setIdd(_id)

                  }}
                />} />
          </div>
        ),
      });
    }

    return dynamicColumns;
  }, [activeTab, dispatch]);


  const handleTabClick: any = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === 'customerOrders') {
      dispatch(CustomerListData({}));
    } else if (tabName === 'pendingOrders' && employeeList?.data?.role!="User") {
      dispatch(PendingOrderListData({}));
    }
  };
  useEffect(() => {

    dispatch(CustomerListData({ limit: perPage, currentPage: currentPage, search: searchValue }));
    if(employeeList?.data?.role!="User"){

      dispatch(PendingOrderListData({ limit: perPage, currentPage: currentPage, search: searchValue }));
    }
  }, [paginationPerDetails, searchValue]);
  return (
    <div className='p-4 '>


      {showModal && (
        //modal for cancel order
                <ModalShow
                  handleView={showModal}
                  title="Cancel Order"
                  title1={
                   "Are You Sure You Want to Cancel Order?"
                  }
                  title2="Cancel"
                  handleApi={(_id:any)=>{
                    dispatch(UpdateStatusOrderListData({ status: "cancelled", order_id:idd }))
                    ToastifyShow("Order Cancelled", "success");
                    setShowModal(false);

                  }}
                  handleClose={() => {

                    setShowModal(false);
                  }}
                />
              )}
        {showConfirmModal && (
        //modal for confirm order
                <ModalShow
                  handleView={showConfirmModal}
                  title="Confirm Order"
                  title1={
                   "Are You Sure You Want to Confirm Order?"
                  }
                  title2="Confirm"
                  handleApi={(_id:any)=>{
                    dispatch(UpdateStatusOrderListData({ status: "confirm", order_id:idd }))
                    ToastifyShow("Order Confirmed", "success");
                    setShowConfirmModal(false);

                  }}
                  handleClose={() => {

                    setShowConfirmModal(false);
                  }}
                />
              )}
      <Nav variant="pills" defaultActiveKey="customerOrders" onSelect={handleTabClick} className='gap-5 '>
        <Nav.Item>


          <Nav.Link eventKey="customerOrders"  >Orders History</Nav.Link>

        </Nav.Item>
        <Nav.Item>
          {
           employeeList?.data?.role!="User" &&
            <Nav.Link eventKey="pendingOrders"  >Pending Orders</Nav.Link>
          }
        </Nav.Item>
      </Nav>
      <div className='justify-content-end d-flex'>

        <InputSearch
          placeholder="Search here"
          className="text-center w-100 "
          showValue={searchValue}
          addValue={(e: any) => setSearchValue(e.target.value)}
        />
      </div>


      <DataTable
        columns={columns}
        data={activeTab === 'customerOrders' ? customerOrders?.data : pendingOrders?.data}
        pagination
        paginationPerPage={paginationPerDetails?.perPage}
        responsive
        paginationServer
        onChangeRowsPerPage={(data) => {
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
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
        paginationTotalRows={customerOrders?.totalRecords}

        highlightOnHover={true}
        fixedHeader
        fixedHeaderScrollHeight="550px"
        onChangePage={(data) => {
          setPaginationPerDetails({
            ...paginationPerDetails,
            currentPage: data-1,
          });
        }}
      />


{employeeList?.data?.role=="User" && <ChatBot/>}
    </div>
  )
}

export default UserList

