import { useEffect, useMemo, useState } from 'react'
import { Nav, NavItem, NavLink, Spinner } from 'react-bootstrap';
import "../login.scss"
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { CustomerListData, PendingOrderListData } from '../../store/todayMenu/todayMenuSlice';
import { EditIcon } from '../../lib/icon';
import Icon from '../../components/Icon';

const UserList = () => {
  const [activeTab, setActiveTab] = useState('customerOrders'); // State to track active tab

  const dispatch = useDispatch<AppDispatch>();
  const { customerOrders, loading, pendingOrders } = useSelector((state: any) => state?.MenuListToday);
  console.log(customerOrders, "userrrrrr")
  const columns: any = useMemo(
    () => [
      // {
      //   name: "_id",
      //   sortable: true,

      //   cell: ({ _id }: any) => _id,
      // },
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
        name: "Date",

        cell: ({ date }: any) => date,



      },
      {
        name: "Time",

        cell: ({ time }: any) => time,



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
const handleTabClick :any= (tabName: string) => {
  setActiveTab(tabName);
  if (tabName === 'customerOrders') {
    dispatch(CustomerListData({ emp_id: 3751 }));
  } else if (tabName === 'pendingOrders') {
    dispatch(PendingOrderListData({ emp_id: 3751 }));
  }
};
  useEffect(() => {

    dispatch(CustomerListData({ emp_id: 3751 }));
    dispatch(PendingOrderListData({ emp_id: 3751 }));
  }, []);
  return (
    <div className='p-4 '>
<Nav variant="pills" defaultActiveKey="customerOrders" onSelect={handleTabClick} className='gap-5'>
<Nav.Item>
  <Nav.Link eventKey="customerOrders" className='button-color'>Customer Orders</Nav.Link>
</Nav.Item>
<Nav.Item>
  <Nav.Link eventKey="pendingOrders" className='button-color rounded'>Pending Orders</Nav.Link>
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

 {activeTab === 'pendingOrders' && ( <DataTable
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

