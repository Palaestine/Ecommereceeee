import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import UserContextProvider from './Context/UserContext';
import CartContextProvider from './Context/CartContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import WishListContextProvider from './Context/WishListContext';

export const baseUrl = window.location.origin;
let queryClient = new QueryClient();



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <WishListContextProvider>
        <CartContextProvider>
            <UserContextProvider>
                <QueryClientProvider client={queryClient}>
                    <App /> 
                </QueryClientProvider>
            </UserContextProvider>
        </CartContextProvider>
    </WishListContextProvider>
    
);
