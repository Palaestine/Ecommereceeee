import React from 'react'
import Slider from "react-slick";

import slide1 from '../../Assets/images/slider-image-1.jpeg'
import slide2 from '../../Assets/images/slider-image-2.jpeg'
import slide3 from '../../Assets/images/slider-image-3.jpeg'
import img1 from '../../Assets/images/grocery-banner.png'
import img2 from '../../Assets/images/grocery-banner-2.jpeg'

export default function MainSlider() {

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

  return <>
    <div className="container">
    <div className="row my-3 gx-0">
        <div className="col-md-9">
            <Slider {...settings}>
                <img src={slide1} height={400} className='w-100' alt={'slide1'} />
                <img src={slide2} height={400} className='w-100' alt={'slide2'} />
                <img src={slide3} height={400} className='w-100' alt={'slide3'} />
            </Slider>
        </div>

        <div className="col-md-3">
            <div className="side-images">
                <img src={img1} height={200} className='w-100' alt="Side-Img 1" />
                <img src={img2} height={200} className='w-100' alt="Side-Img 2" />
            </div>
        </div>
    </div>
    </div>
  </>
}
