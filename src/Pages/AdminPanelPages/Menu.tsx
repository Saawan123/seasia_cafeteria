import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Nav, } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import "../login.scss";
import Icon from "../../components/Icon";
import { EditIcon, deleteIcon } from "../../lib/icon";
import ModalShow from "../../components/ModalShow";
import AddSubMenu from "../AddSubMenu";
import {  DeleteItemRecords, SubMenuListData } from "../../store/Menu/menuSlice";
import ToastifyShow from "../../components/ToastifyShow";

const Menu = () => {
  const { subMenus } = useSelector((state: any) => state?.MenuList);
  const [selectedMenuItem, setSelectedMenuItem]:any = useState("Breakfast");
  const [orderItems, setOrderItems] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idd, setIdd] = useState("");
  const [activeMenu, setActiveMenu] = useState("Breakfast");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // dispatch(TodaysMenuListData({}));
    dispatch(SubMenuListData({  }));
  }, [dispatch]);

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
      {selectedMenuItem && (
        <div className="ms-5 flex-column row gap-5 mx-4">
          <div className="d-flex justify-content-between gap-5">
            <div className="fs-5 fw-bold">{selectedMenuItem.title}</div>
            <Button
              type="submit"
              onClick={() => setShowModal(true)}
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
              handleApi={async()=>{
                
                await dispatch(DeleteItemRecords({id: idd }));
                setShowDeleteModal(false)
               await  dispatch(SubMenuListData({}));
ToastifyShow("Items Deleted Successfully","success")
              }}
            />
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
                  {/* <p className="color">{item._id}</p> */}
                  <p>Price: ${item.price}</p>
                  <div className="d-flex justify-content-center gap-2 mb-2">
                  <Icon icon={EditIcon} action={() => setShowModal(true)} />
                <Icon icon={deleteIcon} action={() => {setShowDeleteModal(true);
                  console.log(item?._id,"klklklkl")
                  setIdd(item?._id);
                  }} />
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
