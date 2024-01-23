
import ToastifyShow from "./ToastifyShow";
import "./slideDrawer.scss";
import { AddTodayOrderedData } from "../store/ConfirmOrder/ConfirmOrderSLice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import Icon from "./Icon";
import { deleteIcon, emptyCart } from "../lib/icon";
import { Button } from "react-bootstrap";

const TodayCartBar = ({ show, orderItems, onClose, selectedMenuItem, setOrderItems }: any) => {

    const { subMenus } = useSelector((state: any) => state?.MenuList);
    const handleClose = () => {
        setOrderItems([])
        onClose();
    };
    const dispatch = useDispatch<AppDispatch>();

    const { addOrder } = useSelector((state: any) => state?.confirmOrderList);
    const handleOrderItem = () => {
        const formattedOrderRec = subMenus?.data?.flatMap((menu: any) => {
            if (menu?.title === selectedMenuItem?.title) {
                return menu?.items?.map((subMenuItem: any) => {
                    const item = subMenuItem; // Assuming subMenuItem holds the item details

                    const itemExists = orderItems.find(
                        (orderedItem: any) => orderedItem.itemName === item?.item_name
                    );

                    return {
                        itemId: item?._id,
                        quantity: itemExists ? itemExists.quantity : 0,
                    };
                });
            }
            return [];
        }).filter((x: any) => x.quantity > 0);
        const itemIdArray = formattedOrderRec.map((item: any) => item.itemId);
        dispatch(AddTodayOrderedData({ menuType: selectedMenuItem?._id, sub_menu_items: itemIdArray }));


        handleClose();
        setOrderItems([]);
        ToastifyShow("Items confirmed successfully", "success");
    };


    const totalOrderPrice = orderItems.length > 0 ?
        orderItems.reduce(
            (total: number, orderedItem: any) =>
                total + orderedItem.itemPrice,
            0
        ) : 0;
    const handleIncrementQuantity = (index: number) => {
        console.log("flow999")
        const updatedOrderItems = [...orderItems];
        updatedOrderItems[index].quantity += 1;

        if (updatedOrderItems[index].quantity > 0) {
            console.log("flow333", updatedOrderItems[index].quantity)
            updatedOrderItems[index].itemPrice = (updatedOrderItems[index].itemPrice * updatedOrderItems[index].quantity) / (updatedOrderItems[index].quantity - 1);
        }
        console.log("flowoutsideupper", updatedOrderItems)
        setOrderItems(updatedOrderItems);
    };

    const handleDecrementQuantity = (index: number) => {
        const updatedOrderItems = [...orderItems];
        if (updatedOrderItems[index].quantity > 0) {
            console.log("flow11")
            updatedOrderItems[index].quantity -= 1;

            if (updatedOrderItems[index].quantity === 0) {
                console.log("flow22")
                updatedOrderItems[index].itemPrice = 0;
                // updatedOrderItems[index].itemName = "";
            } else {
                console.log("flow here")
                updatedOrderItems[index].itemPrice = (updatedOrderItems[index].itemPrice * updatedOrderItems[index].quantity) / (updatedOrderItems[index].quantity + 1);
            }
            console.log(updatedOrderItems, "flowwwwwwww")
            setOrderItems(updatedOrderItems);
        }
    };


    let drawerClasses = show ? "side-drawer open" : "side-drawer";
    const handleDeleteItem = (index: number) => {
        const updatedOrderItems = [...orderItems];
        updatedOrderItems.splice(index, 1); 
        setOrderItems(updatedOrderItems); 
    };
    return (
        <div className={drawerClasses} style={{overflowY: "auto" }}>
            <p>Order Details</p>
            <div className="gap-3 p-4 row">
                <div className="gap-3 p-4 row">
                    {orderItems?.map((orderedItem: any, index: number) => (
  
                        orderedItem.quantity > 0 && (
                            <div className="inputField" key={index}>
                                <p>{orderedItem?.itemName}</p>
                                <button onClick={() => handleDecrementQuantity(index)}>-</button>
                                <p>Qty: {orderedItem?.quantity}</p>
                                <button onClick={() => handleIncrementQuantity(index)}>+</button>
                                <p>Price: ₹{orderedItem?.itemPrice}</p>
                                <Icon
                                    icon={deleteIcon}
                                    styleClass={"cursor-pointer mt-4 p-1"}
                                    action={() => handleDeleteItem(index)}
                                />
                            </div>
                        )
                    ))}
                </div>

            </div>

            {orderItems.length === 0 &&
      <div className="text-center mt-5 ">
      <p className="mt-5">

        {emptyCart}
      </p>
        <p className="eat fs-3 ">
      Your cart is empty !</p>
      <Button onClick={()=>{onClose()}}           className="button-color fs-6 fw-bold w-25 mt-4"
> Add Items </Button> 
      </div>}
           { orderItems.length != 0 && <div className="inputField d0">
               <p>Total: ₹{totalOrderPrice}</p>
            </div>}
            {orderItems.length != 0 &&  <div className="d-flex gap-5">
                <button type="submit" className="order-button" onClick={handleOrderItem}>
                    Confirm Order
                </button>
                <button type="submit" className="order-button" onClick={handleClose}>
                    Cancel
                </button>
            </div>}
        </div>
    );;
};

export default TodayCartBar