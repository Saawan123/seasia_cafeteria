import { toast } from "react-toastify";
import ToastifyShow from "./ToastifyShow";
import "./slideDrawer.scss";
import { ConfirmOrderedData } from "../store/ConfirmOrder/ConfirmOrderSLice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
const SlideDrawer = ({ show, orderItems, onClose, selectedMenuItem }: any) => {
  console.log(selectedMenuItem, "selecteeeeeeeeeeeeee")
  const { menusList } = useSelector((state: any) => state?.MenuListToday);
  console.log(menusList,"menusListmenusList")
  const { subMenus } = useSelector((state: any) => state?.MenuList);

  const handleClose = () => {
    onClose(); // Call the onClose function passed from the parent component to close the drawer
  };
  const dispatch = useDispatch<AppDispatch>();
 
  const { addOrder } = useSelector((state: any) => state?.confirmOrderList);
  console.log(addOrder, "jjjjjj")
  const handleOrderItem = () => {
    const order_rec = menusList?.data?.flatMap((menu: any) => {
      if (menu?.title === selectedMenuItem) {
        return menu?.items?.map((item: any) => {
          // Check if the item exists in the orderItems array
          const itemExists = orderItems.includes(`${item?.item_name} ₹${item?.price}`);
          return {
            itemId: item?._id,
            quantity: itemExists ? orderItems.filter((x: string) => x === `${item?.item_name} ₹${item?.price}`).length : 0,
          };
        });
      }
      return [];
    }).filter((x: any) => x.quantity > 0); // Filter out items with zero quantity

    // Dispatch the ConfirmOrderedData action with the gathered orderData
    dispatch(ConfirmOrderedData({ order_rec }));

    // Close the drawer and show a success message
    handleClose();
    ToastifyShow("Items confirmed successfully", "success");
  };


  console.log(orderItems, "orderItemssss")
  let drawerClasses = show ? "side-drawer open" : "side-drawer";

  return (
    <div className={drawerClasses}>
      <p>Order Details</p>
      <div className="gap-3  p-4 row" >
        {orderItems?.map((item: any, index: any) => (

          <div className="inputField " key={index}>
            {console.log(orderItems, "orderItems")}
            {item}</div>
        ))}
      </div>
      <div className="inputField d0">Total : ₹{ }</div>
      <div className="d-flex gap-5">

        <button type="submit" className="order-button" onClick={handleOrderItem}>Confirm Order</button>
        <button type="submit" className="order-button" onClick={handleClose} >Cancel</button>
      </div>
    </div>
  );
};

export default SlideDrawer;

