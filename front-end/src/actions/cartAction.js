import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstants';


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