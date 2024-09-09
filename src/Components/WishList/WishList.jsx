import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../../Context/WishListContext';
import { Helmet } from 'react-helmet';
import { Triangle } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
import { CartContext } from './../../Context/CartContext';

export default function WishList() {

  const [wishList, setWishList] = useState(null);
  const [loading, setLoading] = useState(true);

  let { getWishListItems , deleteCartItem  } = useContext(WishListContext)
  let {addToCart} = useContext(CartContext)

async function postToCart(id) {
    let {data} = await addToCart(id)
    if (data.status == 'success') {
        toast.success(data.message)
    }
    deleteItem(id)
}

  async function getItems() {
    let {data} = await getWishListItems();
    setWishList(data)
    setLoading(false)
  }

  async function deleteItem(id) {
    let {data} = await deleteCartItem(id)
    if (data.status == 'success') {
      toast.success(data.message)
  }
    getItems()
  }

  useEffect(()=>{
    getItems()
  },[])

  return <>

  <Helmet>
      <meta charSet="utf-8" />
      <title>Wishlist</title>
      <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>

  {loading?
    <div className="container">
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

        <div className="container">
          <div className="p-3 bg-light min-height mt-3">
            <h2 className="h5 fw-bold ">Wish List</h2>
            <p className='fw-bold '>Wish List Items : <span className='text-main'>--- Items</span></p>
          </div>
        </div>

    </div>   
    : <div className="container min-height">
        <div className="p-3 bg-light mt-3">
          <h2 className="h5 fw-bold ">Wish List</h2>
          <p className='fw-bold '>Wish List Items : <span className='text-main'>{wishList?.count} Items</span></p>
        </div>

        {wishList?.data.map((item , index )=> <div key={index} className="row mb-5 mt-2">
          <div className="col-md-2">
            <picture>
              <img src={item.imageCover} className='w-100' alt={item.title} />
            </picture>
          </div>

          <div className="col-md-8">
            <div className="details d-flex flex-column justify-content-between h-100">
              
              <div>
                <h2 className="h5">{item.category.name}</h2>
                <p className='fw-bold text-main'>{item.title}</p>
              </div>
              
              <div>
                <p className='fw-bold'>{item.description }</p>
              </div>
              
              <div className="d-flex py-3 align-items-center  justify-content-between">
                <span className='font-sm'>{item.price} EGP</span>
                <span>
                  {item.ratingsAverage}
                  <i className='fas fa-star rating-color mx-1 '></i>
                </span>
              </div>

              <div>
                <button onClick={() => postToCart(item.id)} className='w-100 text-white border-0 bg-main py-1 '>Add to Cart +</button>
              </div>

            </div>
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <div className="delte-Btn w-100 ">
              <button onClick={()=> deleteItem(item.id) } className='bg-danger w-100 py-1 text-white border-0 '>Delete <i className='fas fa-trash-can text-white'></i></button>
            </div>
          </div>

        </div> )}

    </div>}
  </>
}
