import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LoginData } from "../lib/interfaces";
import { authLogin, otpLogin, resetLoginData } from "../store/reducer/authSlice";
import { AppDispatch } from "../store/store";
import ModalShow from "../components/ModalShow";
import { Navigate } from "react-router-dom";
import FullScreenLoader from "../components/FullScreenLoader";
import {
  HeartIcon,
  activeCoffeeIcon,
  activeLunchIcon,
  activeSnacksIcon,
  cartIcon,
  coffeeIcon,
  disableCartIcon,
  eatFresh,
  lunchIcon,
  optIcon,
  snacksIcon,
  stayHealthy,
  todaysMenu,
  userProfile,
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
    // dispatch(MenuListData({ data }));
  }, [loginData]);
  // useEffect(() => {
  //   const clearLocalStorage = () => {
  //     localStorage.clear();
  //   };

  //   window.addEventListener("beforeunload", clearLocalStorage);

  //   return () => {
  //     window.removeEventListener("beforeunload", clearLocalStorage);
  //   };
  // }, []);

  useEffect(() => {
    if (loginOtp?.data?.empDetails?.FirstName) {
      setType(loginOtp?.data?.empDetails?.FirstName);
    }
  }, [loginOtp, loginData]);

  const addItemToOrder = (itemName: string) => {
    const updatedOrder = [...orderItems, itemName];
    setOrderItems(updatedOrder);
  };

  const Options =

    loginOtp?.data?.empDetails?.role != "User" ? [
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
    ] : [
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
      localStorage.clear();
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
  const sendLogin: any = async (e: any) => {
    e.preventDefault();
    setShowModal(true);
  };
  return (

    <div className="position-absolute overflow-hidden ">
      <div className="upper-div ">
        <div className="mt-4 seasia fs-2 ">Seasia</div>
        <p className="loader1 ">
          {loading == "pending" && <FullScreenLoader />}
        </p>
        <p className="loader1">
          {loadingOtp == "pending" && <FullScreenLoader />}
        </p>
        <SlideDrawer
          show={drawerOpen}
          orderItems={orderItems}
          onClose={handleBackdropClick}
          selectedMenuItem={selectedMenuItem}
          addItemToOrder={addItemToOrder}
          setOrderItems={setOrderItems}
        />
        {drawerOpen && <BackDrop closeDrawer={handleBackdropClick} />}
        <div className="upper-right-div d-flex gap-4 mb-3 p-4">
          {showLoginButton == false ?
            <div >
              <Icon

                icon={cartIcon}
                action={
                  showLoginButton ?
                    sendLogin :
                    handleOpenDrawerButton
                }
              // styleClass={showLoginButton ? "disabled-icon cursor-not-allowed " : "cursor-pointer"}
              />{orderItems.length > 0 && (
                <span className="cart-item-count position-absolute">{orderItems.length}</span>
              )}
            </div> :
            <div onClick={() => { ToastifyShow("Please login to add menu in Cart", "warning") }}>

              <Icon
                icon={disableCartIcon}
              />
            </div>
          }
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
                  className="button-color fs-6 fw-bold "
                >
                  LOGIN
                </Button>
              )}

              <div className="p-5 "></div>
              {showModal && (
                <ModalShow
                  className="modal-login "
                  handleView={showModal}
                  handleClose={() => {
                    setShowModal(false);
                  }}
                  title="Login"
                  title1={
                    <>
                      <Icon icon={userProfile} />
                      <Form.Control
                        className="username login-icon px-5"
                        type="text"
                        placeholder="Enter Employee Id"
                        value={loginDataDetails.emp_id.toString()}
                        onChange={(e) =>
                          setLoginDataDetails((prevState: any) => ({
                            ...prevState,
                            emp_id: e.target.value,
                          }))
                        }
                        required
                      />
                    </>

                  }
                  title2="SUBMIT"
                  handleApi={async () => {
                    const empIdAsNumber = parseInt(loginDataDetails.emp_id, 10);
                    if (!isNaN(empIdAsNumber)) {

                      localStorage.setItem("token", empIdAsNumber.toString());

                      const loginDataWithNumberEmpId = {
                        ...loginDataDetails,
                        emp_id: empIdAsNumber,
                      };

                      try {
                        const loginResponse = await dispatch(authLogin(loginDataWithNumberEmpId));
                        if (loginResponse?.payload?.statusCode == 200) {

                          setShowModal(false);
                          setShowModalOtp(true);
                        } else {
                          setShowModal(false);
                          ToastifyShow("Invalid Employee ID", "error");
                        }
                      } catch (error) {
                        
                        // Handle any potential errors with the API call
                        ToastifyShow("Login failed. Please try again.", "error");
                      }
                    } else {
                      ToastifyShow("emp_id is not a valid number", "error");
                    }
                  }}
                />
              )}
              <p className="loader1 mt-5 ">
                {loading == "pending" && <FullScreenLoader />}
              </p>
              <p className="loader1 mt-5 ">
                {loadingOtp == "pending" && <FullScreenLoader />}
              </p>
              {showModalOtp && (
                <ModalShow
                  handleView={showModalOtp}
                  title="Enter Otp"
                  title1={
                    <>
                      <Icon icon={optIcon} />
                      <Form.Control
                        className="username login-icon px-5"
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
                    </>
                  }
                  title2="Verify Otp"
                  handleApi={async () => {
                    const emp_id = parseInt(loginDataDetails.emp_id, 10);
                    localStorage.setItem("emp_id", emp_id.toString());

                    const otp = loginDataDetails.otp;
                    await dispatch(otpLogin({ emp_id, otp })).then((x: any) => {
                      let { token } = x?.payload?.data;
                      let roleUSer = x?.payload?.data?.empDetails?.role;
                      ToastifyShow("Otp Verified Successfully", "success");
                      // setLoginDataDetails((prevState: any) => ({
                      //   ...prevState,
                      //   emp_id: "",
                      //   otp: ""
                      // }));

                      if (token) {
                        setShowModal(false);
                        setShowModalOtp(false);
                        setShowLoginButton(false);
                        localStorage.setItem("token", token);
                        roleUSer === "User" ? navigate("/UserProfile") : navigate("/AdminPanel");

                        // localStorage.setItem("emp_id", emp_id);
                        localStorage.setItem(
                          "apiResponse",
                          JSON.stringify(x?.payload)
                        );

                      }
                      else {
                        setShowModal(false);
                        setShowModalOtp(false);
                        setShowLoginButton(false);
                        localStorage.clear()
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
      <div className="middle-card mt-5">
        <div>
          <p className="eat  d-flex gap-3">
            Eat
            <p className="fresh">
              Fresh
            </p>

          </p>
          <div>
            <p className="stay-young">Stay Young</p>
          </div>
          <div className="mt-2">
            <Button
              variant="outline-primary"
              type="submit"
              className="order-button fs-6 mt-5"
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
            style={{
              width: '185.923px',
              marginTop: '235px',
              height: '185.923px',
              marginRight: '-87px',
              marginLeft: '100px',
              transform: 'rotate(-3.388deg)',
              flexShrink: 0,
            }}
            draggable={false}
          />

          <img
            src={dummyImage}
            alt="profile Pic"
            loading={"lazy"}
            style={{
              width: '484px',
              height: '454px',
              marginLeft: '30px',
              flexShrink: 0
            }}

            draggable={false}
            className="mb-4"
          />

          <img
            src={burger}
            alt="profile Pic"
            loading={"lazy"}
            style={{
              width: '225.836px',
              height: '225.836px',
              marginTop: '129px',
              marginLeft: '-80px',
              transform: 'rotate(0.596deg)',
              flexShrink: 0
            }}

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
            // className={`coffeeCard ${activeMenu === "Breakfast" ? "active" : ""
            //   }`}
            className={activeMenu === "Breakfast" ? "coffeeCardActive" : "coffeeCard"}
            onClick={() => handleMenuClick("Breakfast")}
          >
            <Icon
              icon={activeMenu === "Breakfast" ? activeCoffeeIcon : coffeeIcon}
            />
            <p className="fw-bold fs-4">Breakfast</p>
          </div>
          <div
            className={activeMenu === "Lunch" ? "coffeeCardActive" : "coffeeCard"}

            onClick={() => handleMenuClick("Lunch")}
          >
            <Icon icon={activeMenu === "Lunch" ? activeLunchIcon : lunchIcon} />
            <p className="fw-bold fs-4">Lunch</p>
          </div>
          <div
            className={activeMenu === "Snacks" ? "coffeeCardActive" : "coffeeCard"}

            onClick={() => handleMenuClick("Snacks")}
          >
            <Icon
              icon={activeMenu === "Snacks" ? activeSnacksIcon : snacksIcon}
            />
            <p className="fw-bold fs-4">Snacks</p>
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
            {/* <div className="fs-3 fw-bold  ">{selectedMenuItem}</div> */}
            {/* <div className="gap-5 ">
              Timing :{" "}
              {activeMenu == "Breakfast"
                ? "8am-10am"
                : activeMenu == "Snacks"
                  ? "4pm-6pm"
                  : activeMenu == "Lunch"
                    ? "1pm-2pm"
                    : "8am-10am"}
            </div> */}
          </div>
          <div className="d-flex gap-3 row">
            <div className="fs-2 fw-bold d-flex justify-content-between">{selectedMenuItem}

              <div className="gap-5 fs-6 text-secondary">
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
            {menusList?.data?.map((menu: any) => {
              if (menu.title === selectedMenuItem) {
                return menu.items.map((item: any) => (

                  <div
                    className="breakfast-box"
                    onClick={() => {

                      showLoginButton == true ? ToastifyShow("Please login to add menu in Cart", "warning") : addItemToOrder(item?.item_name + " ₹" + item?.price)
                    }
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
      <div className="footer-div d-flex  chef-card mt-5 gap-5">
        <div>
          <img
            src={chef}
            alt="profile Pic"
            loading={"lazy"}
            // style={{ height: "563px", width: "579px" }}
            draggable={false}
          />
        </div>
        <div>
          <div className="meet mb-5">Meet Our Team</div>
          <div >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentiaand typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
          <div >
            <Button
              variant="outline-primary"
              type="submit"
              size="lg"
              // data-testid="loginBtn"
              className="order-button fs-6 mt-4"
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>
      <div className="footer">
        <span>
          Made with {HeartIcon} by OS Team
        </span>
      </div>
    </div>
    //     <>
    //       <header id="header-b">

    //         <div className="container">
    //           <div className="header d-flex justify-content-between">
    //             <p className="seasia-name">Seasia</p>
    //             <div className="d-flex gap-4 mt-2">
    //               <p className="loader1 ">
    //           {loading == "pending" && <FullScreenLoader />}
    //         </p>
    //         <p className="loader1">
    //           {loadingOtp == "pending" && <FullScreenLoader />}
    //         </p>
    //               <div>
    //               <SlideDrawer
    //           show={drawerOpen}
    //           orderItems={orderItems}
    //           onClose={handleBackdropClick}
    //           selectedMenuItem={selectedMenuItem}
    //           addItemToOrder={addItemToOrder}
    //           setOrderItems={setOrderItems}
    //         />
    //               {drawerOpen && <BackDrop closeDrawer={handleBackdropClick} />}
    //               {showLoginButton == false ?
    //             <div >
    //               <Icon

    //                 icon={cartIcon}
    //                 action={
    //                   showLoginButton ?
    //                     sendLogin :
    //                     handleOpenDrawerButton
    //                 }
    //               // styleClass={showLoginButton ? "disabled-icon cursor-not-allowed " : "cursor-pointer"}
    //               />{orderItems.length > 0 && (
    //                 <span className="cart-item-count position-absolute">{orderItems.length}</span>
    //               )}
    //             </div> :
    //             <div onClick={() => { ToastifyShow("Please login to add menu in Cart", "warning") }}>

    //               <Icon
    //                 icon={disableCartIcon}
    //               />
    //             </div>
    //           }

    //               </div>
    //               <div>
    //               <Form onSubmit={sendLogin} className="w-100">
    //               {showLoginButton == false ? (
    //                 <div>
    //                   <DropDown
    //                     selected={type}
    //                     setSelect={handleSelect}
    //                     selectArray={Options}
    //                   />
    //                 </div>
    //               ) : (
    //                 <Button
    //                   type="submit"
    //                   size="lg"
    //                   data-testid="loginBtn"
    //                   className="button-color fs-6 fw-bold "
    //                 >
    //                   LOGIN
    //                 </Button>
    //               )}

    //               <div className="p-5 "></div>
    //               {showModal && (
    //                 <ModalShow
    //                   handleView={showModal}
    //                   handleClose={() => {
    //                     setShowModal(false);
    //                   }}
    //                   title="Login"
    //                   title1={
    //                     <Form.Control
    //                       className="username login-icon"
    //                       type="text"
    //                       placeholder="Username"
    //                       value={loginDataDetails.emp_id.toString()}
    //                       onChange={(e) =>
    //                         setLoginDataDetails((prevState: any) => ({
    //                           ...prevState,
    //                           emp_id: e.target.value,
    //                         }))
    //                       }
    //                       required
    //                     />

    //                   }
    //                   title2="SUBMIT"
    //                   handleApi={async () => {
    //                     const empIdAsNumber = parseInt(loginDataDetails.emp_id, 10);
    //                     if (!isNaN(empIdAsNumber)) {

    //                       localStorage.setItem("token", empIdAsNumber.toString());

    //                       const loginDataWithNumberEmpId = {
    //                         ...loginDataDetails,
    //                         emp_id: empIdAsNumber,
    //                       };

    //                       try {
    //                         const loginResponse = await dispatch(authLogin(loginDataWithNumberEmpId));
    //                         // Assuming loginResponse contains the necessary success flag or data to verify a successful login
    //                         inResponse?.payload?.statusCode == 200) {

    //                           setShowModal(false);
    //                           setShowModalOtp(true);
    //                         } else {
    //                           setShowModal(false);
    //                           ToastifyShow("Invalid Employee ID", "error");
    //                         }
    //                       } catch (error) {
    //                         // Handle any potential errors with the API call
    //                         ToastifyShow("Login failed. Please try again.", "error");
    //                       }
    //                     } else {
    //                       ToastifyShow("emp_id is not a valid number", "error");
    //                     }
    //                   }}
    //                 />
    //               )}
    //               <p className="loader1 mt-5 ">
    //                 {loading == "pending" && <FullScreenLoader />}
    //               </p>
    //               <p className="loader1 mt-5 ">
    //                 {loadingOtp == "pending" && <FullScreenLoader />}
    //               </p>
    //               {showModalOtp && (
    //                 <ModalShow
    //                   handleView={showModalOtp}
    //                   title="Enter Otp"
    //                   title1={
    //                     <Form.Control
    //                       className="username login-icon"
    //                       type="text"
    //                       placeholder="Enter Your Otp here"
    //                       value={loginDataDetails.otp.toString()}
    //                       onChange={(e) =>
    //                         setLoginDataDetails((prevState: any) => ({
    //                           ...prevState,
    //                           otp: e.target.value,
    //                         }))
    //                       }
    //                       required
    //                     />
    //                   }
    //                   title2="Verify Otp"
    //                   handleApi={async () => {
    //                     const emp_id = parseInt(loginDataDetails.emp_id, 10);
    //                     localStorage.setItem("emp_id", emp_id.toString());

    //                     const otp = loginDataDetails.otp;
    //                     await dispatch(otpLogin({ emp_id, otp })).then((x: any) => {
    //                       let { token } = x?.payload?.data;
    //                       let roleUSer = x?.payload?.data?.empDetails?.role;
    //                       ToastifyShow("Otp Verified Successfully", "success");
    //                       setLoginDataDetails((prevState: any) => ({
    //                         ...prevState,
    //                         emp_id: "",
    //                         otp:"" 
    //                       }));

    //                       if (token) {
    //                         setShowModal(false);
    //                         setShowModalOtp(false);
    //                         setShowLoginButton(false);
    //                         localStorage.setItem("token", token);
    //                         roleUSer === "User" ? navigate("/") : navigate("/AdminPanel");

    //                         // localStorage.setItem("emp_id", emp_id);
    //                         localStorage.setItem(
    //                           "apiResponse",
    //                           JSON.stringify(x?.payload)
    //                         );

    //                       }
    //                       else {
    //                         setShowModal(false);
    //                         setShowModalOtp(false);
    //                         setShowLoginButton(false);
    //                         localStorage.clear()
    //                       }
    //                     });
    //                   }}
    //                   handleClose={() => {

    //                     setShowModalOtp(false);
    //                   }}
    //                 />
    //               )}
    //               <div className="p-5 "></div>
    //             </Form>

    //               </div>
    //             </div>

    //           </div>
    //         </div>
    //       </header>
    //       <section>

    //         <div className="container">
    //           <div className="section">
    // hello
    // hello
    // hello
    // hello
    // hello
    // hello
    // hello
    // hello
    //           </div>
    //         </div>
    //       </section>
    //       <footer id="footer">

    //         <div className="container">
    //           <div className="w-100">
    //           <p className="footer-name mt-3">
    //           Made with {HeartIcon} by OS Team
    //         </p >
    //           </div>
    //         </div>
    //       </footer>
    //     </>
  );
};
export default Login;
