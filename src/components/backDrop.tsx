
import "./backdrop.scss";

const BackDrop = (props:any) => {
  console.log(props,"hjhjhjhj")
  return <div className="backdrop" onClick={props.closeDrawer}></div>;
};

export default BackDrop;
