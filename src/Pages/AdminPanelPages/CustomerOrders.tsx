import { useEffect, useState } from "react";

import { Nav, } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";

import "../login.scss";
import Icon from "../../components/Icon";
import {  cartIcon } from "../../lib/icon";

import {  SubMenuListData } from "../../store/Menu/menuSlice";
import SlideDrawer from "../../components/slideDrawer";
import BackDrop from "../../components/backDrop";

const CustomerOrders = () => {
  const { subMenus } = useSelector((state: any) => state?.MenuList);
  const [selectedMenuItem, setSelectedMenuItem]:any = useState("Breakfast");
  const [orderItems, setOrderItems] = useState<string[]>([]);

  const [activeMenu, setActiveMenu] = useState("Breakfast");
  const dispatch = useDispatch<AppDispatch>();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // dispatch(TodaysMenuListData({}));
    dispatch(SubMenuListData({  }));
  }, [dispatch]);
  function handleOpenDrawerButton() {
 
    setDrawerOpen(!drawerOpen);
  }
  function handleBackdropClick() {
    setDrawerOpen(false);
  }
  const handleMenuClick = (menuItem: string) => {
    const selectedMenu = subMenus?.data?.find((menu: any) => menu.title === menuItem);
    if (selectedMenu) {
      setSelectedMenuItem(selectedMenu);
      setActiveMenu(menuItem);
      dispatch(SubMenuListData({ menu_id: selectedMenu._id })); 
    }
  };

  const addItemToOrder = (itemName: string) => {
    const updatedOrder = [...orderItems, itemName];
    setOrderItems(updatedOrder);
  };
  return (
    <div>

    <Nav variant="pills" className="justify-content-around mt-4">
        <Nav.Item>

          <Nav.Link  
           className={`${activeMenu === "Breakfast" ? "active" : ""} ` }
           onClick={() => handleMenuClick("Breakfast")}
          >Breakfast</Nav.Link>
      
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={`${activeMenu === "Lunch" ? "active" : ""}`}
            onClick={() => handleMenuClick("Lunch")}  >Lunch</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link    className={`${activeMenu === "Snacks" ? "active" : ""}`}
            onClick={() => handleMenuClick("Snacks")}  >Snacks</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="d-flex justify-content-end p-3">

<Icon
icon={cartIcon}
action={handleOpenDrawerButton}
styleClass={"cursor-pointer p-2"}
/>{orderItems.length > 0 && (
          <span className="cart-item-count position-absolute">{orderItems.length}</span>
        )}
<SlideDrawer
  show={drawerOpen}
  orderItems={orderItems}
  onClose={handleBackdropClick}
  selectedMenuItem={selectedMenuItem}
  addItemToOrder={addItemToOrder} 
/>
        {drawerOpen && <BackDrop closeDrawer={handleBackdropClick} />}
</div>
      {selectedMenuItem && (
        <div className="ms-5 flex-column row gap-5 mx-4">
          <div className="d-flex justify-content-between gap-5">
            <div className="fs-5 fw-bold">{selectedMenuItem.title}</div>
            <div className="gap-5 ms-5">Timing: {selectedMenuItem.time}</div>
          </div>
          <div className="row gap-4">
            {selectedMenuItem?.items?.map((item: any) => (
              <div
                className="breakfast-box h-100"
                onClick={() => addItemToOrder(`${item.item_name} ₹${item.price}`)}
                key={item._id}
              >
                <p className="color">{item.item_name}</p>
                <p>Price: ${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
