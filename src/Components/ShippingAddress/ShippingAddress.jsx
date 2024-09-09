import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { CartContext } from './../../Context/CartContext';

export default function ShippingAddress() {
    let {checkOutSession} = useContext(CartContext)
    let {id} = useParams()
  
    async function checkOut(values) {
        let {data} = await checkOutSession(id , values)
        if(data.status == 'success'){
            window.location.href = data.session.url
        }
    }
  
    let formik = useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:'',
        },onSubmit:checkOut
    })

  return <>
    <h2 className='p-3 text-main '>Shipping Address :</h2>
    <div className="w-75 mb-5 mx-auto">
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="details">Details</label>
            <input type="text" id='details' name='details' className='mb-3 form-control' onChange={formik.handleChange} />
            <label htmlFor="phone">Phone</label>
            <input type="tel" id='phone' name='phone' className='mb-3 form-control' onChange={formik.handleChange} />
            <label htmlFor="city">City</label>
            <input type="text" id='city' name='city' className='mb-3 form-control' onChange={formik.handleChange} />
            <button className='btn bg-main text-light' type='submit'>Check Out</button>
        </form>
    </div>
  </>
}
