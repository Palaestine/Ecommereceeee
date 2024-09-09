import axios from 'axios';
import React, { useContext } from 'react';
import styles from './Products.module.css';
import { useQuery } from 'react-query';
import { Triangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CartContext } from './../../Context/CartContext';
import { WishListContext } from './../../Context/WishListContext';

export default function Products() {

  let {addToCart} = useContext(CartContext)
  let {addWishListItem} = useContext(WishListContext)

  async function postToCart(id) {
    let {data} = await addToCart(id)
    if (data.status == 'success') {
        toast.success(data.message)
    }
}

async function postToWishList(id) {
    let {data} = await addWishListItem(id)
    if (data.status == 'success') {
        toast.success(data.message)
    }
}

  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let {data , isLoading} = useQuery('getAllProducts' , getAllProducts)

  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>Products</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>

  {isLoading? 
    <div className="row">
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
    </div> 
  : <div className="container mt-3">
    <div className="row gy-3">
      {data?.data.data.map( (product , index ) => <div key={index} className="col-md-3">
      <div className="product p-2">
      <span onClick={() => postToWishList(product.id)} className='wish-list float-end p-2 text-main cursor-pointer'><i class="fa-regular fs-5 fa-heart"></i></span>
      <Link to={`/productdeatils/${product.id}`}>
          <div className="product-item cursor-pointer">
              <img src={product.imageCover} className='w-100' alt={product.title} />
              <span className='font-sm text-main px-2'>{product.category.name}</span>
              <h3 className='h6 px-2 '>{product.title.split(" ").splice(0,2).join(" ")}</h3>
              <div className="d-flex py-3 align-items-center  justify-content-between">
                <span className='font-sm px-2 '>{product.price} EGP</span>
                <span className='px-2'>
                  {product.ratingsAverage}
                  <i className='fas fa-star rating-color ms-1'></i>
                </span>
              </div>  
          </div> 
        </Link>       
        <button onClick={() => postToCart(product.id)} className='btn bg-main text-light w-100 btn-sm mb-1'>Add to Cart +</button>
      </div>
      </div> )}
    </div>
  </div> }

  </>
}
