import axios from 'axios';
import React from 'react';
import styles from './Brands.module.css';
import { useQuery } from 'react-query';
import { Triangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Brands() {

  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  let {data , isError , isLoading} = useQuery('getBrands' , getBrands)

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Brands</title>
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
    : <div className="container mt-4">
        <div className="row gy-3 ">
           {data?.data.data.map((brand , index ) => <div key={index} className="col-md-3">
              <div className="brand-item cursor-pointer brdr">
                <img src={brand.image} alt={brand.name} className='w-100' />
                <p className='text-center fw-bold text-main'>{brand.name}</p>
              </div>
            </div> )}
        </div>
    </div> }
  </>
}
