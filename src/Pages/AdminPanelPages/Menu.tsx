import { useEffect, useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap"; // Assuming you're using Reactstrap or Bootstrap
// import {
//   activeCoffeeIcon,
//   activeLunchIcon,
//   activeSnacksIcon,
//   coffeeIcon,
//   lunchIcon,
//   snacksIcon,
// } from "../../lib/icon";
// import Icon from "../../components/Icon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { TodaysMenuListData } from "../../store/todayMenu/todayMenuSlice";
import { MenuListData } from "../../store/Menu/menuSlice";
import "../login.scss";

const Menu = () => {
  const { menusList } = useSelector((state: any) => state?.MenuListToday);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Breakfast");
  const [orderItems, setOrderItems] = useState<string[]>([]);
  const [activeMenu, setActiveMenu] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(TodaysMenuListData({  }));
    dispatch(MenuListData({  }));
  }, []);
  const handleMenuClick = (menuItem: any) => {
    setSelectedMenuItem(menuItem);
    setActiveMenu(menuItem);
  };

  const addItemToOrder = (itemName: string) => {
    const updatedOrder = [...orderItems, itemName];
    setOrderItems(updatedOrder);
  };

  return (
    <div>
      <Nav pills className="justify-content-around mt-4">
        <NavItem>
          <NavLink
            className={`${activeMenu === "Breakfast" ? "active" : ""
              }`}
            onClick={() => handleMenuClick("Breakfast")}
          >

            <p>Breakfast</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={` ${activeMenu === "Lunch" ? "active" : ""}`}
            onClick={() => handleMenuClick("Lunch")}
          >

            <p>Lunch</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={` ${activeMenu === "Snacks" ? "active" : ""}`}
            onClick={() => handleMenuClick("Snacks")}
          >
            <p>Snacks</p>
          </NavLink>
        </NavItem>

      </Nav>
      <div className=" ms-5  flex-column  row gap-5 mx-4 ">
        <div className="d-flex justify-content-between gap-5">
          <div className="fs-5 fw-bold ">{selectedMenuItem}</div>
          <div className="gap-5 ms-5">
            Timing :{" "}
            {activeMenu == "Breakfast"
              ? "8am-10am"
              : activeMenu == "Snacks"
                ? "4pm-6pm"
                : activeMenu == "Lunch"
                  ? "1pm-2pm"
                  : "8am-10am"}
          </div>
        </div>
      <div className=" row gap-4 ">
      
      
            {menusList?.data?.map((menu: any) => {
              if (menu.title === selectedMenuItem) {
                return menu.items.map((item: any) => (
                  <div
                    className="breakfast-box"
                    onClick={() =>
                      addItemToOrder(item?.item_name + " ₹" + item?.price)
                    }
                    key={item._id}
                  >
                    <p className="color">{item.item_name}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                ));
              }
              return null;
            })}
        
        
      </div>
            {/* <p className="text-secondary">Click item to add to the menu</p> */}
      </div>
    </div>
  );
};

export default Menu;
