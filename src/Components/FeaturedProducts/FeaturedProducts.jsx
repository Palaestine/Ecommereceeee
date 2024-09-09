import axios from 'axios'
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
// import React, { useState } from 'react'
// import { useEffect } from 'react'
import { Triangle } from 'react-loader-spinner'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from './../../Context/WishListContext';


export default function FeaturedProducts() {
 
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

function getProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}

let {data , isLoading , isError , isFetching} = useQuery('featuredProducts' , getProducts)

    return <>
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
    : <div className="container">
        <div className="row gy-4">
      {data?.data.data.map( (product , index) =>
            <div key={index} className="col-lg-2">   
                    <div className="product px-2 ">
                        <span onClick={()=> postToWishList(product.id)} className='wish-list float-end p-2 text-main cursor-pointer'><i class="fa-regular fs-5 fa-heart"></i></span>
                        <Link to={`/productdeatils/${product.id}`}>
                            <img src={product.imageCover} className='w-100' alt={product.title} />
                            <span className='font-sm text-main'>{product.category.name}</span>
                            <h3 className='h6'>{product.title.split(" ").splice(0,2).join(" ")}</h3>
                            <div className="d-flex py-3 align-items-center  justify-content-between">
                                <span className='font-sm'>{product.price} EGP</span>
                                <span>
                                    {product.ratingsAverage}
                                    <i className='fas fa-star rating-color me-1 '></i>
                                </span>
                            </div>
                        </Link>
                        <button onClick={()=> postToCart(product.id)} className='btn bg-main text-light w-100 btn-sm mb-1'>Add to Cart</button>
                    </div>
                
        </div>
        )}  
    </div> 
    </div>
    }
    </>
}
