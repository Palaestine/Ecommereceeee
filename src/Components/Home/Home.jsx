import React from 'react';
import CategorySlider from '../CategorySlider/CategorySlider';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import MainSlider from '../MainSlider/MainSlider';
import {Helmet} from "react-helmet";
import styles from './Home.module.css';


export default function Home() {
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>FreshCart</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <MainSlider/>
    <CategorySlider/>
    <FeaturedProducts/>
  </>
}
