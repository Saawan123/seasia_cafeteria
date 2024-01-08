
import './Dashboard.scss'; // Import your CSS file for styling
import HighChartDetails from '../../components/HighCharts';
import { DashboardData } from '../../store/Dashboard/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Spinner } from 'react-bootstrap';
import InputSearch from '../../components/InputSearch';
import BoxDetails from '../../components/BoxDetails';
import burger from "../../assets/burger.png"
import dummyImage from "../../assets/dummyImage.png";
import juice from "../../assets/juice.png";
import '../login.scss'
import { TotalMenusIcon, TotalOrdersIcon, eatFresh, pendingOrderIcon, stayHealthy, totalCustomerIcon } from '../../lib/icon';
import Icon from '../../components/Icon';

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [leadType, setLeadType] = useState("transactions");
    const { dashboardList, loading } = useSelector((state: any) => state?.dashboardDataShow);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        dispatch(DashboardData({ search: searchValue }))
    }, [searchValue])

    const columns = useMemo(
        () => [
            {
                name: "Item Name",
                cell: ({ _id }: any) => _id,
            },
            {
                name: "Quantity",
                cell: ({ count }: any) => count,
            },
            // {
            //     name: "Total Price",
            //     cell: ({  }: any) => "₹" + 20
            // },
        ],
        []
    );

    const marketingDetails =

        [
            {
                title: TotalMenusIcon,
                title1: dashboardList?.data?.[0]?.today_menu_items,
                boxColor: "#45CB85",
                bgcolor: "#f6fcf6",
                name: "Total Menus",
            },



            {
                title: TotalOrdersIcon,
                title1: dashboardList?.data?.[0]?.total_orders,

                boxColor: "#45CB85",
                bgcolor: "#f6fcf6",
                name: "Total Orders",
            },
            {
                title: pendingOrderIcon,
                title1:dashboardList?.data?.[0]?.pendingOrder,
                // title1: "0",
                boxColor: "#DA4371",
                bgcolor: "rgb(254, 245, 248)",
                name: "Pending Orders",
            },
            {
                title: totalCustomerIcon,
                title1: dashboardList?.data?.[0]?.total_users,
                name: "Total Customers",
                boxColor: "#4B38B3",
                bgcolor: "rgb(246, 245, 251)",
            },

        ]
    return (

        <div >
            <div className="p-2 mt-2 overflow-hidden">
                <div className='justify-content-between d-flex'>
                    <h1 className=' ms-4'>Seasia Cafeteria</h1>

                    <InputSearch
                        placeholder="Search here"
                        className="text-center w-100 "
                        showValue={searchValue}
                        addValue={(e: any) => setSearchValue(e.target.value)}
                    />
                </div>
                {/* <div className="middle-card w-100 d-flex justify-content-between">
                    <div>
                        <div>
                            <Icon icon={eatFresh} />
                        </div>
                        <div>
                            <Icon icon={stayHealthy} />
                        </div>
                        <div className="mt-2">
                            <Button
                                variant="outline-primary"
                                type="submit"
                                className="order-button fs-6"
                            >
                                Order Now
                            </Button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between ">
                        <img
                            src={juice}
                            alt="profile Pic"
                            loading={"lazy"}
                            style={{ height: "130px", width: "130px", marginTop: "70px" }}
                            draggable={false}
                        />

                        <img
                            src={dummyImage}
                            alt="profile Pic"
                            loading={"lazy"}
                            style={{ height: "250px" }}
                            draggable={false}
                            className="mb-4"
                        />

                        <img
                            src={burger}
                            alt="profile Pic"
                            loading={"lazy"}
                            style={{ height: "120px", marginTop: "80px" }}
                            draggable={false}
                        />
                    </div>
                </div> */}
                <div className="mt-3 upper-card m-4 p-4 ">
        <div>
          <p className="eat  d-flex gap-3">
            Eat
            <p className="fresh">
              Fresh
            </p>

          </p>
          <div>
            <p className="stay-young">Stay Young</p>
          </div>
          <div className="mt-2">
            <Button
              variant="outline-primary"
              type="submit"
              className="order-button fs-6 mt-5"
            >
              Order Now
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-between ">
          <img
            src={juice}
            alt="profile Pic"
            loading={"lazy"}
            style={{
              width: '185.923px',
              marginTop: '235px',
              height: '185.923px',
              marginRight: '-87px',
              marginLeft: '100px',
              transform: 'rotate(-3.388deg)',
              flexShrink: 0,
            }}
            draggable={false}
          />

          <img
            src={dummyImage}
            alt="profile Pic"
            loading={"lazy"}
            style={{
              width: '484px',
              height: '454px',
              marginLeft: '30px',
              flexShrink: 0 
            }}

            draggable={false}
            className="mb-4"
          />

          <img
            src={burger}
            alt="profile Pic"
            loading={"lazy"}
            style={{
              // width: '225.836px',
              height: '225.836px',
              marginTop: '129px',
              marginLeft: '-80px',
              transform: 'rotate(0.596deg)',
              flexShrink: 0
            }}

            draggable={false}
          />
        </div>
      </div>
               

                    <div className='mt-4 m-4'>
                 
                        <BoxDetails
                            data={marketingDetails}
                            setOption={setLeadType}
                            option={leadType}
                        />
                </div>
            </div>

            <div className='m-4 row gap-4'>
                <div className='d-flex gap-3'>
                    
                    <div className='w-100 Card'>
                        <label className="mb-3 fw-bold fs-2">Total Revenue: {dashboardList?.data?.[0]?.total_revenue}</label>
                        <HighChartDetails chart={2} />
                    </div>

                </div>
            </div>
            <h5 className='d-flex justify-content-center'>Recent Orders Items Requested</h5>
            <div className='ms-3'>

                <DataTable
                    columns={columns}
                    data={dashboardList?.data?.[0]?.mostOrderItem}
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
        </div>
    );
};

export default Dashboard;
