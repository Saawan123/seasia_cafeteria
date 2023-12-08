import './adminPanel.scss'
import Sidebar from '../components/SideBar';
import Dashboard from './AdminPanelPages/Dashboard';

export default (props:any) => {
  console.log(props,"propsss")
  return (
<>
<Dashboard/>
</>
      
 
  );
};