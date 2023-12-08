
import './Dashboard.scss'; // Import your CSS file for styling
import HighChartDetails from '../../components/HighCharts';

const Dashboard=() => {
 
  return (
      <div >
        <h1 className='text-center'>Seasia Cafeteria</h1>
        <div className='d-flex gap-5 p-3'>

        
       <div className="col-lg-6 col-xl-4 fw-semibold fs-4 ">
            <div className="bg-white1 Card">
              <label className="mb-3 ms-1">Total Sales</label>
              <HighChartDetails chart={1} />
            </div>
          </div>
          <div className="col-lg-6 col-xl-4 fw-semibold fs-4 ">
            <div className="bg-white1 Card">
              <label className="mb-3">Sales by Month</label>
              <HighChartDetails chart={2} />
            </div>
          </div>
          <div className="col-lg-6 col-xl-4 ">
            <div className="bg-white1 Card">
              
                <label className="fw-semibold  fs-4">Cafeteria Sales</label>
              
        
              <div className="p-3">
                <HighChartDetails chart={3} />
              </div>
            </div>
          </div>
          </div>
    </div>
  );
};

export default Dashboard;
