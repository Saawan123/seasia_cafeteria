
import './Dashboard.scss'; // Import your CSS file for styling
import HighChartDetails from '../../components/HighCharts';
import { DashboardData } from '../../store/Dashboard/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { Spinner } from 'react-bootstrap';

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { dashboardList, loading } = useSelector((state: any) => state?.dashboardDataShow);

    useEffect(() => {
        dispatch(DashboardData({}))
    }, [])

    const columns = useMemo(
        () => [
            {
                name: "Item Name",
                cell: ({ item_name }: any) => item_name,
            },
            {
                name: "Quantity",
                cell: ({ count }: any) => 24,
            },
            {
                name: "Total Price",
                cell: ({ price }: any) =>"₹" + price
            },
        ],
        []
    );


    return (

        <div >
            <h1 className='text-center'>Seasia Cafeteria</h1>
            <div className='ms-5'>
                <div className='ms-5 ps-5'>
                    <div className='d-flex gap-5 p-3'>
                        <div className="col-lg-4 col-xl-4 ">
                            <div className="bg-white1 Card">
                                <label className="mb-3 fw-bold fs-2">Total Menus</label>
                                {<HighChartDetails chart={1} />}
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-4  ">
                            <div className="bg-white1 Card">
                                <label className="mb-3 fw-bold fs-2">Total Orders</label>
                                <HighChartDetails chart={2} />
                            </div>
                        </div>
                    </div>
                    <div className='d-flex gap-5 p-3'>
                        <div className="col-lg-4 col-xl-4 ">
                            <div className="bg-white1 Card">
                                <label className="mb-3 fw-bold fs-2">Pending Orders</label>
                                <HighChartDetails chart={3} />
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-4 ">
                            <div className="bg-white1 Card">
                                <label className="mb-3 fw-bold fs-2">Total Customers</label>
                                <HighChartDetails chart={3} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h5 className='d-flex justify-content-center'>Recent Orders Items Requested</h5>
            <div>

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
