import  { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import "../UserPanel/UserProfile.scss";
import Orders from '../AdminPanelPages/Orders';
import dummyImage from "../../assets/dummyImage.png"
import ProfileInfo from './ProfileInfo';
import ToastifyShow from '../../components/ToastifyShow';
import { useNavigate } from 'react-router-dom';
import { notificationIcon, uploadIcon } from '../../lib/icon';
import Help from './Help';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('Profile Info');
  const [selectedImage, setSelectedImage]:any = useState(() => {
   
    const savedImage = localStorage.getItem('userImage');
    return savedImage ? savedImage : null;
  });

  const handleImageChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      const reader:any = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        localStorage.setItem('userImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
    else{
      localStorage.clear()
    }
  };

  const navigate = useNavigate()

  const handleMenuClick = (section: any) => {
    setActiveSection(section);
  };


  return (
    <div>
      <div className=''>
        <div className='text-center m-5 profile-upper-card'>
          <div className='d-flex justify-content-between'>
            <p className='ms-5 mt-3'>{notificationIcon}</p>
            <Button
              // type="submit"
              onClick={() => {
                localStorage.clear();
                navigate("/")
                ToastifyShow("Logout Successfully", "success")
              }}
              size="lg"
              data-testid="loginBtn"
              className="button-color mt-4 m-5"
            >
              Logout
            </Button>
          </div>
    
<div
  style={{
    position: 'absolute',
    top: '478px',
    left: '761px',
    cursor: 'pointer',
    zIndex: '99999',
  }}
  onClick={() => {
    // Click the hidden file input when the upload icon is clicked
    const fileInput:any = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.click();
  }}
>
<input type="file" onChange={handleImageChange} style={{ display: 'none' }} />

  {uploadIcon}
</div>
           
           <img
          src={selectedImage ? selectedImage : dummyImage}
          alt="Selected"
          style={{
            borderRadius: "300px",
            position: "relative",
            top: "50px",
            background: "white",
            boxShadow: "1px 2px 3px black",
            height: "300px",
            textAlign: "center",
            width: "300px"
          }}
        />

        </div>


        <Nav variant="pills" className="justify-content-around  header">
          <Nav.Item>
            <Nav.Link onClick={() => handleMenuClick('Profile Info')} active={activeSection === 'Profile Info'}>
              Profile Info
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => handleMenuClick('Order History')} active={activeSection === 'Order History'}>
              Order History
            </Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link onClick={() => handleMenuClick('Wallet History')} active={activeSection === 'Wallet History'}>
              Wallet History
            </Nav.Link>
          </Nav.Item> */}
          <Nav.Item>
            <Nav.Link onClick={() => handleMenuClick('Help and Support')} active={activeSection === 'Help and Support'}>
              Help and Support
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {activeSection === 'Profile Info' && (
        <div>
          <ProfileInfo />
        </div>
      )}
      {activeSection === 'Order History' && (
        <div>
          <Orders />
        </div>
      )}
      {activeSection === 'Wallet History' && (
        <div>
          data for Wallet History
        </div>
      )}
      {activeSection === 'Help and Support' && (
        <div>
          <Help />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
