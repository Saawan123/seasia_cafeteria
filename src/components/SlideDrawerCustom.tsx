
import ToastifyShow from "./ToastifyShow";
import "./slideDrawer.scss";
import {  ConfirmOrderedData } from "../store/ConfirmOrder/ConfirmOrderSLice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import Icon from "./Icon";
import { deleteIcon } from "../lib/icon";

const SlideDrawerCustom = ({ show, orderItems, onClose, selectedMenuItem,  setOrderItems }: any) => {
  console.log(selectedMenuItem, "selecteeeeeeeeeeeeee")
  
//   const { menusList } = useSelector((state: any) => state?.MenuListToday);
  const { subMenus } = useSelector((state: any) => state?.MenuList);
  console.log(subMenus,"siubmenussssss")
  const handleClose = () => {
    onClose(); // Call the onClose function passed from the parent component to close the drawer
  };
  const dispatch = useDispatch<AppDispatch>();

  const { addOrder } = useSelector((state: any) => state?.confirmOrderList);
  // console.log(addOrder, "jjjjjj")
  const handleOrderItem = () => {
    const formattedOrderRec = subMenus?.data?.flatMap((menu:any) =>
        menu.items.map((item:any) => {
          const quantity = orderItems.filter(
            (order:any) => order === `${item.item_name} ₹${item.price}`
          ).length;
  
          return quantity > 0 ? { itemId: item._id, quantity } : null;
        })
      )
      .filter(Boolean);
  
    dispatch(ConfirmOrderedData({ bill_status: "unpaid", order_rec: formattedOrderRec }));
    handleClose();
    ToastifyShow("Items confirmed successfully", "success");
  };
  
  
  
  

  const totalPrice = orderItems.reduce((total: number, item: any) => {
    console.log(total, "eeeeee", item)
    // Extract the price from the item string and add it to the total
    const price = parseFloat(item.split('₹')[1]); // Extract the price from the item string
    console.log(price, "priceeeeeee", item, total)
    return total + price;
  }, 0);
  console.log(orderItems, "orderItemssss")
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
            {console.log(orderItems, "orderItems")}
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

export default SlideDrawerCustom