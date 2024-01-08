
import "./backdrop.scss";

const BackDrop = (props:any) => {

  return <div className="backdrop" onClick={props.closeDrawer}></div>;
};

export default BackDrop;
