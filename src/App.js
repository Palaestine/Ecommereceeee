import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { Toaster } from 'react-hot-toast';
import WishList from './Components/WishList/WishList';
import NotFound from './Components/NotFound/NotFound';
import ShippingAddress from './Components/ShippingAddress/ShippingAddress';





export default function App() {
  
  let routes = createBrowserRouter([
    { path: '/', element: <Layout />, children: [
      {index:true , element: <ProtectedRoute> <Home/> </ProtectedRoute> },
      {path:'Products' , element:<ProtectedRoute> <Products/> </ProtectedRoute>},
      {path:'productdeatils/:id' , element:<ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
      {path:'Cart' , element:<ProtectedRoute> <Cart/> </ProtectedRoute>},
      {path:'Categories' , element:<ProtectedRoute> <Categories/> </ProtectedRoute>},
      {path:'Brands' , element:<ProtectedRoute> <Brands/> </ProtectedRoute>},
      {path:'WishList' , element:<ProtectedRoute> <WishList/> </ProtectedRoute>},
      {path:'shippingAddress/:id' , element:<ProtectedRoute> <ShippingAddress/> </ProtectedRoute>},
      {path:'Login' , element:<Login/>},
      {path:'Register' , element:<Register/>},
      {path:'*' , element:<NotFound/>},
    ] }
  ])

  let {setUserToken} = useContext(UserContext);

  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      setUserToken(localStorage.getItem("userToken"))
    }
  } , [])

  return <> 
  <RouterProvider router={routes}></RouterProvider>;
  <Toaster/>
  </>
}
