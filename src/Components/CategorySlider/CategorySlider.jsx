import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import Slider from "react-slick";

export default function CategorySlider() {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2000,
      };
  
    function getCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

   let {data} = useQuery('getCategories' , getCategories)
  
  return <> 
    <div className="container my-3">
    <div className="row">
        <Slider {...settings}>
            {data?.data.data.map((category , index) => <div key={index} className="col-md-2">
                <div className="img">
                    <img src={category.image} className='w-100' height={200} alt={category.name} />
                </div>
                <p className='text-center fw-bold h6'>{category.name}</p>
            </div> )}
        </Slider>
    </div>
    </div>
  </>
}
