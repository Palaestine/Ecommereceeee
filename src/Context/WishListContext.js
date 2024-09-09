import axios from 'axios';
import { createContext } from 'react';

export let WishListContext = createContext()

export default function WishListContextProvider(props) {

    let headers = {token: localStorage.getItem('userToken')}


    function addWishListItem(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
            productId
        },{
            headers
        })
        .then((response)=> response)
        .catch((err)=> err)
    }

    function getWishListItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
            headers 
        })
        .then((response)=> response )
        .catch((err)=> err )
    }

    function deleteCartItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , {
            headers 
        })
        .then((response)=> response )
        .catch((err)=> err )
    }


    return <WishListContext.Provider value={{ getWishListItems , addWishListItem , deleteCartItem }}>
        {props.children}
    </WishListContext.Provider>

}