import React , { useContext, useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { useQuery } from 'react-query';
import { WishListContext } from '../../Context/WishListContext';



export default function Navbar() {

const [cart, setCart] = useState(null);
const [wishList, setWishList] = useState(null);
const {userToken , setUserToken} = useContext(UserContext)

let { getCartItems } = useContext(CartContext)
let { getWishListItems  } = useContext(WishListContext)
  
async function getItemsofCart() {
  let {data} = await getCartItems()
  setCart(data.numOfCartItems)
}
  
let { } = useQuery('getCartItems' , getItemsofCart , {
  refetchInterval : 500
} )

async function getItemsofWishList() {
  let {data} = await getWishListItems()
  setWishList(data.count)
}
  
let { } = useQuery('getWishListItems' , getItemsofWishList ,{
  refetchInterval : 500
})


  function logOut(){
    localStorage.removeItem('userToken');
    setUserToken(null);
    <Navigate to={'/login'} />
  }

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto fw-bold  mb-2 mb-lg-0">
            {userToken != null ? <>
            
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/brands">Brands</Link>
            </li>
            
            
            </> : '' }

          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>
            
            {userToken != null ? <>

              <li className="nav-item">
                <Link className="nav-link position-relative " to="/cart">
                  <i class="fa-solid fa-cart-shopping fs-4 text-main"></i>
                  <span><p className='cart-num'>{cart}</p></span>
                </Link>
              </li>
              
              <li className="nav-item me-3 ">
                <Link className="nav-link position-relative" to="/wishlist">
                  <i class="fa-regular fs-4 mx-2  text-main fa-heart"></i>
                  <span><p className='cart-num'>{wishList}</p></span>
                  </Link>
              </li>
              
              <li className="nav-item">
                <Link onClick={logOut} className="nav-link bg-main text-light rounded-2 " >Logout</Link>
              </li>

            </> : <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>}
         

          </ul>

        </div>
      </div>
    </nav>
  </>
}
