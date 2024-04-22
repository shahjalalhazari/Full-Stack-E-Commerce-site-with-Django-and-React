import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, ORDER_PAYMENT_METHOD, ORDER_SHIPPING_ADDRESS } from '../constants/cartConstants';


export const addToCart = (id, quantity) => async (dispatch, getState) => {
  // TODO: update this url
    const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
    }
  })
  
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}


// REMOVE ITEMS FROM CART
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })
  
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}


// SAVE SHIPPING ADDRESS
export const orderShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: ORDER_SHIPPING_ADDRESS,
    payload: data,
  })
  
  localStorage.setItem("shippingAddress", JSON.stringify(data))
}


// SAVE ORDER PAYMENT METHOD
export const orderPaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: ORDER_PAYMENT_METHOD,
    payload: data,
  })
  
  localStorage.setItem("paymentMethod", JSON.stringify(data))
}