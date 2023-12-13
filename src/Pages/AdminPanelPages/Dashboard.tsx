
import './Dashboard.scss'; // Import your CSS file for styling
import HighChartDetails from '../../components/HighCharts';
import { DashboardData } from '../../store/Dashboard/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Spinner } from 'react-bootstrap';
import InputSearch from '../../components/InputSearch';

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { dashboardList, loading } = useSelector((state: any) => state?.dashboardDataShow);
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


    return (

        <div >
            <div className='justify-content-end d-flex'>

                <InputSearch
                    placeholder="Search here"
                    className="text-center w-100 "
                    showValue={searchValue}
                    addValue={(e: any) => setSearchValue(e.target.value)}
                />
            </div>
            <h1 className='text-center'>Seasia Cafeteria</h1>
            {/* <div className='ms-5'>
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
            </div> */}
   <div className='m-5 d-flex gap-2'>
               <div className='w-50 Card h-25'>

                                <label className="mb-3 fw-bold fs-2">Total Menus</label>
                                <HighChartDetails chart={1} />
                     
                                <label className="mb-3 fw-bold fs-2">Total Orders</label>
                                <HighChartDetails chart={2} />
               </div> 
               <div className='w-50 Card'>

                                <label className="mb-3 fw-bold fs-2">Pending Orders</label>
                                <HighChartDetails chart={3} />
                            
                                <label className="mb-3 fw-bold fs-2">Total Customers</label>
                                <HighChartDetails chart={2} />
                       
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
