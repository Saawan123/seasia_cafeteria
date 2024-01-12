import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import "./AdminPanelPages/createUser.scss"
import { CreateUserData } from '../store/CreateUser/CreateUserSlice';
import ToastifyShow from '../components/ToastifyShow';
const CreateUser = ({ closeModal }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { createUser } = useSelector((state: any) => state?.createUserDataList);

  const validationSchema = Yup.object().shape({
    emp_id: Yup.number().required('Employee ID is required'),
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    role: Yup.string().required('Role is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const onSubmit: any = async (values: any, { resetForm }: any) => {
 
    try {
      values.emp_id = parseInt(values.emp_id, 10);
      await dispatch(CreateUserData(values));


      closeModal(); 
 
      resetForm();
    } catch (error) {

      // Handle error if needed
    }
  };
  const initialValues = {
    emp_id: '',
    first_name: '',
    last_name: '',
    role: '',
    email: '',
  };


  return (
    <div className="form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="form-row" >
            {/* <h1>Create User</h1> */}
            <div className='row'>

            <div className='col-md-12'>

            <label htmlFor="emp_id">Employee ID:</label>
            <Field type="text" id="emp_id" name="emp_id" className={errors.emp_id && touched.emp_id ? 'input-error' : 'ms-5'} />
            <ErrorMessage name="emp_id" component="div" className="error-message" />
            </div>
            <div className='col-md-6'>

              <label htmlFor="first_name" className='mt-2 '>First Name:</label>
              <Field type="text" id="first_name" name="first_name" className={errors.first_name && touched.first_name ? 'input-error' : ''} />
              <ErrorMessage name="first_name" component="div" className="error-message" />
            </div>
              <div className='col-md-6'>

              <label htmlFor="last_name" className='mt-2'>Last Name:</label>
              <Field type="text" id="last_name" name="last_name" className={errors.last_name && touched.last_name ? 'input-error' : ''} />
              <ErrorMessage name="last_name" component="div" className="error-message" />
              </div>
              <div className='col-md-6'>
  <label htmlFor="role">Role:</label><br/>
  <Field as="select" id="role" name="role" className={errors.role && touched.role ? 'input-error' : 'mt-1 w-100 hh'}>
    <option value="">Select a role</option>
    <option value="Admin">Admin</option>
    <option value="User">User</option>
  </Field>
  <ErrorMessage name="role" component="div" className="error-message" />
</div>
              <div className='col-md-6 mb-4'>

              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" className={errors.email && touched.email ? 'input-error' : ''} />
              <ErrorMessage name="email" component="div" className="error-message" />
              </div>
         
            <button type="submit" className="submit-button">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUser;
