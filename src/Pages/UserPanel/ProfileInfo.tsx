
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NotificationDataList, ViewEmoplyeeData, WalletData } from '../../store/User/UserSlice';
import { AppDispatch } from '../../store/store';
import { CustomerListData } from '../../store/todayMenu/todayMenuSlice';
import ChatBot from '../../components/Chatbot';
const ProfileInfo = () => {
    const { employeeList } = useSelector((state: any) => state?.userProfile);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {

        dispatch(ViewEmoplyeeData({ emp_id: employeeList?.data?.EmployeeId }));
          dispatch(WalletData({}));
          dispatch(NotificationDataList({}));
        //   dispatch(CustomerListData({}));

    }, [dispatch]);
    return (
        <div>

            <div className='profile-card'>
                <div className='d-flex justify-content-center'>

                    <h1 className='fresh mt-3'>Employee Info</h1>
                </div>

                <div className='d-flex justify-content-between ms-5 mx-5'>
                    <p className='profile-text '>
                        Employee ID :-
                    </p>
                    <p className='profile-text'>{employeeList?.data?.EmployeeId}</p>
                </div>
                <div className='d-flex justify-content-between ms-5 mx-5'>
                    <p className='profile-text '>
                        First Name :-
                    </p>
                    <p className='profile-text'>{employeeList?.data?.FirstName}</p>
                </div>
                <div className='d-flex justify-content-between ms-5 mx-5'>
                    <p className='profile-text '>
                        Last Name :-
                    </p>
                    <p className='profile-text'>{employeeList?.data?.LastName}</p>
                </div>
                <div className='d-flex justify-content-between ms-5 mx-5'>
                    <p className='profile-text '>
                        Balance :-
                    </p>
                    <p className='profile-text'>₹ {employeeList?.data?.balance}</p>
                </div>
                <div className='d-flex justify-content-between ms-5 mx-5'>
                    <p className='profile-text '>
                        Email :-
                    </p>
                    <p className='profile-text'>{employeeList?.data?.email}</p>
                </div>
                <div className='d-flex justify-content-between ms-5 mx-5'>
                    <p className='profile-text '>
                        Role :-
                    </p>
                    <p className='profile-text'>{employeeList?.data?.role}</p>
                </div>
                <div className='d-flex justify-content-between ms-5 mx-5'>
                    <p className='profile-text '>
                        Wallet :-
                    </p>
                    <p className='profile-text'>₹ {employeeList?.data?.wallet}</p>
                </div>

                {/* {employeeList?.data?.FirstName}
        {employeeList?.data?.LastName}
        {employeeList?.data?.balance}
        {employeeList?.data?.email}
        {employeeList?.data?.role}
    {employeeList?.data?.wallet} */}
{/* <ChatBot/> */}
            </div>
        </div>
    )
}

export default ProfileInfo
