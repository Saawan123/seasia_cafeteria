import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Nav, } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import "../login.scss";
import Icon from "../../components/Icon";
import { EditIcon, cartIcon, deleteIcon } from "../../lib/icon";
import ModalShow from "../../components/ModalShow";
import AddSubMenu from "../AddSubMenu";
import { DeleteItemRecords, MenuListData, SubMenuListData } from "../../store/Menu/menuSlice";
import ToastifyShow from "../../components/ToastifyShow";
import TodayCartBar from "../../components/TodayCartBar";
import BackDrop from "../../components/backDrop";
// import SlideDrawer from "../../components/slideDrawer";
// import BackDrop from "../../components/backDrop";

const Menu = () => {
  const { subMenus } = useSelector((state: any) => state?.MenuList);
  const [selectedMenuItem, setSelectedMenuItem]: any = useState("Breakfast");
  const [orderItems, setOrderItems]:any = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idd, setIdd] = useState("");
  const [activeMenu, setActiveMenu] = useState("Breakfast");
  const dispatch = useDispatch<AppDispatch>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    // dispatch(TodaysMenuListData({}));
    dispatch(MenuListData({}));
    dispatch(SubMenuListData({}));
  }, [dispatch]);

  const handleMenuClick:any = (menuItem: string) => {
    const selectedMenu = subMenus?.data?.find((menu: any) => menu.title === menuItem);
    if (selectedMenu) {
      setSelectedMenuItem(selectedMenu);
      setActiveMenu(menuItem);
      // dispatch(SubMenuListData({ menu_id: selectedMenu._id }));
    }
  };
  useEffect(() => {
    const defaultMenu = subMenus?.data?.find((menu: any) => menu.title === activeMenu);
    if (defaultMenu) {
      setSelectedMenuItem(defaultMenu);
    }
  }, [subMenus, activeMenu]);
  useEffect(()=>{
    handleMenuClick()
  },[])
  function handleOpenDrawerButton() {

    setDrawerOpen(!drawerOpen);
  }
  function handleBackdropClick() {
    setDrawerOpen(false);
  }
  // const addItemToOrder = (itemName: string) => {
  //   const updatedOrder = [...orderItems, itemName];
  //   setOrderItems(updatedOrder);
  // };

  const addItemToOrder = (itemDetails:any) => {
    const { itemName, itemPrice }:any = itemDetails;
  
    const existingItemIndex = orderItems.findIndex(
      (item:any) => item.itemName === itemName
    );
  
    if (existingItemIndex !== -1) {
      const updatedOrderItems:any = [...orderItems];
      updatedOrderItems[existingItemIndex].quantity += 1;
      updatedOrderItems[existingItemIndex].itemPrice += parseFloat(itemPrice);
      setOrderItems(updatedOrderItems);
    } else {
      setOrderItems([
        ...orderItems,
        { itemName: itemName, itemPrice: itemPrice, quantity: 1 },
      ]);
    }
  };
  return (
    <div>
      <TodayCartBar
          show={drawerOpen}
          orderItems={orderItems}
          onClose={handleBackdropClick}
          selectedMenuItem={selectedMenuItem}
          addItemToOrder={addItemToOrder}
          setOrderItems={setOrderItems} 
        />
        {drawerOpen && <BackDrop closeDrawer={handleBackdropClick} />}
      <Nav variant="pills" className="justify-content-around mt-4">
        <Nav.Item>


          <Nav.Link
            className={`${activeMenu === "Breakfast" ? "active" : ""} `}
            onClick={() => handleMenuClick("Breakfast")}
          >Breakfast</Nav.Link>

        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={`${activeMenu === "Lunch" ? "active" : ""}`}
            onClick={() => handleMenuClick("Lunch")}  >Lunch</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link className={`${activeMenu === "Snacks" ? "active" : ""}`}
            onClick={() => handleMenuClick("Snacks")}  >Snacks</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link className={`${activeMenu === "custom" ? "active" : ""}`}
            onClick={() => handleMenuClick("custom")}  >Custom Order</Nav.Link>
        </Nav.Item>
      </Nav>
      {selectedMenuItem && (
        <div className="ms-5 flex-column row gap-5 mx-4">
          <div className="d-flex justify-content-between gap-5">
            <div className="fs-5 fw-bold">{selectedMenuItem.title}</div>
            <Button
              type="submit"
              onClick={() => {setShowModal(true)
              setIdd("")
              }
              }
              size="lg"
              data-testid="loginBtn"
              className="button-color fs-6 fw-bold w-25 mt-4 ms-3"
            >
              Add Sub Menu
            </Button>
            <ModalShow
              handleView={showModal}
              size="md"
              handleClose={() => setShowModal(false)}
              title="Login"
              title1={<AddSubMenu
                data={idd}
                closeModal={() => setShowModal(false)}
                menuId={selectedMenuItem?._id} // Pass the menuId prop
              />}
              handleApi={""}
            />

            <ModalShow
              handleView={showDeleteModal}
              size="md"
              handleClose={() => setShowDeleteModal(false)}
              title="Delete Item"

              title1={"are you sure you want to delete?"}
              title2={"Yes"}
              handleApi={async () => {

                await dispatch(DeleteItemRecords({ id: idd }));
                setShowDeleteModal(false)
                await dispatch(SubMenuListData({ id: selectedMenuItem?.id }));
                ToastifyShow("Items Deleted Successfully", "success")
              }}
            />
            <div className="gap-5 ms-5">Timing: {selectedMenuItem.time}</div>
            <div>
          <Icon
                              icon={cartIcon}
                              action={
                                // showLoginButton ?
                                //   sendLogin :
                                handleOpenDrawerButton
                              }
                              // styleClass={showLoginButton ? "disabled-icon cursor-not-allowed " : "cursor-pointer"}
                              />{orderItems.length > 0 && (
                                <span className="cart-item-count position-relative fw-bold text-danger mb-2">{orderItems.length}</span>
                                )}
                                </div>
          </div>
          <div className="row gap-4">

            {selectedMenuItem?.items?.map((item: any) => (
              <div
                className="breakfast-box h-100"
                onClick={() =>   addItemToOrder({ itemName: item?.item_name, itemPrice: item?.price })}
                key={item._id}
              >
                <p className="color">{item.item_name}</p>
                {/* <p className="color">{item._id}</p> */}
                <p>Price: ₹{item.price}</p>
                <div className="d-flex mt-2 gap-4 justify-content-center align-items-center m-3  mb-2">
                <Icon
  icon={EditIcon}
  action={(e:any) => {
    e.stopPropagation(); 
    setShowModal(true);
    setIdd(item);
  }}
/>
<Icon
  icon={deleteIcon}
  action={(e:any) => {
    e.stopPropagation(); 
    setShowDeleteModal(true);
    setIdd(item?._id);
  }}
/>

                    {/* <Button
              type="submit"
              onClick={() => { setShowModal(true);
                setIdd(item);}}
              size="sm"
             className="button-color-menu-edit"
      
            >
              Edit
            </Button>
            <Button
              type="submit"
              onClick={() =>  {setShowDeleteModal(true);
                setIdd(item?._id);}}
              size="sm"
              className="button-color-menu-delete"
          
            
            >
              Delete
            </Button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;



