import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LoginData } from "../lib/interfaces";
import { authLogin, otpLogin } from "../store/reducer/authSlice";
import { AppDispatch } from "../store/store";
import ModalShow from "../components/ModalShow";
import FullScreenLoader from "../components/FullScreenLoader";
import {
  HeartIcon,
  activeCoffeeIcon,
  activeLunchIcon,
  activeSnacksIcon,
  cartIcon,
  coffeeIcon,
  eatFresh,
  lunchIcon,
  snacksIcon,
  stayHealthy,
  todaysMenu,
} from "../lib/icon";
import "./login.scss";
import Icon from "../components/Icon";
import dummyImage from "../assets/dummyImage.png";
import burger from "../assets/burger.png";
import juice from "../assets/juice.png";
import chef from "../assets/chef.png";
import bowl from "../assets/bowl.png";
import { TodaysMenuListData } from "../store/todayMenu/todayMenuSlice";
import { MenuListData } from "../store/Menu/menuSlice";
import DropDown from "../components/DropDown";
import SlideDrawer from "../components/slideDrawer";
import BackDrop from "../components/backDrop";
import { useNavigate } from "react-router-dom";
import ToastifyShow from "../components/ToastifyShow";
const Login = ({ data }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loadingOtp, loading, loginOtp, loginData } = useSelector(
    (state: any) => state?.auth
  );
  const { menusList } = useSelector((state: any) => state?.MenuListToday);
  console.log(menusList,"kkkkk")
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const [loginDataDetails, setLoginDataDetails] = useState<LoginData>({
    emp_id: "",
    otp: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showModalOtp, setShowModalOtp] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Breakfast");
  const [activeMenu, setActiveMenu] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderItems, setOrderItems] = useState<string[]>([]);
  const [showLoginButton, setShowLoginButton] = useState(true);

  useEffect(() => {
    dispatch(TodaysMenuListData({ data }));
    dispatch(MenuListData({ data }));
  }, [loginData]);

  useEffect(() => {
    if (loginOtp?.data?.empDetails?.FirstName) {
      setType(loginOtp?.data?.empDetails?.FirstName);
    }
  }, [loginOtp, loginData]);

  const addItemToOrder = (itemName: string) => {
    const updatedOrder = [...orderItems, itemName];
    setOrderItems(updatedOrder);
  };

  const Options = [
    {
      name: "Admin Panel",
      id: 0,
    },
    {
      name: "Balance" + "=" + `${loginOtp?.data?.empDetails?.balance}`,
      id: 1,
    },
    {
      name: "Wallet" + "=" + `${loginOtp?.data?.empDetails?.wallet}`,
      id: 2,
    },
    {
      name:
        "Name" +
        "=" +
        `${loginOtp?.data?.empDetails?.FirstName +
        " " +
        loginOtp?.data?.empDetails?.LastName
        }`,
      id: 3,
    },
    {
      name: "LogOut",
      id: 4,
    },
  ];

  const handleSelect = (eventKey: any) => {
    const selectedOption = Options?.find((option) => option.id === eventKey);
    if (selectedOption?.id === 0) {
      navigate("/AdminPanel");
    }
    if (selectedOption?.id === 4) {
      // navigate("/");
      setShowLoginButton(true);
      ToastifyShow("Logged out successfully", "success");
    }
  };
  function handleOpenDrawerButton() {
 
    setDrawerOpen(!drawerOpen);
  }

  function handleBackdropClick() {
    setDrawerOpen(false);
  }
  const handleMenuClick = (menuItem: any) => {
    setSelectedMenuItem(menuItem);
    setActiveMenu(menuItem);
  };
  const sendLogin = async (e: any) => {
    e.preventDefault();
    setShowModal(true);
  };
  return (
    <div className="position-relative ">
      <div className="upper-div d-flex justify-content-around bg-warning ">
        <div className="mt-5 fs-2 ">Seasia</div>
        <p className="loader1">
          {loading == "pending" && <FullScreenLoader />}
        </p>
        <p className="loader1">
          {loadingOtp == "pending" && <FullScreenLoader />}
        </p>
        {/* <SlideDrawer
          show={drawerOpen}
          addItemToOrder={addItemToOrder}
          orderItems={orderItems}
          onClose={handleBackdropClick}
          selectedMenuItem={selectedMenuItem}
        /> */}
        <SlideDrawer
  show={drawerOpen}
  orderItems={orderItems}
  onClose={handleBackdropClick}
  selectedMenuItem={selectedMenuItem}
  addItemToOrder={addItemToOrder} 
/>
        {drawerOpen && <BackDrop closeDrawer={handleBackdropClick} />}
        <div className="upper-right-div d-flex gap-4 mt-4 p-4">
          <div>
  
          <Icon
  icon={cartIcon}
  action={showLoginButton ? sendLogin : handleOpenDrawerButton}
  styleClass={showLoginButton ? "disabled-icon cursor-not-allowed cartIconColor" : "cursor-pointer"}
/>{orderItems.length > 0 && (
          <span className="cart-item-count position-absolute">{orderItems.length}</span>
        )}
          </div>
          <div>
            <Form onSubmit={sendLogin} className="w-100">
              {showLoginButton == false ? (
                <div>
                  <DropDown
                    selected={type}
                    setSelect={handleSelect}
                    selectArray={Options}
                  />
                </div>
              ) : (
                <Button
                  type="submit"
                  size="lg"
                  data-testid="loginBtn"
                  className="button-color fs-6 fw-bold"
                >
                  LOGIN
                </Button>
              )}

              <div className="p-5 "></div>
              {showModal && (
                <ModalShow
                  handleView={showModal}
                  handleClose={() => {
                    setShowModal(false);
                  }}
                  title="Login"
                  title1={
                    <Form.Control
                      className="username login-icon"
                      type="text"
                      placeholder="Username"
                      value={loginDataDetails.emp_id.toString()}
                      onChange={(e) =>
                        setLoginDataDetails((prevState: any) => ({
                          ...prevState,
                          emp_id: e.target.value,
                        }))
                      }
                      required
                    />
                  }
                  title2="SUBMIT"
                  handleApi={async () => {
                    const empIdAsNumber = parseInt(loginDataDetails.emp_id, 10);
                    if (!isNaN(empIdAsNumber)) {
                      console.log(empIdAsNumber, "sefdsgdg")
                      localStorage.setItem("token", empIdAsNumber.toString());

                      const loginDataWithNumberEmpId = {
                        ...loginDataDetails,
                        emp_id: empIdAsNumber,
                      };

                      await dispatch(authLogin(loginDataWithNumberEmpId));
                      setShowModal(false);
                      setShowModalOtp(true);
                    } else {
                      ToastifyShow("emp_id is not a valid number", "error");
                    }
                  }}
                />
              )}

              {showModalOtp && (
                <ModalShow
                  handleView={showModalOtp}
                  title="Enter Otp"
                  title1={
                    <Form.Control
                      className="username login-icon"
                      type="text"
                      placeholder="Enter Your Otp here"
                      value={loginDataDetails.otp.toString()}
                      onChange={(e) =>
                        setLoginDataDetails((prevState: any) => ({
                          ...prevState,
                          otp: e.target.value,
                        }))
                      }
                      required
                    />
                  }
                  title2="Verify Otp"
                  handleApi={async () => {
                    const emp_id = parseInt(loginDataDetails.emp_id, 10);
                    localStorage.setItem("emp_id", emp_id.toString());

                    const otp = loginDataDetails.otp;
                    await dispatch(otpLogin({ emp_id, otp })).then((x: any) => {
                      let { token } = x?.payload?.data;
                      ToastifyShow("Otp Verified Successfully", "success");
                      if (token) {
                        console.log("dataaaaa", token)
                        localStorage.setItem("token", token);
                        // localStorage.setItem("emp_id", emp_id);
                        localStorage.setItem(
                          "apiResponse",
                          JSON.stringify(x?.payload)
                        );
                        setShowModal(false);
                        setShowModalOtp(false);
                        setShowLoginButton(false);
                      }
                    });
                  }}
                  handleClose={() => {
                    setShowModalOtp(false);
                  }}
                />
              )}
              <div className="p-5 "></div>
            </Form>
          </div>
        </div>
      </div>
      <div className="middle-card position-absolute d-flex justify-content-between">
        <div>
          <div>
            <Icon icon={eatFresh} />
          </div>
          <div>
            <Icon icon={stayHealthy} />
          </div>
          <div className="mt-2">
            <Button
              variant="outline-primary"
              type="submit"
              className="order-button fs-6"
            >
              Order Now
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-between ">
          <img
            src={juice}
            alt="profile Pic"
            loading={"lazy"}
            style={{ height: "100px", width: "100px", marginTop: "70px" }}
            draggable={false}
          />

          <img
            src={dummyImage}
            alt="profile Pic"
            loading={"lazy"}
            style={{ height: "180px" }}
            draggable={false}
            className="mb-4"
          />

          <img
            src={burger}
            alt="profile Pic"
            loading={"lazy"}
            style={{ height: "100px", marginTop: "70px" }}
            draggable={false}
          />
        </div>
      </div>
      <div className="lower-div">
        <div className="text-center">
          <Icon icon={todaysMenu} />
        </div>

        <div className="d-flex justify-content-around mt-4">
          <div
            className={`coffeeCard ${activeMenu === "Breakfast" ? "active" : ""
              }`}
            onClick={() => handleMenuClick("Breakfast")}
          >
            <Icon
              icon={activeMenu === "Breakfast" ? activeCoffeeIcon : coffeeIcon}
            />
            <p>Breakfast</p>
          </div>
          <div
            className={`lunchCard ${activeMenu === "Lunch" ? "active" : ""}`}
            onClick={() => handleMenuClick("Lunch")}
          >
            <Icon icon={activeMenu === "Lunch" ? activeLunchIcon : lunchIcon} />
            <p>Lunch</p>
          </div>
          <div
            className={`snacksCard ${activeMenu === "Snacks" ? "active" : ""}`}
            onClick={() => handleMenuClick("Snacks")}
          >
            <Icon
              icon={activeMenu === "Snacks" ? activeSnacksIcon : snacksIcon}
            />
            <p>Snacks</p>
          </div>
        </div>
      </div>

      <div className="bowl-card d-flex">
        <img
          src={bowl}
          alt="profile Pic"
          loading={"lazy"}
          style={{ height: "200px" }}
          draggable={false}
        />
        <div className=" d-flex flex-column row gap-5 mx-4 ">
          <div className="d-flex gap-5">
            <div className="fs-5 fw-bold ">{selectedMenuItem}</div>
            <div className="gap-5">
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
          <div className="d-flex gap-5 row">
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
            <p className="text-secondary">click item to add in menu</p>
          </div>
        </div>
      </div>
      <div className="footer-div d-flex  bowl-card">
        <div>
          <img
            src={chef}
            alt="profile Pic"
            loading={"lazy"}
            style={{ height: "300px", marginRight: "150px" }}
            draggable={false}
          />
        </div>
        <div>
          <div className="fs-2 fw-bold">Meet Our Team</div>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
          <div className="mt-4 w-25">
            <Button
              variant="outline-primary"
              type="submit"
              size="lg"
              // data-testid="loginBtn"
              className="order-button fs-6"
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>
      <div className="footer">
        <span>
          Made with <Icon icon={HeartIcon} /> by OS Team
        </span>
      </div>
    </div>
  );
};
export default Login;
