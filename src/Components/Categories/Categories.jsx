import axios from 'axios';
import React from 'react';
import styles from './Categories.module.css';
import { useQuery } from 'react-query';
import { Triangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Categories() {

  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let {data , isLoading} = useQuery('getCategories' , getCategories)

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Categories</title>
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
    : <div className="container mt-3 ">
      <div className="row gy-2 ">
        {data?.data.data.map((category , index ) => <div key={index} className="col-md-3">
          <div className="category-item cursor-pointer">
            <img height={400} src={category.image} alt={category.name} className='w-100' />
            <p className='fw-bold text-main text-center mt-2 '>{category.name}</p>
          </div>
          
        </div> )}
      </div>
    </div> }
  </>
}
