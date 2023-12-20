import React from 'react';
import ToastifyShow from './ToastifyShow';
import './slideDrawer.scss';
import { useDispatch, useSelector } from 'react-redux';
import Icon from './Icon';
import { deleteIcon } from '../lib/icon';

const CommonCart = ({
  show,
  orderItems,
  onClose,
  selectedMenuItem,
  setOrderItems,
  subMenuSelector,
  confirmOrderAction,
}:any) => {
  const subMenus:any = useSelector(subMenuSelector);
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
  };

  const handleOrderItem = () => {
    const formattedOrderRec = subMenus?.data?.flatMap((menu:any) =>
      menu.items.map((item:any) => {
        const quantity = orderItems.filter(
          (order:any) => order === `${item.item_name} ₹${item.price}`
        ).length;

        return quantity > 0 ? { itemId: item._id, quantity } : null;
      })
    ).filter(Boolean);

    dispatch(confirmOrderAction({ bill_status: 'unpaid', order_rec: formattedOrderRec }));
    handleClose();
    ToastifyShow('Items confirmed successfully', 'success');
  };

  const totalPrice = orderItems.reduce((total:any, item:any) => {
    const price = parseFloat(item.split('₹')[1]);
    return total + price;
  }, 0);

  const handleDeleteItem = (index:any) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems.splice(index, 1);
    setOrderItems(updatedOrderItems);
  };

  return (
    <div className={show ? 'side-drawer open' : 'side-drawer'}>
      <p>Order Details</p>
      <div className="gap-3 p-4 row">
        {orderItems?.map((item:any, index:any) => (
          <div className="inputField" key={index}>
            {item}
            <Icon
              icon={deleteIcon}
              styleClass={'cursor-pointer mt-4 p-1'}
              action={() => handleDeleteItem(index)}
            />
          </div>
        ))}
      </div>
      <div className="inputField d0">Total : ₹{totalPrice.toFixed(2)}</div>
      <div className="d-flex gap-5">
        <button type="submit" className="order-button" onClick={handleOrderItem}>
          Confirm Order
        </button>
        <button type="submit" className="order-button" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CommonCart;
