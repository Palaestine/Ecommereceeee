import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Triangle } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';


export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let {setUserToken} = useContext(UserContext)

  let navigate = useNavigate();
 
  async function loginSubmit(values) {
    setLoading(true);
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
   .catch((err)=>{
    setApiError(err.response.data.message)
    setLoading(false)
  });
   if(data.message == 'success'){
    setLoading(false)
    localStorage.setItem("userToken" , data.token)
    setUserToken(data.token)
    navigate("/")
   }
  };

  let phoneRegex = /^01[0125]\d{8}$/;
  let passwordRegex = /^[A-Z][a-z0-9]{5,10}$/;

  let validateScema = Yup.object({
    email:Yup.string().email('email is invalid').required('email is required'),
    password:Yup.string().matches(passwordRegex , 'password shoud start with capital letter and max lengh 10 letters').required('password is required'),
  })
 
  let formik = useFormik({
  initialValues:{
    email:"",
    password:""
  },validationSchema:validateScema
  ,onSubmit:loginSubmit
 })
  return <>
    <div className="w-75 mt-2 mx-auto">
      <h1>Login Now!</h1>
      <form onSubmit={formik.handleSubmit}>

        {apiError?<div className="alert alert-danger ">{apiError}</div>:null}

        <label htmlFor="email">Email :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' name='email' className='form-control mb-2' />
        {formik.errors.email && formik.touched.email?<div className="alert mt-2 py-2 alert-danger ">{formik.errors.email}</div>:""}

        <label htmlFor="password">Password :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='password' name='password' className='form-control mb-2' />
        {formik.errors.password && formik.touched.password?<div className="alert mt-2 py-2 alert-danger ">{formik.errors.password}</div>:""}

        {loading?<button type='button' className='btn bg-main text-white'>
          <Triangle
          visible={true}
          height="25"
          width="25"
          color="#fff"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          /> 
          </button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Login</button>}
        
      </form>
    </div>
  </>

}
