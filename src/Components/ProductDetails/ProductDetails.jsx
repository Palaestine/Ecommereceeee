import  axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Triangle } from 'react-loader-spinner'
import Slider from "react-slick";
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { WishListContext } from './../../Context/WishListContext';

export default function ProductDetails() {

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

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2000,
      };

    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(true)
   let {id} = useParams();
   
   async function getProductDetails(id){
     let {data} = await axios.get (`https://ecommerce.routemisr.com/api/v1/products/${id}`) 
        setDetails(data.data)
        setLoading(false)
     }

     useEffect(()=>{
        getProductDetails(id)
     },[])
  
  return <>
        {loading?
        
    <div className="row">
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
        </div>
    </div> :
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>{details.title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
      <div className="container mt-5 ">
                <div className="row align-items-center ">
                    <div className="col-md-4">
                    <Slider {...settings}>
                        {details.images.map(image => <img key={details.id} className='w-100' src={ image } alt={details.title} /> )}
                    </Slider>
                    </div>

                    <div className="col-md-8">
                        <div className="details">
                            <div className='d-flex justify-content-between '>
                                <h3 className='h5'>{details.title}</h3>
                                <span onClick={()=> postToWishList(details.id)}><i class="fa-regular fs-5 fa-heart text-main cursor-pointer"></i></span>
                            </div>
                            
                            <p className='py-3 text-muted '>{details.description}</p>
                            <span className='font-sm text-main'>{details.category.name}</span>
                            <h3 className='h6'>{details.title.split(" ").splice(0,2).join(" ")}</h3>
                            <div className="d-flex py-3 align-items-center  justify-content-between">
                                <span className='font-sm'>{details.price} EGP</span>
                                <span>
                                    {details.ratingsAverage}
                                    <i className='fas fa-star rating-color mx-1 '></i>
                                </span>
                            </div>
                            <button onClick={() => postToCart(details.id)} className='btn bg-main text-light w-100 btn-sm mb-1'>Add to Cart</button>
                        </div>
                    </div>
                </div> 
            </div>
    </>
     }
    </>
}
