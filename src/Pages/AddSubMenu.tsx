import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import "./AdminPanelPages/createUser.scss"
import ToastifyShow from '../components/ToastifyShow';
import { AddSubMenuListData, UpdateSubMenuListData, reset } from '../store/todayMenu/todayMenuSlice';
import { SubMenuListData } from '../store/Menu/menuSlice';
import { useEffect, useState } from 'react';
const AddSubMenu = ({ closeModal, menuId, data }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    // const { subMenuAddList, menusList } = useSelector((state: any) => state?.MenuListToday);
    const [updateState, setUpdateState]: any = useState()

    useEffect(() => {
        setUpdateState((prevState:any) => ({
            ...prevState,
            item_name: data?.item_name || '',
            price: data?.price || '',
            quantity: data?.quantity || '',
            menu_id: menuId || '',
            _id:data?._id
        }));
    }, [data, menuId]);;
    
console.log(data,"datadata")
    const validationSchema = Yup.object().shape({
        item_name: Yup.string().required('Item name is required'),
        // menu_id: Yup.string().required('Menu_Id is required'),
        price: Yup.string().required('Price is required'),
        quantity: Yup.string().required('Quantity is required'),
    });

//     const onSubmit: any = async (values: any, { resetForm }: any) => {
//         console.log(values, "valuesssss")
//         console.log('Submit button clicked');
//         try {
// if (data){

//     await dispatch(UpdateSubMenuListData(values));
// }
//             await dispatch(AddSubMenuListData(values));
//             closeModal();
//             await dispatch(SubMenuListData(values));

//             ToastifyShow("Sub Menu Add Successfully", "success")
//             resetForm();
//         } catch (error) {
//             console.error('Error creating user:', error);
//             // Handle error if needed
//         }
//     };
const onSubmit = async (values:any, { resetForm }:any) => {
    console.log(values, "valuesssss");
    console.log('Submit button clicked');
    
    try {
        if (data) {
            // Update existing data
            await dispatch(UpdateSubMenuListData(values));
            ToastifyShow("Sub Menu Updated Successfully", "success");
            dispatch(reset());

        } else {
            // Create new data
            await dispatch(AddSubMenuListData(values));
            ToastifyShow("Sub Menu Added Successfully", "success");
        }

        // Fetch updated/complete data after action
        await dispatch(SubMenuListData(values));

        // Close modal and reset form
        closeModal();
        resetForm();
    } catch (error) {
        console.error('Error:', error);
        // Handle error if needed
    }
};

    console.log('data', data)

    return (
        <div className="form-container">
            <Formik
                enableReinitialize={true}
                initialValues={updateState}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="form-row" >
                        {/* <h1>Create User</h1> */}
                        <div className='row'>
                            {/* <div className='col-md-6'>

                                    <label htmlFor="menu_id" className='mt-2 '>Menu Id</label>
                                    <Field type="text" id="menu_id" name="menu_id" className={errors.menu_id && touched.menu_id ? 'input-error' : ''} />
                                    <ErrorMessage name="menu_id" component="div" className="error-message" />
                                </div> */}
                            <div className='col-md-6'>

                                <label htmlFor="item_name" className='mt-2'>Item Name</label>
                                <Field type="text" id="item_name" name="item_name" className={errors.item_name && touched.item_name ? 'input-error' : ''} />
                                <ErrorMessage name="item_name" component="div" className="error-message" />
                            </div>
                            <div className='col-md-6'>

                                <label htmlFor="price" className='mt-2'>Price</label>
                                <Field type="text" id="price" name="price" className={errors.price && touched.price ? 'input-error' : ''} />
                                <ErrorMessage name="price" component="div" className="error-message" />
                            </div>
                            <div className='col-md-6 mb-4'>

                                <label htmlFor="quantity">Quantity</label>
                                <Field type="text" id="quantity" name="quantity" className={errors.quantity && touched.quantity ? 'input-error' : ''} />
                                <ErrorMessage name="quantity" component="div" className="error-message" />
                            </div>

                            <button type="submit" className="submit-button">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddSubMenu;
