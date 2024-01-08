
import ToastifyShow from "./ToastifyShow";
import "./slideDrawer.scss";
import {  ConfirmOrderedData } from "../store/ConfirmOrder/ConfirmOrderSLice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import Icon from "./Icon";
import { deleteIcon } from "../lib/icon";

const SlideDrawer = ({ show, orderItems, onClose, selectedMenuItem,  setOrderItems }: any) => {
  
  const { menusList } = useSelector((state: any) => state?.MenuListToday);

  const handleClose = () => {
    setOrderItems([])
    onClose(); // Call the onClose function passed from the parent component to close the drawer
  };
  const dispatch = useDispatch<AppDispatch>();
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
    // dispatch(AddTodayOrderedData({ order_rec }))
    // Close the drawer and show a success message
    handleClose();
    setOrderItems([])
    ToastifyShow("Items confirmed successfully", "success");
  };

  const totalPrice = orderItems.reduce((total: number, item: any) => {
    // Extract the price from the item string and add it to the total
    const price = parseFloat(item.split('₹')[1]); // Extract the price from the item string
    return total + price;
  }, 0);
  let drawerClasses = show ? "side-drawer open" : "side-drawer";
  const handleDeleteItem = (index: number) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems.splice(index, 1); // Remove the item at the specified index
    setOrderItems(updatedOrderItems); // Update the orderItems state to reflect the deletion
  };
  return (
    <div className={drawerClasses}>
      <p>Order Details</p>
      <div className="gap-3  p-4 row" >
        {orderItems?.map((item: any, index: any) => (

          <div className="inputField " key={index}>
            {item}
            <Icon
              icon={deleteIcon}
              styleClass={"cursor-pointer mt-4 p-1"}
              action={() => handleDeleteItem(index)}
            />
          </div>

        ))}
      </div>
      <div className="inputField d0">Total : ₹{totalPrice.toFixed(2)}</div>
      {/* {activeMenu === "custom" && <div >
        <label>Enter Employee ID</label>
        <input name="emp_id" type="text" />
      </div>} */}
      <div className="d-flex gap-5">

        <button type="submit" className="order-button" onClick={handleOrderItem}>Confirm Order</button>
        <button type="submit" className="order-button" onClick={handleClose} >Cancel</button>
      </div>
    </div>
  );
};

export default SlideDrawer