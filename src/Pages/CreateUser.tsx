// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch } from '../store/store';
// import { CreateUserData } from '../store/CreateUser/CreateUserSlice';
// const SimpleForm = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { createUser} = useSelector((state: any) => state?.createUserDataList);
//   console.log(createUser,"tstsststststs")
//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
    // role: Yup.string().required('Role is required'),
    // email: Yup.string().email('Invalid email').required('Email is required'),
//   });
  
//   const onSubmit = ({values,  resetForm}:any ) => {
//    dispatch(CreateUserData({}))
//     console.log(values);
//     resetForm();
//   };
//   const initialValues = {
//     first_name: '',
//     last_name: '',
//     role: '',
//     email:'',
//   };


//   return (
    
//     <div>
//       <h1>Simple Form</h1>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//       >
//         {({  }) => (
//           <Form>
//             <div>
//               <label htmlFor="name">First Name:</label>
//               <Field type="text" id="name" name="first_name" />
//               <label htmlFor="name">Last Name:</label>

//               <Field type="text" id="name" name="last_name" />
//               <ErrorMessage name="name" component="div" className="error" />
//             </div>
//             <div>
//               <label htmlFor="role">Role:</label>
//               <Field type="text" id="role" name="role" />
//               <ErrorMessage name="role" component="div" className="error" />
//             </div>
//             <div>
//               <label htmlFor="email">Email:</label>
//               <Field type="email" id="email" name="email" />
//               <ErrorMessage name="email" component="div" className="error" />
//             </div>
//             <button type="submit">Submit</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default SimpleForm;

import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { AppDispatch } from "../store/store";
import { CreateUserData } from "../store/CreateUser/CreateUserSlice";
import UserInput from "../components/UserInput";
import { useCallback, useMemo } from "react";
import SelectOption from "../components/SelectOption";

export default function CreateUser({ id}: any) {

  let initialValue = {
    first_name: "",
    last_name: "",
    role: "",
    email: "",
   
  };
  const dispatch = useDispatch<AppDispatch>();
  const { createUser} = useSelector((state: any) => state?.createUserDataList);
  const { userLists ,loading} = useSelector((state: any) => state?.MenuListToday);

  // useEffect(() => {
  //   dispatch(CreateUserData({ }))
  // }, [id]);
  const handleSubmit = async (data: any) => {
    let arr = {
      ...formik?.values,
      first_name: formik?.values?.first_name,
      last_name: formik?.values?.last_name,
      role: formik?.values?.role,
      email: formik?.values?.email,
     
    };
    if (id) {
      try {
        if (!userLists) {
          await dispatch(CreateUserData(arr));
       
        } 
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleOption = useCallback((formData: any, name1: any) => {
    formik.setFieldValue(name1, formData);
  }, []);
  const optionsList2 = useMemo(
    () => [
      { value: "User", label: "User" },
      { value: "Admin", label: "Admin" },
    ],
    []
  );
  const schema = yup.object().shape({
    first_name: yup
    .string()
      .nullable(),
    last_name: yup
      .number()
      .integer()
      .nullable(),
      role: yup.string().required('Role is required'),
      email: yup.string().email('Invalid email').required('Email is required'),

  });

  const formik: any = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });


  const handleInput = (e:any) => {
    let { value, name } = e.target;
    if (/^\d*$/.test(value) && value.length < 40) {
      formik.setFieldValue(name, value);
    }
  };


  return (
    <div >  
    
      <Form onSubmit={formik.handleSubmit}>
        <div className="row gy-3 mt-4">
          <div className="col-md-6">
            <UserInput
              name="first_name"
              labelname="First Name"
              placeholder="Type here"
              showValue={formik.values.first_name}
              addValue={handleInput}
              error={formik.errors.first_name}
            />
          </div>
          <div className="col-md-6">
            <UserInput
              name="last_name"
              labelname="Last Name"
              placeholder="Type here"
              showValue={formik?.values?.last_name}
              addValue={handleInput}
              error={formik.errors.last_name}
            />
          </div>

          <div className="col-md-6">
          <SelectOption
              optionsList={optionsList2}
              name="role"
              isSearchable={true}
              labelText="Role"
              optionValue={formik?.values?.role}
              addValue={handleOption}
            />
          </div>
          <div className="col-md-6">
            <UserInput
              name="email"
              labelname="Email"
              placeholder="Type here"
              showValue={formik?.values?.email}
              addValue={handleInput}
              error={formik.errors.email}
            />
          </div>            
         
        </div>
      </Form>

    </div>
  );
}
