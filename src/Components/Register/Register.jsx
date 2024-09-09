import React, { useState } from 'react';
// import styles from './Register.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Triangle } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'


export default function Register() {  
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  let navigate = useNavigate();
 
  async function registerSubmit(values) {
    setLoading(true);
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
   .catch((err)=>{
    setApiError(err.response.data.message)
    setLoading(false)
  });
   if(data.message === 'success'){
    setLoading(false)
    navigate("/login")
   }
  };
  
  let phoneRegex = /^01[0125]\d{8}$/;
  let passwordRegex = /^[A-Z][a-z0-9]{5,10}$/;

  let validateScema = Yup.object({
    name:Yup.string().min( 3 ,'name min lengh should be 3').max( 10 , ' name max lengh should be 10').required('name is required'),
    email:Yup.string().email('email is invalid').required('email is required'),
    phone:Yup.string().matches(phoneRegex , 'Phone is invalid').required('phone is reqired'),
    password:Yup.string().matches(passwordRegex , 'password shoud start with capital letter and max lengh 10 letters').required('password is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'password and repassword shoud match').required('rePassword is required')
  })
 
  let formik = useFormik({
  initialValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
  },validationSchema:validateScema
  ,onSubmit:registerSubmit
 })
  return <>
    <div className="w-75 mt-2 mx-auto">
      <h1>Register Now!</h1>
      <form onSubmit={formik.handleSubmit}>

        {apiError?<div className="alert alert-danger ">{apiError}</div>:null}

        <label htmlFor="name">Name :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id='name' name='name' className='form-control mb-2' />
        {formik.errors.name && formik.touched.name?<div className="alert mt-2 py-2 alert-danger ">{formik.errors.name}</div>:""}

        <label htmlFor="email">Email :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' name='email' className='form-control mb-2' />
        {formik.errors.email && formik.touched.email?<div className="alert mt-2 py-2 alert-danger ">{formik.errors.email}</div>:""}

        <label htmlFor="password">Password :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='password' name='password' className='form-control mb-2' />
        {formik.errors.password && formik.touched.password?<div className="alert mt-2 py-2 alert-danger ">{formik.errors.password}</div>:""}

        <label htmlFor="rePassword">rePassword :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='rePassword' name='rePassword' className='form-control mb-2' />
        {formik.errors.rePassword && formik.touched.rePassword?<div className="alert mt-2 py-2 alert-danger ">{formik.errors.rePassword}</div>:""}

        <label htmlFor="phone">Phone :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id='phone' name='phone' className='form-control mb-2' />
        {formik.errors.phone && formik.touched.phone?<div className="alert mt-2 py-2 alert-danger ">{formik.errors.phone}</div>:""}

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
          </button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register</button>}
        
      </form>
    </div>
  </>
}
