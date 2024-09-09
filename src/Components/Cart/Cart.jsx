import React, { useContext, useEffect, useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext';
import styles from './Cart.module.css';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  
const [cart, setCart] = useState(null);
const [loading, setLoading] = useState(true);


let {getCartItems , deleteCartItem , updateCartItems} = useContext(CartContext)
  
async function getItems() {
  let {data} = await getCartItems()
  setCart(data)
  setLoading(false)
}

async function deleteItem(id) {
  setLoading(true)
  let {data} = await deleteCartItem(id)
  if (data.status == 'success') {
    toast.success(data.message)
    }
  setCart(data)
  setLoading(false)
}

async function updateItems(id , count) {
  if (count < 1) {
    let {data} = await deleteCartItem(id)
    setCart(data)
  }else{
    let {data} = await updateCartItems(id , count)
    setCart(data)
  }
}

useEffect(()=>{
  getItems()
} , [])

  return <>

  <Helmet>
      <meta charSet="utf-8" />
      <title>Cart</title>
      <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>

    <div className="bg-main-light min-height p-3 mt-3">
      <h1>Shop Cart :</h1>

        {loading ? <div>
          <div className="loading">
        <Triangle
              visible={true}
              height="100"
              width="100"
              color="#0aad0a"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass="d-flex justify-content-center mt-5"
              /> 
        </div>
        <p className='text-main fw-bold '>Number Of Cart Items : --- Items</p>
        <p className='text-main fw-bold '>Total Cart Price : --- EGP</p> 
        </div> : cart? <> 
              <p className='text-main fw-bold '>Number Of Cart Items : {cart.numOfCartItems} Items</p>
              <p className='text-main fw-bold '>Total Cart Price : {cart.data.totalCartPrice} EGP</p>

              {cart.data.products.map((product , index) => <div className="row align-items-center  border-1 border-bottom m-2 " key={product.product.id}>
                <div className="col-md-1">
                  <div className="img">
                  <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
                  </div>
                </div>

                <div className="col-md-10">
                  <div className="item">
                    <h3 className='h6 fw-bold'>{product.product.title.split(" ").slice(0,4).join(" ")}</h3>
                    <p className='text-main fw-bold'>Price : {product.price} EGP</p>
                    <button onClick={()=> deleteItem(product.product.id) } className='btn'><i className='fas fa-trash-can text-danger'></i> Remove</button>
                  </div>
                </div>

                <div className="col-md-1">
                  <div className="count">
                    <button onClick={()=> updateItems(product.product.id , product.count + 1)} className='px-2 m-1 brdr'>+</button>
                    <span>{product.count}</span>
                    <button onClick={()=> updateItems(product.product.id , product.count - 1)} className='px-2 m-1 brdr'>-</button>
                  </div>
                </div>

              </div>)}

              <Link to={`/shippingAddress/${cart.data._id}`} className='btn bg-main text-light m-3'>Shipping Addrees</Link>
        </> : <div className="container min-height">
          <h2>Your Cart is Empty NOW.
            Add Some Products to Your cart.
          </h2>
        </div> }
    </div>
  </>
}
