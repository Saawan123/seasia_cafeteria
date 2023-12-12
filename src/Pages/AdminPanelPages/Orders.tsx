import { useEffect, useMemo, useState } from 'react'
import { Nav, NavItem, NavLink, Spinner } from 'react-bootstrap';
import "../login.scss"
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { CustomerListData, PendingOrderListData, UpdateStatusOrderListData } from '../../store/todayMenu/todayMenuSlice';
import { EditIcon, cancelledButtonIcon, confirmedButton } from '../../lib/icon';
import Icon from '../../components/Icon';
import ToastifyShow from '../../components/ToastifyShow';
import ToolTipDetails from '../../components/ToolTipDetails';

const UserList = () => {
  const [activeTab, setActiveTab] = useState('customerOrders');
  const dispatch = useDispatch<AppDispatch>();
  const { customerOrders, loading, pendingOrders } = useSelector((state: any) => state?.MenuListToday);
  // console.log(pendingOrders?.data, "userrrrrr")
  // const columns: any = useMemo(
  //   () => [
  //     // {
  //     //   name: "_id",
  //     //   sortable: true,
  //     //   cell: ({ _id }: any) => _id,
  //     // },
  //     {
  //       name: "Employee ID",
  //       cell: ({ emp_id }: any) => emp_id,

  //     },
  //     {
  //       name: "Menu ID",
  //       cell: ({ menu_id }: any) => menu_id,

  //     },
  //     {
  //       name: "Order Status",
  //       cell: ({ order_status }: any) => order_status,
  //     },

  //     {
  //       name: "Bill Status",
  //       cell: ({ bill_status }: any) => bill_status,
  //     },
  //     {
  //       name: "Price",
  //       cell: ({ order_rec }: any) => order_rec?.map((item: any) => item.price).join(', '),
  //     },
  //     {
  //       name: "Item Name",
  //       cell: ({ order_rec }: any) => order_rec?.map((item: any) => item.item_name).join(', '),

  //     },
  //     {
  //       name: "Quantity",
  //       cell: ({ order_rec }: any) => order_rec?.map((item: any) => item.quantity).join(', '),

  //     },
  //     {
  //       name: "Total Price",
  //       cell: ({ order_rec }: any) => order_rec?.map((item: any) => item.totalPrice).join(', '),

  //     },
  //     {
  //       name: "Total Balance",
  //       cell: ({ totalBalance }: any) => totalBalance,


  //     },
  //     {
  //       name: "Date",
  //       cell: ({ date }: any) => date,

  //     },
  //     {
  //       name: "Time",
  //       cell: ({ time }: any) => time,

  //     },
  //      {
  //       name:  "Operations",

  //       cell: ({ }: any) => 
  //      <div className='d-flex gap-2'>
  //    <ToolTipDetails
  //       data={"Cancel Order"}
  //       data1={
  //         <Icon
  //         icon={ cancelledButtonIcon}
  //         className="cursor-pointer"
  //         action={() => {
  //           dispatch(UpdateStatusOrderListData({status:"cancelled"}))
  //           ToastifyShow("Order Cancelled","success");

  //           }}
  //           />}/>
  //    <ToolTipDetails
  //       data={"Confirm Order"}
  //       data1={
  //         <Icon
  //   icon={confirmedButton}
  // action={() => {
  //   dispatch(UpdateStatusOrderListData({status:"confirmed"}))
  //     ToastifyShow("Order Confirmed","success");
  //   }}
  //   />}/>

  //       </div>

  //     },

  //   ],
  //   []
  // );


  const columns: any = useMemo(() => {
    let dynamicColumns = [
      {
        name: "Employee ID",
        cell: ({ emp_id }: any) => emp_id,
      },
      {
        name: "Menu ID",
        cell: ({ menu_id }: any) => menu_id,

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

    if (activeTab === 'pendingOrders') {
      dynamicColumns.push({
        name: "Operations",
        cell: ({_id }: any) => (
          <div className='d-flex gap-2'>
            <ToolTipDetails
              data={"Cancel Order"}
              data1={
                <Icon
                  icon={cancelledButtonIcon}
                  className="cursor-pointer"
                  action={() => {
                    dispatch(UpdateStatusOrderListData({ status: "cancelled", order_id:_id  }))
                    ToastifyShow("Order Cancelled", "success");

                  }}
                />} />
            <ToolTipDetails
              data={"Confirm Order"}
              data1={
                <Icon
                  icon={confirmedButton}
                  action={() => {
                    dispatch(UpdateStatusOrderListData({ status: "confirm", order_id:_id }))
                    ToastifyShow("Order Confirmed", "success");
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
    } else if (tabName === 'pendingOrders') {
      dispatch(PendingOrderListData({}));
    }
  };
  useEffect(() => {

    dispatch(CustomerListData({}));
    dispatch(PendingOrderListData({}));
  }, []);
  return (
    <div className='p-4 '>
      <Nav variant="pills" defaultActiveKey="customerOrders" onSelect={handleTabClick} className='gap-5 '>
        <Nav.Item>


          <Nav.Link eventKey="customerOrders"  >Orders History</Nav.Link>

        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="pendingOrders"  >Pending Orders</Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === 'customerOrders' && (
        <DataTable
          columns={columns}
          data={customerOrders?.data}
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
        />)}

      {activeTab === 'pendingOrders' && (<DataTable
        columns={columns}
        data={pendingOrders?.data}
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
      />)}
    </div>
  )
}

export default UserList

