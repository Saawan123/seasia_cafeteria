
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
    console.log(dashboardList, "jujuj")
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        dispatch(DashboardData({ search: searchValue }))
    }, [searchValue])

    const columns = useMemo(
        () => [
            {
                name: "Item Name",
                cell: ({ item_name }: any) => item_name,
            },
            {
                name: "Quantity",
                cell: ({ count }: any) => count,
            },
            {
                name: "Total Price",
                cell: ({ price }: any) => "₹" + price
            },
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
            <div className="p-2 mt-2">
                <div className='justify-content-between d-flex'>
                    <h1 className=' ms-4'>Seasia Cafeteria</h1>

                    <InputSearch
                        placeholder="Search here"
                        className="text-center w-100 "
                        showValue={searchValue}
                        addValue={(e: any) => setSearchValue(e.target.value)}
                    />
                </div>
                <div className="middle-card w-100 d-flex justify-content-between">
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
                            style={{ height: "100px", width: "100px", marginTop: "70px" }}
                            draggable={false}
                        />

                        <img
                            src={dummyImage}
                            alt="profile Pic"
                            loading={"lazy"}
                            style={{ height: "180px" }}
                            draggable={false}
                            className="mb-4"
                        />

                        <img
                            src={burger}
                            alt="profile Pic"
                            loading={"lazy"}
                            style={{ height: "100px", marginTop: "70px" }}
                            draggable={false}
                        />
                    </div>
                </div>
                <div >

                    <div className="d-flex justify-content-between mt-4  align-items-center">
                    </div>
                    <BoxDetails
                        data={marketingDetails}
                        setOption={setLeadType}
                        option={leadType}
                    />
                </div>
            </div>

            <div className='m-5 row gap-4'>
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
